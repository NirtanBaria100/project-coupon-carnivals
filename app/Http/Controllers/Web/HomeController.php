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
            'stores' => Store::latest()->where('slug', $slug)->get()
        ]);
    }
    public function CategoryPage() {
        return Inertia::render("User/CategoryPage");
    }
    
}