<?php

namespace App\Policies;

use App\Models\Report;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ReportPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Report $report): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole(['admin', 'alumno']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Report $report): bool
    {
        if ($user->id === $report->user_id) {
            return Response::allow();
        }
        return $user->hasRole(['admin']);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Report $report): bool
    {
        if ($user->id === $report->user_id) {
            return Response::allow();
        }
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Report $report): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Report $report): bool
    {
        //
    }

    /**
     * Determine whether the user can toggle the importance of the model.
     */
    public function toggleImportance(User $user, Report $report): bool
    {
        return $user->hasAnyRole(['admin', 'alumno']);
    }

    /**
     * Determine whether the user can assign itself as solver.
     */
    public function assignSolver(User $user, Report $report): bool
    {
        if ($user->id === $report->solver_id) {
            return true;
        }
        if($user->hasRole('mantenimiento') && $report->solver_id === null){
            return true;
        }
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can assign a solver.
     */


}
