<?php

namespace Database\Seeders;

use App\Models\Infrastructure;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //ROLES
        $adminRole = Role::create(['name' => 'admin']);
        $mantenimientoRole = Role::create(['name' => 'mantenimiento']);
        $alumnoRole = Role::create(['name' => 'alumno']);

        //CREAR USUARIOS
        User::factory()->create([
            'name' => 'AdminTest',
            'email' => 'admin@gmail.com',
            'code' => '111222333',
            'password' => Hash::make('password')
        ]);
        User::factory()->create([
            'name' => 'MantenimientoTest',
            'email' => 'mantenimiento@gmail.com',
            'code' => '234234234',
            'password' => Hash::make('password')
        ]);
        User::factory()->create([
            'name' => 'AlumnoTest',
            'email' => 'alumno@gmail.com',
            'code' => '123123123',
            'password' => Hash::make('password')
        ]);


        //ASIGNAR ROLES
        $user = User::find(1);
        $user->assignRole('admin');
        $user = User::find(2);
        $user->assignRole('mantenimiento');
        $user = User::find(3);
        $user->assignRole('alumno');




        //Infrastructures
        Infrastructure::create([
            'name' => 'Otros',
            'description' => 'Para infraestructuras que no se encuentran en el sistema o son muy especificas'
        ]);



        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
