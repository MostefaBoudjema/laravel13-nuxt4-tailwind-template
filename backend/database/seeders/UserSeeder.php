<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@saas.com'],
            [
                'name'     => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );
        $admin->assignRole('admin');

        // Manager user
        $manager = User::firstOrCreate(
            ['email' => 'manager@saas.com'],
            [
                'name'     => 'Manager User',
                'password' => Hash::make('password'),
            ]
        );
        $manager->assignRole('manager');

        // Regular user
        $user = User::firstOrCreate(
            ['email' => 'user@saas.com'],
            [
                'name'     => 'Regular User',
                'password' => Hash::make('password'),
            ]
        );
        $user->assignRole('user');

        $this->command->info('Demo users created: admin@saas.com, manager@saas.com, user@saas.com (password: password)');
    }
}
