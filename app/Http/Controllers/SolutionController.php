<?php

namespace App\Http\Controllers;

use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\Solution;
use Illuminate\Http\Request;

class SolutionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Solutions/Index', [
            'reports' => Report::with('user', 'solution')->where('status', ReportStatus::SOLVED)->get()->map(function ($report) {
                return [
                    'id' => $report->id,
                    'title' => $report->title,
                    'status' => $report->status,
                    'status_label' => ReportStatus::getDescription($report->status),
                    'created_at' => $report->created_at,
                    'user' => $report->user->only('id', 'name'),
                    'infrastructure' => $report->infrastructure?->only('name'),
                    'description' => $report->solution->description,
                    'solved_at' => $report->solution->solved_at,
                    'solver' => $report->solution->solver->only('id', 'name'),
                ];
            }),
            'can' => [
                'create' => auth()->user()->can('create', Solution::class),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Solution $solution)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Solution $solution)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Solution $solution)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Solution $solution)
    {
        //
    }
}
