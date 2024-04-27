<?php

namespace App\Http\Requests;

use App\Models\Solution;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StoreSolutionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Solution::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required|string|min:3|max:255',
            'report_id' => 'required|exists:reports,id',
            'solved_at' => 'required|date|before_or_equal:now',
            'files' => ['required', 'array', 'min:1', 'max:5'],
            'files.*' => [File::image()->max('5mb')],
        ];
    }
}
