<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\{Store ,Blog,Category, Coupon};
class HomeController extends Controller
{

    public function Index(){
        return Inertia::render("Web/Index");
    }
    public function StorePage($slug) {
        $store = Store::latest()->where('slug', $slug)->first();
        $storeCoupons = \DB::table('coupon_store')->where('store_id', $store->id)->pluck('coupon_id');
        $coupons = Coupon::whereIn('id', $storeCoupons)->get();
        if(!empty($store)){
            $store->thumbnail = asset($store->thumbnail);
        }
        return Inertia::render("User/StorePage",[
            'store' => $store,
            'coupons'=> $coupons,
        ]);
    }
    public function CategoryPage() {

        return Inertia::render("User/CategoryPage" ,[
            'categories' => Category::latest()->get()
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
    public function SingleCategoryPage($slug){
        return Inertia::render("User/SingleCategoryPage",[
            'category' => Category::latest()->where('slug', $slug)->first()
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
