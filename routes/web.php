<?php

use App\Http\Controllers\Admin\BlogsController;
use App\Http\Controllers\Admin\CouponsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ReorderController;
use App\Http\Controllers\Admin\StoresController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\TagsController;
use App\Http\Controllers\RichTextEditorController;

use App\Http\Controllers\Web\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix("")->name("home.")->group(function () {
    Route::get("/", [HomeController::class, 'Index']);
    Route::get("/store/{slug}", [HomeController::class, 'StorePage']);
    Route::get("/stores", [HomeController::class, 'AllStorePage']);
    Route::get("/category/{slug}", [HomeController::class, 'CategoryPage']);
    Route::get("/blog/{slug}", [HomeController::class, 'singleBlog']);
    Route::get("/all/blogs", [HomeController::class, 'AllBlogs']);
    Route::get("/blogs/category/{category}", [HomeController::class, 'AllBlogs']);
});
Route::prefix('/rating')->name('ratings.')->group(function(){
    Route::post('/store', [HomeController::class,'storeRating'])->name('store');
});
    // Admin Dashboard or Home
    Route::prefix('admin')->group(function () {


        Route::get('/', function () {
            return Inertia::render('Admin/Welcome');
        })->name('home');


    Route::get("/dashboard", [DashboardController::class, 'index'])->name("admin.dashboard");


    // Coupon Routes
    Route::prefix('coupons')->name("admin.coupons.")->group(function () {

        Route::get('/', [CouponsController::class, 'index'])->name('index');
        Route::get('/create', [CouponsController::class, 'create'])->name('create');
        Route::post('/create', [CouponsController::class, 'store'])->name('store');
        Route::delete('/{coupon}', [CouponsController::class, 'destroy'])->name('destroy');
        Route::get('/{coupon}/edit', [CouponsController::class, 'edit'])->name('edit');
        Route::put('/{coupon}', [CouponsController::class, 'update'])->name('update');
        Route::patch('/{coupon}/toggle', [CouponsController::class, 'toggleStatus'])->name('toggle');
        Route::get('/store-types/{storeType}/reorder', [ReorderController::class, 'edit'])->name('reorder.edit');
        Route::post('/store-types/{storeType}/reorder', [ReorderController::class, 'updateOrder'])->name('reorder');

    });

    // Tag Routes
    Route::prefix('tags')->name('admin.tags.')->group(function () {
        Route::get('/', [TagsController::class, 'index'])->name('index');
        Route::get('/create', [TagsController::class, 'create'])->name('create');
        Route::post('/', [TagsController::class, 'store'])->name('store');
        Route::get('/{tag}/edit', [TagsController::class, 'edit'])->name('edit');
        Route::put('/{tag}', [TagsController::class, 'update'])->name('update');
        Route::delete('/{tag}', [TagsController::class, 'destroy'])->name('destroy');
    });

    // Category Routes
    Route::prefix('categories')->name("admin.categories.")->group(function () {

        Route::get('/', [CategoryController::class, 'index'])->name('index');
        Route::get('/create', [CategoryController::class, 'create'])->name('create');
        Route::post('/create', [CategoryController::class, 'store'])->name('store');
        Route::get('/{category}/edit', [CategoryController::class, 'edit'])->name('edit');
        Route::put('/{category}', [CategoryController::class, 'update'])->name('update');
        Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('destroy');

    });


    Route::prefix('stores')->name("admin.stores.")->group(function () {
        Route::get('/', [StoresController::class, 'index'])->name('index');
        Route::get('/create', [StoresController::class, "create"])->name('create');
        Route::post('/create', [StoresController::class, "store"])->name('store');
        Route::delete('/{store}', [StoresController::class, 'destroy'])->name('destroy');
        Route::get('/{store}/edit', [StoresController::class, 'edit'])->name('edit');
        Route::put('/{store}', [StoresController::class, 'update'])->name('update');

    });

    Route::prefix('/blogs')->name('admin.blogs.')->group(function () {
        Route::get('/', [BlogsController::class, 'index'])->name('index');
        Route::get('/create', [BlogsController::class, 'create'])->name('create');
        Route::post('/', [BlogsController::class, 'store'])->name('store');
        Route::patch('/{blog}', [BlogsController::class, 'update'])->name('update');
        Route::get('/{blog}/edit', [BlogsController::class, 'edit'])->name('edit');
    });



});


// Yahan top par tum apne pages banaoge



Route::post('store/editorImage', [RichTextEditorController::class ,'storeImage']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
