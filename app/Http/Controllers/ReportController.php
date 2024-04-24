<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Enums\ReportStatus;
use App\Models\Infrastructure;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use stdClass;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Reports/Index', [
            'reports' => Report::withCount('importance')->with('user')->whereIn('status', [ReportStatus::OPEN, ReportStatus::IN_PROGRESS])->latest()->get()->map(function ($report) {
                return [
                    'id' => $report->id,
                    'title' => $report->title,
                    'description' => $report->description,
                    'status' => $report->status,
                    'status_label' => ReportStatus::getDescription($report->status),
                    'solver' => $report->solver?->only('id', 'name'),
                    'created_at' => $report->created_at,
                    'user' => $report->user->only('id', 'name'),
                    'infrastructure' => $report->infrastructure?->only('name'),
                    'importance_added' => $report->user_added_importance,
                    'importance' => $report->importance_count,
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
        $report = $request->user()->reports()->create($request->except('files'));

        $report->evidences()->createMany(
            collect($request->file('files'))->map(function ($file) {
                return [
                    'path' => $file->store('evidences'),
                ];
            })->toArray()
        );

        return redirect()->route('reports.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        // Gate::authorize('view', $report);
        $report->load('user:id,name', 'infrastructure:id,name', 'evidences:id,path,evidenceable_id,evidenceable_type', 'solver:id,name');
        $report->loadCount('importance as importance');
        //Añade el atributo user_added_importance al modelo
        $report->importance_added = $report->user_added_importance;
        return inertia('Reports/Show', [
            'report' => $report,
            'can' => [
                'assignSolver' => auth()->user()->can('assignSolver', $report),
                // 'update' => auth()->user()->can('update', $report),
                // 'delete' => auth()->user()->can('delete', $report),
                'toggleImportance' => auth()->user()->can('toggleImportance', $report),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        $defaultSolver = new User([
            'id' => null,
            'name' => 'Sin asignar',
        ]);
        $report->load('evidences:id,path,evidenceable_id,evidenceable_type');
        return inertia('Reports/Edit', [
            'report' => $report,
            'solvers' => User::select('id', 'name')->whereHas('roles', function ($query) {
                $query->where('name', 'mantenimiento');
            })->get()
            ->prepend($defaultSolver)
            ->map(function ($solver) {
                return [
                    'value' => $solver->id,
                    'label' => $solver->name,
                ];
            }),
            'infrastructures' => Infrastructure::select('id', 'name')->get()->map(function ($infrastructure) {
                return [
                    'value' => $infrastructure->id,
                    'label' => $infrastructure->name,
                ];
            }),
        ]);
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
        Gate::authorize('delete', $report);

        //Delete evidences
        $report->evidences->each(function ($evidence) {
            Storage::delete($evidence->path);
            $evidence->delete();
        });

        $report->delete();

        return redirect()->route('reports.index');
    }

    /**
     * Toggle the importance of the report.
     */
    public function toggleImportance(Report $report)
    {
        Gate::authorize('toggleImportance', $report);

        $report->importance()->toggle([auth()->id()]);

        return redirect()->back();
    }

    /**
     * Assign a solver to the report.
     */
    public function assignSolver(Request $request, Report $report)
    {
        Gate::authorize('assignSolver', $report);

        $validated = $request->validate([
            'solver_id' => 'nullable|exists:users,id',
        ]);
        
        $report->solver_id = $validated['solver_id'];
        $report->save();

        return redirect()->back();
    }
}
