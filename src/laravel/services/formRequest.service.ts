import { ensureDirectoryExists } from "../../utils/folder";
import fs from "fs";
import path from "path";
import { replaceSlashes } from "../../utils/formatter";
import { formatPhpFile } from "../../utils/prettier";
export function generateFormRequest(
  entityName: string,
  fields: { name: string; type: string; validationRules: string }[],
  projectPath: string,
  groupName: string = "/admin"
) {
  const formRequestPath = path.join(
    projectPath,
    "app",
    "Http",
    "Requests",
    groupName,
    `${entityName}FormRequest.php`
  );
  const template = `<?php

namespace App\\Http\\Requests${replaceSlashes(groupName)};

use Illuminate\\Foundation\\Http\\FormRequest;
use Illuminate\\Contracts\\Validation\\Validator;
use Illuminate\\Http\\Exceptions\\HttpResponseException;

class ${entityName}FormRequest extends FormRequest
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
     * @return array<string, \\Illuminate\\Contracts\\Validation\\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ${fields
              .map((field) => `"${field.name}" => "${field.validationRules}"`)
              .join(",\n")}
        ];
    }

     // returns validation errors
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => $validator->errors()->first(),
            'data' => $validator->errors()
        ], 422));

    }

}
`;

  ensureDirectoryExists(formRequestPath);
  fs.writeFileSync(formRequestPath, template, "utf8");
  formatPhpFile(formRequestPath);
}
