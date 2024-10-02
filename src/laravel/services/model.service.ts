import fs from "fs";
import { ensureDirectoryExists } from "../../utils/folder";
import path from "path";
import { replaceSlashes } from "../../utils/formatter";
import { formatPhpFile } from "../../utils/prettier"
export function generateModel(
  modelName: string,
  fields: { name: string; type: string }[],
  projectPath: string,
  groupName: string = "/admin",
  relations?: any[]
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
${relations
      ?.filter((r: any) => r.relationTable)?.map((relation: any) => {
        return `use App\\Models${replaceSlashes(relation.relationTable?.groupName)}\\${relation.relationTable.name};`
      }).join('\n')}
class ${modelName} extends Model
{
    use HasFactory;
     protected $fillable = [${fields
      .map((field) => `"${field.name}"`)
      .join(",")}];
      \n
  ${relations?.filter((relation: any) => relation.relationTable)?.map((relation: any) => {
        return `
      // ${relation.relationType.code} with ${relation.relationTable.apiIdPlural} table 
      public function ${relation.relationTable.apiIdPlural}() {
        return $this->${relation.relationType.code === 'many-to-many' ? 'belongsToMany' : 'belongsTo'}(${relation.relationTable.name}::class);
      }
      `
      }).join('\n')}    
}

    
    `;

  ensureDirectoryExists(modelPath);
  fs.writeFileSync(modelPath, template, "utf8");
  formatPhpFile(modelPath);
}
