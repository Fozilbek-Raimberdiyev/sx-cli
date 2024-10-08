import { ensureDirectoryExists } from '../../utils/folder'
import { replaceSlashes, capitalizeFirstLetter } from '../../utils/formatter'
import { formatPhpFile } from '../../utils/prettier'
import fs from 'fs'
import path from 'path'
export function generateController(
    entityName: string,
    projectPath: string,
    groupName: string = '/admin',
    relations?: any[]
) {
    relations = relations?.filter((item) => item.relationTable)
    const relatedTables: string[] = []
    relations?.forEach((item) => {
        if (item.isManyToMany || (item.isOneToMany && item.isParent)) {
            relatedTables.push(item.relationTable.apiIdPlural)
        } else if (item.isOneToMany && item.isChild) {
            relatedTables.push(item.parent.apiIdSingular)
        }
    })
    const lowerCasedEntityName = entityName.toLowerCase()
    const controllerPath = path.join(
        projectPath,
        'app',
        'Http',
        'Controllers',
        groupName,
        `${entityName}Controller.php`
    )
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
    $limit = $request->input('limit', 10); // Har bir sahifada ko'rsatiladigan ${lowerCasedEntityName} soni
    $page = $request->input('page', 1); // Hozirgi sahifa

    // ${lowerCasedEntityName} sahifalash
    $data = ${entityName}::${relations?.length ? `with([${relations?.map((relation) => `'${relation.isOneToMany && relation.isParent ? relation.child.apiIdPlural : relation.isOneToMany && relation.isChild ? relation.parent.apiIdSingular : relation.isManyToMany ? relation.relationTable?.apiIdPlural : ''}'`)}])->paginate($limit, ['*'], 'page', $page);` : `paginate($limit, ['*'], 'page', $page);`}

    return response()->json($data);
}

    ${
        relations
            ? relations
                  ?.map((relation: any) => {
                      if (relation.isOneToMany && relation.isParent) {
                          return `
        /** get ${relation.child.apiIdPlural} */
        public function get${capitalizeFirstLetter(relation.child.apiIdPlural)}(Request $request,$id) {
            $limit = $request->input('limit', 10); // Har bir sahifada ko'rsatiladigan ${relation.child.apiIdPlural} soni
    $page = $request->input('page', 1); // Hozirgi sahifa
            $${lowerCasedEntityName} = ${entityName}::find($id);
            $${lowerCasedEntityName}->${relation.relationTable?.apiIdPlural}()->paginate($limit, ['*'], 'page', $page);
            return response()->json($${lowerCasedEntityName}->${relation.relationTable?.apiIdPlural});
        }
        `
                      }
                  })
                  .join('\n')
            : ''
    }

    /**
     * Yangi ${lowerCasedEntityName} qo'shadi.
     */
    public function store(${entityName}FormRequest $request)
    {
        ${
            relations?.length
                ? relations
                      .map((rel) => {
                          if (rel.isOneToMany && rel.isChild) {
                              return `
                          $${rel.parent.apiIdSingular}Id = $request->input('${rel.parent.apiIdSingular}');
                          $${lowerCasedEntityName} = new ${entityName}($request->validated());
                        $${lowerCasedEntityName}->${rel.parent.apiIdSingular}_id = $${rel.parent.apiIdSingular}Id;
                        $${lowerCasedEntityName}->save();
                          `
                          } else {
                              return `$${lowerCasedEntityName} = ${entityName}::create($request->validated());`
                          }
                      })
                      .join('\n')
                : `$${lowerCasedEntityName} = ${entityName}::create($request->validated());`
        };
        
        ${
            relations?.length
                ? relations
                      ?.map((relation: any) => {
                          return relation.isManyToMany
                              ? `$${lowerCasedEntityName}->${relation.relationTable?.apiIdPlural}()->attach($request->input("${relation.relationTable?.apiIdPlural}"));`
                              : relation.isOneToMany && relation.isParent
                                ? `// Assuming '${relation.child.apiIdPlural}' is an array of comment data
        if ($${relation.child.apiIdPlural} = $request->input('${relation.child.apiIdPlural}')) {
            foreach ($${relation.child.apiIdPlural} as $${relation.child.apiIdSingular}Data) {
                $${lowerCasedEntityName}->${relation.child.apiIdPlural}()->create($${relation.child.apiIdSingular}Data);
            }
        }`
                                : ''
                      })
                      .join('\n')
                : ''
        }
        return response()->json($${lowerCasedEntityName}, 201);
    }

    /**
     * Muayyan ${lowerCasedEntityName}ni ko'rsatadi.
     */
    public function show($id)
    {   
       $${lowerCasedEntityName} = ${entityName}${relations?.length ? `::with(['${relatedTables.join(',')}'])->findOrFail($id);` : `::findOrFail($id);`}
      
        return response()->json($${lowerCasedEntityName});
    }

    /**
     * Muayyan ${lowerCasedEntityName}ni yangilaydi.
     */
    public function update(${entityName}FormRequest $request, $id){
        $${lowerCasedEntityName} = ${entityName}::findOrFail($id);
        ${
            relations?.length
                ? relations.map((rel) => {
                      if (rel.isOneToMany && rel.isChild) {
                          return `
                          $${rel.parent.apiIdSingular}Id = $request->input('${rel.parent.apiIdSingular}');
                          $${lowerCasedEntityName}->update($request->validated());
                        $${lowerCasedEntityName}->${rel.parent.apiIdSingular}_id = $${rel.parent.apiIdSingular}Id;
                        $${lowerCasedEntityName}->save();
                          `
                      } else {
                          return `$${lowerCasedEntityName}->update($request->validated());`
                      }
                  })
                : `$${lowerCasedEntityName}->update($request->validated());`
        }
        
         ${
             relations?.length
                 ? relations
                       ?.map((relation: any) => {
                           return relation.isManyToMany
                               ? `$${lowerCasedEntityName}->${relation.relationTable?.apiIdPlural}()->sync($request->input("${relation.relationTable?.apiIdPlural}"));`
                               : relation.isOneToMany && relation.isParent
                                 ? ``
                                 : ''
                       })
                       .join('\n')
                 : ''
         }
        return response()->json($${lowerCasedEntityName});
    }

    /**
     * Muayyan ${lowerCasedEntityName}ni o'chiradi.
     */
    public function destroy($id)
    {
        $${lowerCasedEntityName} = ${entityName}::findOrFail($id);
        $${lowerCasedEntityName}->delete();
        return response()->json(null, 204);
    }
}
`
    ensureDirectoryExists(controllerPath)
    fs.writeFileSync(controllerPath, template, 'utf8')
    formatPhpFile(controllerPath)
}
