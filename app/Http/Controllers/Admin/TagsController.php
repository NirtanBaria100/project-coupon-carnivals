<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        $tags = Tag::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('desc', 'like', "%{$search}%");
            })
            ->orderBy($sort, $direction)
            ->paginate(50)
            ->appends($request->only('search', 'sort', 'direction'));

        return Inertia::render('Admin/Tag/Index', [
            'tags' => $tags,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tag/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:tags,slug',
            'desc' => 'nullable|string',
        ]);

        Tag::create($request->only('name', 'slug', 'desc'));

        return redirect()->route('admin.tags.index')->with('success', 'Tag created.');
    }

    public function edit(Tag $tag)
    {
        return Inertia::render('Admin/Tag/Edit', [
            'tag' => $tag,
        ]);
    }

    public function update(Request $request, Tag $tag)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:tags,slug,' . $tag->id,
            'desc' => 'nullable|string',
        ]);

        $tag->update($request->only('name', 'slug', 'desc'));

        return redirect()->route('admin.tags.index')->with('success', 'Tag updated.');
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return redirect()->route('admin.tags.index')->with('success', 'Tag deleted.');
    }
}
