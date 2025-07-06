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
            'image' => 'required|nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5000',
            'is_published' => 'boolean',
            'category_id' => 'nullable|exists:categories,id',
            'focus_keyphrase' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ]);
        $validated['slug'] =  strtolower(str_replace(' ','-',$validated['slug']));
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = Str::slug($request->title) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('post', $filename, 'public'); // stores in storage/app/public/images
            $appUrl = config("app.url");
            $validated['image'] = $appUrl.'/storage/' . $path; // public URL
        }
        $validated['user_id'] = auth()->id();
        $validated['published_at'] = $validated['is_published'] ? now() : null;
        $validated['author_id'] = auth()->user()->id;
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
        $rules = [
            'title' => 'required|string|max:255|unique:blogs,title,' . $blog->id,
            'slug' => 'required|string|max:255|unique:blogs,slug,' . $blog->id,
            'content' => 'required|string',
            'is_published' => 'boolean',
            'category_id' => 'nullable|exists:categories,id',
            'focus_keyphrase' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ];
        if($request->hasFile('image')){
            $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5000';;
        }
        $validated = $request->validate($rules);
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = Str::slug($request->title) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('post', $filename, 'public'); // stores in storage/app/public/images
            $validated['image'] = url('/storage/' . $path); // public URL
        }
        $validated['published_at'] = $validated['is_published'] ? now() : null;
        $validated['slug'] =  strtolower(str_replace(' ','-',$validated['slug']));

        $blog->update($validated);
        return redirect()->route('admin.blogs.index')->with('success', 'Blog created successfully.');
    }
    public function delete(Blog $blog){
        $blog->delete();
        return redirect()->route('admin.blogs.index')->with('success', 'Blog deleted successfully.');
    }
    public function toggleStatus(Blog $blog){
        $blogPublished =  $blog->is_published == 1 ? 0 : 1 ;
        $blog->is_published = $blogPublished ;
        $blog->update();
        return redirect()->route('admin.blogs.index')->with('success', 'Blog updated successfully.');
    }
}
