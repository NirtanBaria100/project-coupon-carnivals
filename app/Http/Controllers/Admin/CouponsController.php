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
        $query = Coupon::query();

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('sort')) {
            $query->orderBy($request->sort, $request->direction ?? 'asc');
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
            'code' => 'nullable|string',
            'coupon_url' => 'nullable|url',
            'expires' => 'nullable|date',
            'featured_image' => 'nullable|image',
            'is_exclusive' => 'boolean',
            'is_featured' => 'boolean',
            'is_verified' => 'boolean',
            'is_published' => 'boolean',
            'stores' => 'required|array',
            'tags' => 'required|array',
            'categories' => 'required|array',
        ]);

        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            $filename = Str::slug($request->name) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('coupons', $filename, 'public'); // stores in storage/app/public/thumbnails
            $data['featured_image'] = '/storage/' . $path; // public URL
        }
        
        $coupon = Coupon::create($data);

        // Attach pivot relationships
        $coupon->stores()->sync($data['stores']);
        $coupon->tags()->sync($data['tags']);
        $coupon->categories()->sync($data['categories']);

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
            'long_desc' => 'required|string',
            'coupon_type' => 'required|string',
            'code' => 'nullable|string|max:255',
            'coupon_url' => 'nullable|url',
            'expires' => 'nullable|date',
            'is_exclusive' => 'sometimes|boolean',
            'is_featured' => 'sometimes|boolean',
            'is_verified' => 'sometimes|boolean',
            'is_published' => 'sometimes|boolean',
            'featured_image' => 'nullable|image',

            // Optional relationship validation
            'store_ids' => 'array',
            'store_ids.*' => 'exists:stores,id',
            'tag_ids' => 'array',
            'tag_ids.*' => 'exists:tags,id',
            'category_ids' => 'array',
            'category_ids.*' => 'exists:categories,id',

        ]);

        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            $filename = Str::slug($request->name) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('coupons', $filename, 'public'); // stores in storage/app/public/thumbnails
            $validated['featured_image'] = '/storage/' . $path; // public URL
        }
        
        // Ensure checkboxes are set correctly
        $validated['is_exclusive'] = $request->boolean('is_exclusive');
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_verified'] = $request->boolean('is_verified');
        $validated['is_published'] = $request->boolean('is_published');

        $coupon->update($validated);

        // Sync many-to-many relationships
        $coupon->stores()->sync($request->input('store_ids', []));
        $coupon->tags()->sync($request->input('tag_ids', []));
        $coupon->categories()->sync($request->input('category_ids', []));

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon updated successfully.');
    }


    public function toggleStatus(Request $request, Coupon $coupon)
    {
        $field = array_keys($request->all())[0]; // Get the field being updated
        $value = $request->input($field);

        // Validate the field and value
        $allowedFields = ['is_published', 'is_featured', 'is_verified', 'is_exclusive'];

        if (!in_array($field, $allowedFields)) {
            return response()->json(['error' => 'Invalid field'], 422);
        }

        $coupon->$field = (bool) $value;
        $coupon->save();

        return response()->json(['success' => true, 'message' => 'Status updated']);
    }

    // Remove the specified resource from storage.
    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return redirect()->route('admin.coupons.index')->with('success', 'Coupon deleted successfully.');
    }
}
