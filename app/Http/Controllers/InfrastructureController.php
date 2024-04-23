<?php

namespace App\Http\Controllers;

use App\Models\Infrastructure;
use Illuminate\Http\Request;

class InfrastructureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Infrastructures/Index', [
            'infrastructures' => Infrastructure::select('id', 'name', 'description')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Infrastructures/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->user()->can('create', Infrastructure::class);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:infrastructures',
            'description' => 'required|string|max:255',
        ]);

        Infrastructure::create($validated);

        return redirect()->route('infrastructures.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Infrastructure $infrastructure)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Infrastructure $infrastructure)
    {
        return inertia('Infrastructures/Create', [
            'infrastructure' => $infrastructure->only('id', 'name', 'description')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Infrastructure $infrastructure)
    {
        $request->user()->can('update', Infrastructure::class);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:infrastructures,name,' . $infrastructure->id,
            'description' => 'required|string|max:255',
        ]);
        $infrastructure->update($validated);

        return redirect()->route('infrastructures.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Infrastructure $infrastructure)
    {
        //
    }
}
