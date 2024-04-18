<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Enums\ReportStatus;
use App\Models\Infrastructure;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Reports/Index', [
            'reports' => Report::with('user')->whereIn('status', [ReportStatus::OPEN, ReportStatus::IN_PROGRESS])->latest()->get()->map(function ($report) {
                return [
                    'id' => $report->id,
                    'title' => $report->title,
                    'status' => $report->status,
                    'status_label' => ReportStatus::getDescription($report->status),
                    'created_at' => $report->created_at->format('d/m/Y'),
                    'user' => $report->user->only('name'),
                ];
            }),
            'can' => [
                'create' => auth()->user()->can('create', Report::class),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Reports/Create', [
            'infrastructures' => Infrastructure::select('id', 'name')->get()->map(function ($infrastructure) {
                return [
                    'value' => $infrastructure->id,
                    'label' => $infrastructure->name,
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReportRequest $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        //
    }
}
