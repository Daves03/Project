<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if roles exist
        $adminRole = Role::findByName('admin'); // Fetch the admin role
        $studentRole = Role::findByName('student'); // Fetch the student role

        // Create a user if it does not exist
        $user = User::firstOrCreate(
            ['email' => 'admin@example.com'], // Unique key to check if the user exists
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'), // Hash the password
            ]
        );

        // Assign role to the user if the role exists
        if ($adminRole) {
            $user->assignRole($adminRole);
        }
    }
}

