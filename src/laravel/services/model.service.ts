import fs from "fs";
import { ensureDirectoryExists } from "../../utils/folder";
import path from "path";
import { replaceSlashes } from "../../utils/formatter";
import { formatPhpFile } from "../../utils/prettier"
export function generateModel(
  modelName: string,
  fields: { name: string; type: string }[],
  projectPath: string,
  groupName: string = "/admin"
) {
  const modelPath = path.join(
    projectPath,
    "app",
    "Models",
    groupName,
    `${modelName}.php`
  );
  const template = `<?php
namespace App\\Models${replaceSlashes(groupName)};

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class ${modelName} extends Model
{
    use HasFactory;
     protected $fillable = [${fields
      .map((field) => `"${field.name}"`)
      .join(",")}];
}
    `;

  ensureDirectoryExists(modelPath);
  fs.writeFileSync(modelPath, template, "utf8");
  formatPhpFile(modelPath);
}
