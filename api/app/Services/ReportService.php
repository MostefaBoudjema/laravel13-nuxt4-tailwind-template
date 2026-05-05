<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;

class ReportService
{
    /**
     * Get reports summary (admin + manager only).
     *
     * @param array $filters
     * @return array
     */
    public function getSummary(array $filters): array
    {
        $totalUsers   = User::count();
        $adminCount   = User::role('admin')->count();
        $managerCount = User::role('manager')->count();
        $userCount    = User::role('user')->count();

        $recentQuery = User::select(['id', 'name', 'email', 'created_at']);
        
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $recentQuery->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        return [
            'summary' => [
                'total_users'   => $totalUsers,
                'admins'        => $adminCount,
                'managers'      => $managerCount,
                'regular_users' => $userCount,
            ],
            'recent_registrations' => $recentQuery
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
        ];
    }
}
