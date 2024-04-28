<?php

namespace App\Http\Controllers;

use App\Enums\ReportStatus;
use App\Http\Requests\StoreSolutionRequest;
use App\Http\Requests\UpdateSolutionRequest;
use App\Models\Report;
use App\Models\Solution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

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
                    'solved_at' => $report->solution->solved_at,
                    'solver' => $report->solution->solver->only('id', 'name'),
                    'solution' => $report->solution->only('id', 'description'),
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
        return inertia('Solutions/Create', [
            'reports' => auth()->user()->solverReports()->where('status', ReportStatus::IN_PROGRESS)->get()->map(function ($report) {
                return [
                    'value' => $report->id,
                    'label' => $report->title,
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSolutionRequest $request)
    {
        $solution = $request->user()->solutions()->create($request->except('files'));
        $solution->report()->update(['status' => ReportStatus::SOLVED]);

        $solution->evidences()->createMany(
            collect($request->file('files'))->map(function ($file) {
                return [
                    'path' => $file->store('evidences'),
                ];
            })->toArray()
        );

        return redirect()->route('solutions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Solution $solution)
    {
        $solution->report->load('user:id,name', 'infrastructure:id,name', 'evidences:id,path,evidenceable_id,evidenceable_type', 'solver:id,name');
        $solution->load('evidences:id,path,evidenceable_id,evidenceable_type');
        //Añade el atributo user_added_importance al modelo
        return inertia('Solutions/Show', [
            'solution' => $solution,
            'can' => [
                'update' => auth()->user()->can('update', $solution),
                'delete' => auth()->user()->can('delete', $solution),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Solution $solution)
    {
        $solution->load('evidences:id,path,evidenceable_id,evidenceable_type', 'report:id,title');
        return inertia('Solutions/Edit', [
            'solution' => $solution,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSolutionRequest $request, Solution $solution)
    {
        $solution->update($request->safe()->except('files'));

        if ($request->hasFile('files')) {
            $solution->evidences->each(function ($evidence) {
                Storage::delete($evidence->path);
                $evidence->delete();
            });

            $solution->evidences()->createMany(
                collect($request->file('files'))->map(function ($file) {
                    return [
                        'path' => $file->store('evidences'),
                    ];
                })->toArray()
            );
        }

        return redirect()->route('solutions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Solution $solution)
    {
        Gate::authorize('delete', $solution);

        //Delete evidences
        $solution->evidences->each(function ($evidence) {
            Storage::delete($evidence->path);
            $evidence->delete();
        });

        $solution->report->update(['status' => ReportStatus::IN_PROGRESS]);

        $solution->delete();

        return redirect()->route('solutions.index');
    }

    /**
     * History of the specified resource.
     */
    public function history() {

        return inertia('Solutions/History', [
            'reports' => Report::with('user', 'solution')->whereIn('status', [ReportStatus::SOLVED, ReportStatus::CLOSED])->latest()->get()->map(function ($report) {
                return [
                    'id' => $report->id,
                    'title' => $report->title,
                    'status' => $report->status,
                    'status_label' => ReportStatus::getDescription($report->status),
                    'created_at' => $report->created_at,
                    'user' => $report->user->only('id', 'name'),
                    'infrastructure' => $report->infrastructure?->only('name'),
                    'solved_at' => $report->solution->solved_at,
                    'solver' => $report->solution->solver->only('id', 'name'),
                    'solution' => $report->solution->only('id', 'description'),
                ];
            }),
        ]);
    }
}
