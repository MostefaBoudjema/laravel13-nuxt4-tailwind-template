<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ReportController extends Controller
{
    /**
     * Get reports summary (admin + manager only).
     */
    public function index(): JsonResponse
    {
        $totalUsers   = User::count();
        $adminCount   = User::role('admin')->count();
        $managerCount = User::role('manager')->count();
        $userCount    = User::role('user')->count();

        return response()->json([
            'data' => [
                'summary' => [
                    'total_users'   => $totalUsers,
                    'admins'        => $adminCount,
                    'managers'      => $managerCount,
                    'regular_users' => $userCount,
                ],
                'recent_registrations' => User::select(['id', 'name', 'email', 'created_at'])
                    ->latest()
                    ->take(10)
                    ->get()
                    ->map(fn(User $u) => [
                        'id'         => $u->id,
                        'name'       => $u->name,
                        'email'      => $u->email,
                        'created_at' => $u->created_at,
                    ]),
                'generated_at' => now()->toIso8601String(),
            ],
        ]);
    }
}
