<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => Blog::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blogs/Create', [
            'categories' => Category::all(['id', 'name']),
            'csrfToken' => csrf_token()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:blogs,title',
            'slug' => 'required|string|max:255|unique:blogs,slug',
            'content' => 'required|string',
            'image' => 'nullable',
            'is_published' => 'boolean',
            'category_id' => 'nullable|exists:categories,id',
            'focus_keyphrase' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('blogs', 'public');
        }

        $validated['user_id'] = auth()->id();
        $validated['published_at'] = $validated['is_published'] ? now() : null;

        Blog::create($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog created successfully.');
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog,
            'categories' => Category::all(['id', 'name']),
            'csrfToken' => csrf_token()
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:blogs,title,' . $blog->id,
            'slug' => 'required|string|max:255|unique:blogs,slug,' . $blog->id,
            'content' => 'required|string',
            'image' => 'nullable|string',
            'is_published' => 'boolean',
            'category_id' => 'nullable|exists:categories,id',
            'focus_keyphrase' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
    $validated['image'] = $request->file('image')->store('blogs', 'public');
}
        $validated['published_at'] = $validated['is_published'] ? now() : null;

        $blog->update($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog updated successfully.');
    }
}
