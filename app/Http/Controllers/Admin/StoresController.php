<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Rating;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class StoresController extends Controller
{
    // Display a listing of the stores
    public function index(Request $request)
    {
        $query = Store::query();

        // Search
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%")
                ->orWhere('desc', 'like', "%{$search}%");
        }

        // Sorting
        $sortBy = $request->input('sort', 'created_at');
        $sortDir = $request->input('direction', 'desc');
        $query->orderBy($sortBy, $sortDir);

        // Paginate
        $stores = $query->paginate(50)->withQueryString();
        $stores->getCollection()->transform(function ($query) {
            $query->ratings = $query->storeRatings->count();
            return $query;
        });
        return Inertia::render('Admin/Store/Index', [
            'stores' => $stores,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    // Show the form for creating a new store
    public function create()
    {
        return Inertia::render('Admin/Store/Create',[
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }

    // Store a newly created store in storage


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:stores,slug',
            'desc' => 'nullable|nullable|string',
            'home_url' => 'nullable|nullable|url',
            'category_id' => 'required',
            'affiliate_irl' => 'nullable|nullable|url',
            'thumbnail' => 'nullable|nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'is_featured' => 'boolean',
            'extra_info' => 'nullable|string',
        ]);
        $validated['slug'] =  strtolower(str_replace(' ','-',$validated['slug']));
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = Str::slug($request->name) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('thumbnails', $filename, 'public'); // stores in storage/app/public/thumbnails
            $appUrl = config("app.url");
            $validated['thumbnail'] = $appUrl . '/storage/' . $path; // public URL
        }
        $validated['category_id'] = $validated['category_id']['value'];
        Store::create($validated);

        return redirect()->route('admin.stores.index')->with('success', 'Store created successfully.');
    }


    // Display the specified store
    public function show(Store $store)
    {
        return Inertia::render('Admin/Store/Show', [
            'store' => $store,
        ]);
    }

    // Show the form for editing the specified store
    public function edit(Store $store)
    {



        return Inertia::render('Admin/Store/Edit', [
            'store' => $store,
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Store $store)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:stores,slug,' . $store->id,
            'desc' => 'nullable|string',
            'home_url' => 'nullable|url',
            'affiliate_irl' => 'nullable|url',
            'thumbnail' => 'nullable|image|max:2048',
            'is_featured' => 'boolean',
            'category_id' => 'required',
            'extra_info' => 'nullable|string',
            'focus_keyphrase' => 'nullable|string|max:255',
            'seo_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
        ]);
        $validated['slug'] =  strtolower(str_replace(' ','-',$validated['slug']));
        if ($request->hasFile('thumbnail')) {
            $appUrl = config("app.url");
            $validated['thumbnail'] = $appUrl . '/storage/' . $request->file('thumbnail')->store('thumbnails', 'public');
        }

        $store->update($validated);

        return redirect()->route('admin.stores.index')->with('success', 'Store updated successfully.');
    }


    // Remove the specified store from storage
    public function destroy(Store $store)
    {
        $store->delete();

        return redirect()->route('admin.stores.index')->with('success', 'Store deleted successfully.');
    }
    public function ratings(Request $request, $store_id = '')
    {
        $query = Rating::query()->where('store_id', $store_id);
        $storeName = Store::where('id',$store_id)->pluck('name');

        // Search
        if ($search = $request->input('search')) {
            $query->where('ip_address', 'Like', "%{$search}%");
        }

        // Sorting
        $sortBy = $request->input('sort', 'created_at');
        $sortDir = $request->input('direction', 'desc');
        $query->orderBy($sortBy, $sortDir);

        // Paginate
        $ratings = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/Store/Rating', [
            'ratings' => $ratings,
            'store_id' => $store_id,
            'store_name'=> $storeName[0],
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }
    public function updateRatings(Request $request)
    {
        $data = $request->all();
        $status = $data['data']['status'];
        $id     = $data['data']['id'];
        $updateStatus = Rating::where(['id' => $id])->update( [
            'is_approved' => $status,
        ]);
        $status =  $status == 1 ? 'Approved' : ($status == 2 ? 'Rejected' :"added to Pending");
        $message = 'Rating has been ' . $status;
        return redirect()->back()->with( 'success',$message);
    }
    public function destroyRatings($id)
    {
        Rating::where(['id'=> $id])->delete();
        return redirect()->back()->with('success', 'Store Rating deleted successfully.');
    }
}
