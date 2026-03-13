<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Get all users (admin only).
     */
    public function index(): JsonResponse
    {
        $users = User::with('roles', 'permissions')
            ->select(['id', 'name', 'email', 'created_at'])
            ->get()
            ->map(fn(User $user) => [
                'id'          => $user->id,
                'name'        => $user->name,
                'email'       => $user->email,
                'roles'       => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'created_at'  => $user->created_at,
            ]);

        return response()->json([
            'data'  => $users,
            'total' => $users->count(),
        ]);
    }
}
