import { ensureDirectoryExists } from "../../utils/folder";
import { replaceSlashes } from "../../utils/formatter";
import fs from "fs";
import path from "path";
export function generateController(
  entityName: string,
  projectPath: string,
  groupName: string = "/admin"
) {
  const lowerCasedEntityName = entityName.toLowerCase();
  const controllerPath = path.join(
    projectPath,
    "app",
    "Http",
    "Controllers",
    groupName,
    `${entityName}Controller.php`
  );
  const template = `<?php

namespace App\\Http\\Controllers${replaceSlashes(groupName)};

use App\\Models${replaceSlashes(groupName)}\\${entityName};
use App\\Http\\Requests${replaceSlashes(groupName)}\\${entityName}FormRequest;
use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller;
class ${entityName}Controller extends Controller
{/**
 * ${lowerCasedEntityName} ro'yxatini ko'rsatadi.
 */
public function index(Request $request)
{
    $limit = $request->input('limit', 10); // Har bir sahifada ko'rsatiladigan clientlar soni
    $page = $request->input('page', 1); // Hozirgi sahifa

    // ${lowerCasedEntityName} sahifalash
    $data = ${entityName}::paginate($limit, ['*'], 'page', $page);

    return response()->json($data);
}
    /**
     * Yangi ${lowerCasedEntityName} qo'shadi.
     */
    public function store(${entityName}FormRequest $request)
    {
        $request->validated();

        $${lowerCasedEntityName} = ${entityName}::create($request->all());
        return response()->json($${lowerCasedEntityName}, 201);
    }

    /**
     * Muayyan ${lowerCasedEntityName} ko'rsatadi.
     */
    public function show($id)
    {
       $${lowerCasedEntityName} = ${entityName}::findOrFail($id);
        return response()->json($${lowerCasedEntityName});
    }

    /**
     * Muayyan ${lowerCasedEntityName} yangilaydi.
     */
    public function update(${entityName}FormRequest $request, $id)
    {
        $${lowerCasedEntityName} = ${entityName}::findOrFail($id);

        $request->validated();

        $${lowerCasedEntityName}->update($request->all());
        return response()->json($${lowerCasedEntityName});
    }

    /**
     * Muayyan ${entityName} o'chiradi.
     */
    public function destroy($id)
    {
        $${lowerCasedEntityName} = ${entityName}::findOrFail($id);
        $${lowerCasedEntityName}->delete();
        return response()->json(null, 204);
    }
}
`;
  ensureDirectoryExists(controllerPath);
  fs.writeFileSync(controllerPath, template, "utf8");
}
