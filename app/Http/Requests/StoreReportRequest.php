<?php

namespace App\Http\Requests;

use App\Models\Report;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class StoreReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Report::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // dd($this, $this->all(), $this->files, $this->files->all());
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'infrastructure_id' => 'required|exists:infrastructures,id',
            'files' => ['required', 'array', 'min:1', 'max:5'],
            'files.*' => [File::image()->max('5mb')],
        ];
    }
}
