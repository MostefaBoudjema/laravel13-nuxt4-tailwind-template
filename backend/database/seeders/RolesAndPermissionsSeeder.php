<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'view dashboard',
            'view reports',
            'manage users',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions($permissions); // all permissions

        $manager = Role::firstOrCreate(['name' => 'manager']);
        $manager->syncPermissions(['view dashboard', 'view reports', 'manage users']);

        $user = Role::firstOrCreate(['name' => 'user']);
        $user->syncPermissions(['view dashboard']);

        $this->command->info('Roles and permissions created successfully.');
    }
}
