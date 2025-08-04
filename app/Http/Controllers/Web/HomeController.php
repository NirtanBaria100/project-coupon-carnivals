<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\{Store, Blog, Category, Coupon, Rating};
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{


    public function Index()
    {
        // $featuredCoupons = Coupon::whereDate('expires' , '>' , Carbon::now())->where(['is_featured' => 1, 'is_published' => 1])->latest()->with('stores', function($query){
        //     $query->first();
        // })->limit(30)->get();
        $featuredCoupons = Coupon::select('coupons.*', 'coupon_order.position')->latest()->whereDate('expires', '>', Carbon::now())->where(['is_featured' => 1, 'is_published' => 1])
            ->where('is_published', 1)
            ->leftJoin('coupon_order', function ($join) {
                $join->on('coupon_order.coupon_id', '=', 'coupons.id');
            })
            ->with('stores')
            ->orderBy('coupon_order.position')->where(function ($query) {
                $query->whereDate('expires', '>', Carbon::now())
                    ->orWhereNull('expires');
            })->with('stores', function ($query) {
                $query->first();
            })->limit(30)
            ->get()
            ->map(function ($coupon) {
                $coupon->featured_image = $coupon->featured_image
                    ? asset($coupon->featured_image) :"";
                    // : asset('images/placeholder.png');
                return $coupon;
            });
        $featuredCoupons->transform(function ($query) {
            $query->isExpired = Carbon::now() >= Carbon::parse($query->expires) ? true : false;
            if (!empty($query->expires)) {
                $query->expires = Carbon::parse($query->expires)->format('F d , Y');
            }
            return $query;
        });
        $similarStores = Store::latest()->where('is_featured', 1)->select(['name', 'slug', 'id'])->limit(8)->get();
        $blogs = Blog::latest()->where('is_published', 1)->limit(6)->get();
        $blogs->transform(function ($query) {
            $query->title = \Str::limit($query->title, 80, '...');
            $query->imageURL = asset($query->image);
            return $query;
        });

        $popularCategories = Category::latest()->where("is_popular",1)->limit(8)->get();
        return Inertia::render("Web/Index", [
            'featured_coupons' => $featuredCoupons,
            'popular_stores' => $similarStores,
            'blogs' => $blogs,
            'popular_categories'=>$popularCategories
        ]);
    }
    public function StorePage($slug)
    {
      
       try{
         $store = Store::latest()->where('slug', $slug)->select(['id','single_line_desc', 'affiliate_irl', 'home_url', 'name', 'desc', 'extra_info', 'seo_title', 'meta_description', 'focus_keyphrase', 'thumbnail', 'category_id','updated_at'])->with(['storeRatings'=>function ($q)  {
            $q->where('is_approved',1);
        }])->first();
        $similarStores = Store::latest()->whereNot('slug', $slug)->where('category_id', $store->category_id)->select(['name', 'slug'])->limit(10)->get();
        $featuredLinks = Category::latest()->whereNot('slug', $slug)->select(['name', 'slug'])->where('is_popular', 1)->limit(10)->get();
        $storeCoupons = \DB::table('coupon_store')
            ->where('store_id', $store->id)
            ->pluck('coupon_id');

        $coupons = Coupon::select('coupons.*', 'coupon_order.position')
            ->whereIn('coupons.id', $storeCoupons)
            ->where('is_published', 1)
            ->leftJoin('coupon_order', function ($join) use ($store) {
                $join->on('coupon_order.coupon_id', '=', 'coupons.id')
                    ->where('coupon_order.store_id', '=', $store->id);
            })
            ->with('stores')
            ->orderBy('coupon_order.position')->where(function ($query) {
                $query->whereDate('expires', '>', Carbon::now())
                    ->orWhereNull('expires');
            })
            ->get()
            ->map(function ($coupon) {
                $coupon->featured_image = $coupon->featured_image
                    ? asset($coupon->featured_image):"";
                    // : asset('images/placeholder.png');
                return $coupon;
            });

        $expiredCoupons = Coupon::whereIn('id', $storeCoupons)->with('stores')->where('is_published', 1)->whereDate('expires', '<=', Carbon::now())->get();

        $expiredCoupons->transform(function ($query) {
            if (!empty($query->expires)) {
                $query->expires = Carbon::parse($query->expires)->format('F d , Y');
            }
            return $query;
        });
        $coupons->transform(function ($query) use ($coupons) {
            $query->isExpired = Carbon::now() >= Carbon::parse($query->expires) ? true : false;

            // Coupons ko latest (updated_at ya created_at) ke hisaab se sort karen
            $latestCoupon = $coupons->first();

            if ($latestCoupon) {
                $query->coupon_updated = $latestCoupon->updated_at ?? $latestCoupon->created_at;
            } else {
                $query->coupon_updated = $query->updated_at ?? $query->created_at;
            }

            if (!empty($query->expires)) {
                $query->expires = Carbon::parse($query->expires)->format('F d , Y');
            }

            return $query;
        });
        $store->ratings = 0;
        $store->totalRatings = 0 ;
        if (!empty($store)) {
            $store->thumbnail = asset($store->thumbnail);
            $ratings =  Rating::where(['store_id' => $store->id ,'ip_address' => request()->ip() ,'is_approved' => 1]);
            $store->ratings = $ratings->sum('ratings');
            $store->totalRatings = $ratings->count();
        }
        
        return Inertia::render("User/StorePage", [
            'stores' => $store,
            'coupons' => $coupons,
            'expiredCoupons' => $expiredCoupons,
            'similarStores' => $similarStores,
            'featuredLinks' => $featuredLinks,
        ]);
       }
       catch(\Exception $e){
        return $e;
       }
    }

    public function CategoryPage($slug)
    {
         $category = Category::latest()->where('slug', $slug)->first();
         $category->formattedCreated = Carbon::parse($category->created_at)->format('Y-m-d');
         $popularCategories = Category::latest()->where("is_popular",1)->limit(10)->get();
         $TotalCoupons = $category->coupons()->count();
        return Inertia::render("User/CategoryPage", [
            'category' => $category,
            'categories'=>$popularCategories,
            'totalCouponsIncategory' => $TotalCoupons,
        ]);
    }

    public function AllStorePage()
    {
        $stores = Store::latest()->get();
        $stores->transform(function ($query) {
            $query->totalOffers = $query->coupons->where('is_published', 1)->count();
            $query->imageURL = asset($query->thumbnail);
            return $query;
        });
        return Inertia::render("User/AllStorePage", [
            'allStores' => $stores,
        ]);
    }


    public function AllBlogs($category = null)
    {
        $blogs = Blog::latest()->where('is_published', 1)->with('author')->with('category');
        if (!empty($category)) {
            $blogs->whereHas('category', function ($query) use ($category) {
                $query->where('slug', $category);
            });
        }
        if (request()->query('search')) {
            $blogs->where('title', 'LIKE', '%' . request()->query('search') . '%');
        }
        $blogs = $blogs->paginate(30);
        $blogs->getCollection()->transform(function ($query) {
            $query->title = \Str::limit($query->title, 80, '...');
            $query->imageURL = asset($query->image);
            $query->date = Carbon::parse($query->created_at)->format('F d,Y');
            return $query;
        });

         $popularCategories = Category::latest()->where("is_popular",1)->limit(8)->get();
        return Inertia::render("User/BlogPage", [
            'blogs' => $blogs,
            'popularCategories'=>$popularCategories
        ]);
    }

    public function singleBlog($slug)
    {
        $post = Blog::latest()->where('slug', $slug)->with('author')->with('category')->first();
        $post->formattedCreated = Carbon::parse($post->created_at)->format('Y-m-d');
        $recentPost = Blog::latest()->whereNot('slug', $slug)->where('is_published',1)->with('category')->get();
        $recentPost->transform(function ($query) {
            $query->title = \Str::limit($query->title, 140, '...');
            return $query;
        });
        $post->imageURL = asset($post->image);
        $post->date = Carbon::parse($post->created_at)->format('F d,Y');
        $featuredcategories = Category::whereHas('blogs')->select(['name', 'id', 'slug'])->limit(10)->get();
        return Inertia::render("User/SingleBlog", [
            'post' => $post,
            'featuredcategories' => $featuredcategories,
            'recentPost' => $recentPost,
        ]);
    }
    public function storeRating(Request $request)
    {
        $data = $request->except('_token');
        $data['ip_address'] = $request->ip();
        $store = Rating::updateOrCreate(['store_id' => $data['store_id'] ,'ip_address' => $data['ip_address']], $data);

        if ($store) {
            return redirect()->back()->with('success', 'Thanks for your rating. Your rating will be added soon.');
        } else {
            return redirect()->back()->with(['error' => true], 500);
        }
    }
    public function searchStores(Request $request)
    {
        $search = $request->data['searchValue'];
        $stores = Store::where('name', 'LIKE', '%' . $search . '%')->select(['name', 'slug'])->get();

        return response()->json(['data' => [
            'stores' => $stores,
        ]]);
    }

  public function AllCategoryPage()
{
    $allCategories = Category::orderBy('name', 'asc')->get(); // alphabetical order A-Z
    return Inertia::render('User/AllCategoryPage', [
        'allCategories' => $allCategories
    ]);
}

    public function loadMoreCoupons(Request $request , $skip)
    {

        $coupons = [];
        if (!empty($request->category_id)) {
            $categoryCoupons = \DB::table('category_coupon')->where('category_id', $request->category_id)->pluck('coupon_id');
            // $coupons = Coupon::whereIn('id', $categoryCoupons)->where('is_published', 1)->with('stores')->whereDate('expires', '>', Carbon::now())->get();
            $coupons = Coupon::select('coupons.*', 'coupon_order.position')
                ->whereIn('coupons.id',  $categoryCoupons)
                ->where('is_published', 1)
                ->leftJoin('coupon_order', function ($join) {
                    $join->on('coupon_order.coupon_id', '=', 'coupons.id');
                })
                ->with('stores')
                ->orderBy('coupon_order.position')->where(function ($query) {
                    $query->whereDate('expires', '>', Carbon::now())
                        ->orWhereNull('expires');
                });
                $totalCoupons = $coupons->count();
                if($skip > 0)
                {
                    $coupons->skip($skip);
                }
               $coupons = $coupons->limit(50)->get()
                ->map(function ($coupon) {
                    $coupon->featured_image = $coupon->featured_image
                        ? asset($coupon->featured_image):"";
                        // : asset('images/placeholder.png');
                    return $coupon;
                });
            $coupons->transform(function ($query) {
                $query->isExpired = Carbon::now() >= Carbon::parse($query->expires) ? true : false;
                if (!empty($query->expires)) {
                    $query->expires = Carbon::parse($query->expires)->format('F d , Y');
                }
                return $query;
            });
        }

        return response()->json(['coupons'=> $coupons , 'totalcoupons' =>$totalCoupons]);
    }


    public function policy(){
        return Inertia::render('User/Policy');
    }
    public function terms(){
        return Inertia::render('User/Terms');
    }
    public function faqs(){
        return Inertia::render('User/Faqs');
    }

    public function imprint(){
        return Inertia::render("User/Imprint");
    }

    public function HowToMakeMoney(){
        return Inertia::render("User/HowToMakeMoney");
    }
    public function HowToUseCoupons(){
        return Inertia::render("User/HowToUseCoupons");
    }
}