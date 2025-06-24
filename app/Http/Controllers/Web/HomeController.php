<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Store;

class HomeController extends Controller
{

    public function Index(){
        return Inertia::render("Web/Index");
    }
    public function StorePage($slug) {
        return Inertia::render("User/StorePage",[
            'store' => Store::latest()->where('slug', $slug)->first()
        ]);
    }
    public function CategoryPage() {

        return Inertia::render("User/CategoryPage" ,[
            'categories' => Category::latest()->get()
        ]);
    }

    public function AllStorePage() {
        return Inertia::render("User/AllStorePage",[
            'stores' => Store::latest()->get()
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
