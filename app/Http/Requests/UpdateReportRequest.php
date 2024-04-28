<?php

namespace App\Http\Requests;

use App\Enums\ReportStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if ($this->has('solver_id')) {
            return $this->user()->can('assignSolver', $this->route('report'));
        }
        return $this->user()->can('update', $this->route('report'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'string|max:255',
            'description' => 'string|max:255',
            'infrastructure_id' => 'exists:infrastructures,id',
            'evidence_description' => 'nullable|string|max:255',
            'status' => [Rule::enum(ReportStatus::class)],
            'solver_id' => 'nullable|exists:users,id',
            'files' => ['array', 'min:0', 'max:5'],
            'files.*' => [File::image()->max('5mb')],
        ];
    }
}
