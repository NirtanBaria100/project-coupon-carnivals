<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
class UserController extends Controller
{
    public function index (Request $request) {
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
        $users = $query->paginate(50)->withQueryString();
        return Inertia::render('Admin/User/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }
    public function destroy(User $user){
        $user->forceDelete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
    public function toggleStatus(User $user){
        $emailVerified =  !empty($user->email_verified_at) ? null : Carbon::now() ;
        $user->email_verified_at = $emailVerified ;
        $user->update();
        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }
}
