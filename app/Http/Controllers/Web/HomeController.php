<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;


class HomeController extends Controller
{

    public function Index(){
        return Inertia::render("Web/Index");
    }
    public function StorePage() {
        return Inertia::render("User/StorePage");
    }
    public function CategoryPage() {
        return Inertia::render("User/CategoryPage");
    }
    
}