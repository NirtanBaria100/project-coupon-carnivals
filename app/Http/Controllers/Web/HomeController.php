<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\{Store ,Blog,Category, Coupon};
use Carbon\Carbon;
class HomeController extends Controller
{

    public function Index(){
        $featuredCoupons = Coupon::where(['is_featured'=>1,'is_published'=>1])->latest()->limit(10)->get();
        $similarStores   = Store::latest()->whereNot('is_featured',1)->select(['name','slug','id'])->limit(5)->get();
        $blogs           = Blog::latest()->where('is_published',1)->limit(6)->get();
        $blogs->transform(function($query){
            $query->title = \Str::limit($query->title , 80  ,'...');
            $query->imageURL = asset($query->image);
            return $query;
        });
        return Inertia::render("Web/Index",[
            'featured_coupons' => $featuredCoupons,
            'popular_stores' => $similarStores,
            'blogs'=> $blogs
        ]);
    }
    public function StorePage($slug) {
        $store = Store::latest()->where('slug', $slug)->select(['affiliate_irl','name','desc','extra_info','thumbnail'])->first();
        $similarStores  = Store::latest()->whereNot('slug', $slug)->select(['name','slug'])->limit(5)->get();
        $store = Store::latest()->where('slug', $slug)->first();
        $storeCoupons = \DB::table('coupon_store')->where('store_id', $store->id)->pluck('coupon_id');
        $coupons = Coupon::whereIn('id', $storeCoupons)->whereDate('expires', '>', Carbon::now())->get();
        $expiredCoupons = Coupon::whereIn('id', $storeCoupons)->whereDate('expires', '<=', Carbon::now())->get();
        $coupons->transform(function($query){
            $query->isExpired = Carbon::now() >= Carbon::parse($query->expires) ? true : false;
            $query->expires   = Carbon::parse($query->expires)->format('F d , Y');
            return $query;
        });
        if(!empty($store)){
            $store->thumbnail = asset($store->thumbnail);
        }
        return Inertia::render("User/StorePage",[
            'stores' => $store,
            'coupons'=> $coupons,
            'expiredCoupons'=> $expiredCoupons,
            'similarStores' => $similarStores
        ]);
    }
    public function CategoryPage($slug) {
        $category = Category::latest()->where('slug', $slug)->first();
        $coupons  = [];
        if(!empty($category)){
        $categoryCoupons = \DB::table('category_coupon')->where('category_id', $category->id)->pluck('coupon_id');
        $coupons = Coupon::whereIn('id', $categoryCoupons)->whereDate('expires', '>', Carbon::now())->get();
        }

        return Inertia::render("User/CategoryPage" ,[
            'category' => $category,
            'coupons' => $coupons
        ]);
    }

    public function AllStorePage() {
        $stores = Store::latest()->get();
        $stores->transform(function($query){
            $query->totalOffers = $query->coupons->count();
            $query->imageURL = asset($query->thumbnail);
            return $query;
        });
        return Inertia::render("User/AllStorePage",[
            'allStores' => $stores,
        ]);

    }


    public function AllBlogs($category = null){
        $blogs           = Blog::latest()->where('is_published',1)->with('author')->with('category')->limit(12);
        if(!empty($category)){
            $blogs->whereHas('category', function($query) use ($category) {
                $query->where('slug', $category);
            });
        }
        $blogs = $blogs->get();
        $blogs->transform(function($query){
            $query->title = \Str::limit($query->title , 80  ,'...');
            $query->imageURL = asset($query->image);
            $query->date = Carbon::parse($query->created_at)->format('F d,Y');
            return $query;
        });
        return Inertia::render("User/BlogPage",[
            'blogs' => $blogs
        ]);

    }

    public function singleBlog($slug){
        $post        = Blog::latest()->where('slug', $slug)->with('author')->with('category')->first();
        $recentPost  = Blog::latest()->whereNot('slug', $slug)->with('category')->get();
        $recentPost->transform(function($query){
            $query->title = \Str::limit($query->title , 140  ,'...');
            return $query;
        });
        $post->imageURL = asset($post->image);
        $post->date = Carbon::parse($post->created_at)->format('F d,Y');
        $categories = Category::whereHas('blogs')->select(['name','id','slug'])->limit(5)->get();
        return Inertia::render("User/SingleBlog",[
            'post' => $post,
            'categories'=> $categories,
            'recentPost' => $recentPost,
        ]);

    }

}
