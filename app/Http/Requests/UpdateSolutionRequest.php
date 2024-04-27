<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UpdateSolutionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('solution'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'string|min:3|max:255',
            // 'report_id' => 'required|exists:reports,id',
            'solved_at' => 'required|date|before_or_equal:now',
            'files' => ['array', 'min:0', 'max:5'],
            'files.*' => [File::image()->max('5mb')],
        ];
    }
}
