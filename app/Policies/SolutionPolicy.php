<?php

namespace App\Policies;

use App\Enums\ReportStatus;
use App\Models\Solution;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SolutionPolicy
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
    public function view(User $user, Solution $solution): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'mantenimiento']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Solution $solution): bool
    {
        if ($solution->report->status === ReportStatus::CLOSED) {
            return false;
        }
        if ($user->id === $solution->user_id) {
            return true;
        }
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Solution $solution): bool
    {
        if ($solution->report->status === ReportStatus::CLOSED) {
            return false;
        }
        if ($user->id === $solution->user_id) {
            return true;
        }
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Solution $solution): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Solution $solution): bool
    {
        //
    }
}
