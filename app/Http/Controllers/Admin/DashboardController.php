<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\Store;
use App\Models\Category;
use App\Models\Tag;
use Inertia\Inertia;
class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/dashboard', [
            'stats' => [
                'totalCoupons' => Coupon::count(),
                'totalStores' => Store::count(),
                'totalCategories' => Category::count(),
                'totalTags' => Tag::count(),
            ],
        ]);
    }
}