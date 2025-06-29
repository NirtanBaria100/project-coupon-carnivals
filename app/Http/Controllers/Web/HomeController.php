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
        $similarStores  = Store::latest()->whereNot('is_featured',1)->select(['name','slug','id'])->limit(5)->get();
        return Inertia::render("Web/Index",[
            'featured_coupons' => $featuredCoupons,
            'popular_stores' => $similarStores,
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
            $query->imageUrl = asset($query->thumbnail);
            return $query;
        });
        return Inertia::render("User/AllStorePage",[
            'allStores' => $stores,
        ]);

    }


    public function AllBlogs(){
        return Inertia::render("User/BlogPage",[
            'blogs' => Blog::latest()->get()
        ]);

    }
    public function singleBlog($slug){
        return Inertia::render("User/SingleBlog",[
            'blogs' => Blog::latest()->where('slug', $slug)->first()
        ]);

    }

}
