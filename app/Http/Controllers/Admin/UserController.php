<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        // Search
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }

        // Sorting
        $sortBy = $request->input('sort', 'created_at');
        $sortDir = $request->input('direction', 'desc');
        $query->orderBy($sortBy, $sortDir);

        // Paginate
        $users = $query->latest()->paginate(50)->withQueryString();
        return Inertia::render('Admin/User/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }
    public function create($id = null)
    {
        return Inertia::render('Admin/User/Create', [
            'user' => User::find($id),
        ]);
    }
    public function store(Request $request, $id = null)
    {

        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|string|max:255|unique:users,email,' . $id,

        ];
        if (empty($id)) {
            $data['password'] = 'required|string';
        }
        if ($request->hasFile('profile')) {
            $rules['profile'] = 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5000';;
        }
        $validated = $request->validate($rules);
        $validated['email_verified_at'] = isset($validated['is_active']) && $validated['is_active'] ? Carbon::now() : null;
        if ($request->hasFile('profile')) {
            $file = $request->file('profile');
            $imageName = strtolower(str_replace(" ", "-", $request->name)) . '.' . $file->getClientOriginalExtension();
            $userImage = $file->storeAs('user-profile', $imageName, 'public');
            $validated['profile']  =  url('/storage/' . $userImage);
        }
        $storeUser = User::updateOrCreate(['id' => $id],  $validated);
        if ($storeUser) {
            return redirect()->route('admin.users.index')->with('success', 'User has been ' . ($id ? 'updated...!' : 'created...!'));
        }
    }
    public function destroy(User $user)
    {
        $user->forceDelete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
    public function toggleStatus(User $user)
    {
        $emailVerified =  !empty($user->email_verified_at) ? null : Carbon::now();
        $user->email_verified_at = $emailVerified;
        $user->update();
        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }
}