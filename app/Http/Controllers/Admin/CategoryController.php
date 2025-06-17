<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // Show list of categories
    public function index(Request $request)
    {
        // dd($request);
        $query = Category::with('parent'); // Eager load parent category

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%");
        }

        if ($sort = $request->input('sort')) {
            $direction = $request->input('direction', 'asc');
            $query->orderBy($sort, $direction);
        }

        $categories = $query->paginate(50)->withQueryString();

        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }


    // Show create form
    public function create()
    {
        $categories = Category::select('id', 'name')->get();

        return Inertia::render('Admin/Category/Create', [
            'categories' => $categories,
        ]);
    }
    // Store a new category
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
            'desc' => 'nullable|string',
            'parent_cat' => 'nullable|exists:categories,id',
            'icon' => 'required|string',
            'image_icon' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
            'single_line_desc' => 'nullable|string|max:255',
            'is_popular' => 'boolean',
            'focus_keyphrase' => 'required|string|max:255',
            'seo_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);


        if ($request->hasFile('image_icon')) {
            $imagePath = $request->file('image_icon')->store('category-icons', 'public');
            $validated['image_icon'] = asset('storage/' . $imagePath);
        }

        Category::create($validated);

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    // Show edit form
    public function edit(Category $category)
    {
        $category->load(['parent']);

        return Inertia::render('Admin/Category/Edit', [
            'category' => $category,
            'categories' => Category::where('id', '!=', $category->id)->get(), // Exclude current category as parent
        ]);
    }

    // Update category
    public function update(Request $request, Category $category)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'desc' => 'nullable|string',
            'parent_cat' => 'nullable',
            'icon' => 'required|string',
            'image_icon' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'single_line_desc' => 'nullable|string|max:255',
            'is_popular' => 'boolean',
            'focus_keyphrase' => 'required|string|max:255',
            'seo_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

       if ($request->hasFile('image_icon')) {
            $imagePath = $request->file('image_icon')->store('category-icons', 'public');
            $validated['image_icon'] = asset('storage/' . $imagePath);
        }

        $category->update($validated);

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
    }

    // Delete category
    public function destroy(Category $category)
    {
        // dd($category);
        $category->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully.');
    }
}
