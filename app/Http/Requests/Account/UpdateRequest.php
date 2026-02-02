<?php

namespace App\Http\Requests\Account;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'nullable|max:500',
            'amount' => 'nullable|max:50',
            'type' => 'required',
            'price' => 'required|max:50',
            'date' => 'required',
            'time' => 'nullable',
            'image' => 'nullable|mimes:png,jpg,jpeg,gif,webp,ico,|max:20480',
        ];
    }
}
