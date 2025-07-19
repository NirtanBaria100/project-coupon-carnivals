<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\Store;
use App\Models\User;
use App\Models\Category;
use App\Models\Rating;
use App\Models\Tag;
use Carbon\Carbon;
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
                'totalUsers' => User::count(),
                'ratings' => Rating::whereDate('created_at','==', Carbon::now())->count(),
            ],
        ]);
    }
}