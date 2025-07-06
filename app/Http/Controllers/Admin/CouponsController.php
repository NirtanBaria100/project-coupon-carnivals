<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\Store;
use App\Models\Tag;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Str;

class CouponsController extends Controller
{
    // Display a listing of the resource.
    public function index(Request $request)
    {
        $query = Coupon::with('stores');

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('sort')) {
            $query->orderBy($request->sort, $request->direction ?? 'desc');
        }
        if(!$request->filled('sort')){
            $query->orderBy('created_at', 'desc');

        }
        return Inertia::render('Admin/Coupon/Index', [
            'coupons' => $query->paginate(perPage: 50)->withQueryString(),
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }
    // Show the form for creating a new resource.
    public function create()
    {
        return Inertia::render('Admin/Coupon/Create', [
            'stores' => Store::select('id', 'name')->get(),
            'tags' => Tag::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'long_desc' => 'nullable|string',
            'coupon_type' => 'required|in:code,deal',
            'code' => 'required_if:coupon_type,code|nullable|string|max:255',
            'coupon_url' => 'nullable|url',
            'expires' => 'nullable|date',
            'featured_image' => 'nullable|image',
            'is_exclusive' => 'boolean',
            'is_featured' => 'boolean',
            'is_verified' => 'boolean',
            'is_published' => 'boolean',
            'stores' => 'required|array',
            'tags' => 'nullable|array',
            'categories' => 'nullable|array',
        ]);

        // 🔁 Convert empty string to null for expires
        if ($data['expires'] === '') {
            $data['expires'] = null;
        }

        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            $filename = Str::slug($request->name) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('coupons', $filename, 'public'); // stores in storage/app/public/thumbnails
            $appUrl = config("app.url");
            $data['featured_image'] = $appUrl . '/storage/' . $path; // public URL
        }

        $coupon = Coupon::create($data);

        // Attach pivot relationships
        $coupon->stores()->sync($data['stores']);

        if (!empty($data['tags'] ?? [])) {
            $coupon->tags()->sync($data['tags']);
        }

        if (!empty($data['categories'] ?? [])) {
            $coupon->categories()->sync($data['categories']);
        }
        // Create entries in coupon_order with position for each store
        foreach ($data['stores'] as $storeId) {
            $maxPosition = DB::table('coupon_order')
                ->where('store_id', $storeId)
                ->max('position');

            DB::table('coupon_order')->insert([
                'store_id' => $storeId,
                'coupon_id' => $coupon->id,
                'position' => is_null($maxPosition) ? 0 : $maxPosition + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon created successfully.');
    }

    // Display the specified resource.
    public function show(Coupon $coupon)
    {
        return Inertia::render('admin/coupons/ShowCoupon', [
            'coupon' => $coupon
        ]);
    }

    // Show the form for editing the specified resource.
    public function edit(Coupon $coupon)
    {
        $coupon->load(['stores', 'tags', 'categories']);

        return Inertia::render('Admin/Coupon/Edit', [
            'coupon' => $coupon,
            'stores' => Store::all(['id', 'name']),
            'tags' => Tag::all(['id', 'name']),
            'categories' => Category::all(['id', 'name']),
        ]);
    }


    // Update the specified resource in storage.
    public function update(Request $request, Coupon $coupon)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'long_desc' => 'nullable|string',
            'coupon_type' => 'required|string',
            'code' => 'required_if:coupon_type,code|nullable|string|max:255',
            'coupon_url' => 'nullable|url',
            'expires' => 'nullable|date',
            'is_exclusive' => 'boolean',
            'is_featured' => 'boolean',
            'is_verified' => 'boolean',
            'is_published' => 'boolean',
            'featured_image' => 'nullable|image',

            'store_ids' => 'required|array',
            'store_ids.*' => 'exists:stores,id',
            'tag_ids' => 'nullable|array',
            'tag_ids.*' => 'exists:tags,id',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:categories,id',
        ]);


        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            $filename = Str::slug($request->name) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('coupons', $filename, 'public');
            $appUrl = config("app.url");
            $validated['featured_image'] = $appUrl . '/storage/' . $path;
        }

        // Handle checkboxes
        $validated['is_exclusive'] = $request->boolean('is_exclusive');
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_verified'] = $request->boolean('is_verified');
        $validated['is_published'] = $request->boolean('is_published');

        $coupon->update($validated);

        // Sync many-to-many relationships
        $coupon->stores()->sync($request->input('store_ids', []));

        if (!empty($request->input('tag_ids'))) {
            $coupon->tags()->sync($request->input('tag_ids'));
        }

        if (!empty($request->input('category_ids'))) {
            $coupon->categories()->sync($request->input('category_ids'));
        }

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon updated successfully.');
    }



    public function toggleStatus(Request $request, Coupon $coupon , $field = null)
    {
        $coupon->$field = $coupon->$field == 1 ? 0 : 1 ;

        $coupon->update();
        return redirect()->route('admin.coupons.index')->with('success', 'Coupon Updated successfully.');
    }

    // Remove the specified resource from storage.
    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return redirect()->route('admin.coupons.index')->with('success', 'Coupon deleted successfully.');
    }
}
