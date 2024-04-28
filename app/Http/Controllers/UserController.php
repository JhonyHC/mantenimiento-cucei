<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Users/Index', [
            'users' => User::select('id', 'name', 'email', 'code')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Users/Create', [
            'roles' => Role::select('id', 'name')->get()->map(function ($role) {
                return [
                    'value' => $role->name,
                    'label' => ucfirst($role->name),
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'code' => 'required|string|numeric|digits:9|unique:' . User::class,
            'role' => 'required|string|exists:roles,name',
            'password' => ['required', Rules\Password::defaults()],
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'code' => $request->code,
            'password' => Hash::make($request->password),
        ]);
        $user->assignRole($request->role);

        return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'code' => $user->code,
                'role' => $user->roles->first()->name,
            ],
            'roles' => Role::select('id', 'name')->get()->map(function ($role) {
                return [
                    'value' => $role->name,
                    'label' => ucfirst($role->name),
                ];
            }),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|lowercase|email|max:255|unique:' . User::class . ',email,' . $user->id,
            'code' => 'string|numeric|digits:9|unique:' . User::class . ',code,' . $user->id,
            'role' => 'string|exists:roles,name',
            'password' => ['nullable',Rules\Password::defaults()],
        ]);
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }
        // dd($validated);
        $user->update($validated);
        $user->syncRoles($request->role);

        return redirect()->route('users.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (!auth()->user()->hasRole('admin')) {
            abort(403);
        }
        $user->delete();
        return redirect()->route('users.index');
    }
}
