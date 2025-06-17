<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
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

        return Inertia::render('Admin/Store/Index', [
            'stores' => $stores,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    // Show the form for creating a new store
    public function create()
    {
        return Inertia::render('Admin/Store/Create');
    }

    // Store a newly created store in storage


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:stores,slug',
            'desc' => 'required|nullable|string',
            'home_url' => 'required|nullable|url',
            'affiliate_irl' => 'required|nullable|url',
            'thumbnail' => 'required|nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'is_featured' => 'boolean',
            'extra_info' => 'nullable|string',
        ]);

        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = Str::slug($request->name) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('thumbnails', $filename, 'public'); // stores in storage/app/public/thumbnails
            $validated['thumbnail'] = '/storage/' . $path; // public URL
        }

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
            'extra_info' => 'nullable|string',
            'focus_keyphrase' => 'nullable|string|max:255',
            'seo_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = '/storage/' . $request->file('thumbnail')->store('thumbnails', 'public');
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
}
