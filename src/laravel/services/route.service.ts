import path from "path";
import fs from "fs";
import { replaceSlashes } from "../../utils/formatter";
import { formatPhpFile } from "../../utils/prettier";
const templates: string[] = [];
export function generateRoute(
  entityName: string,
  apiIdPlural: string,
  projectPath: string,
  groupName: string
) {
  const routePath = path.join(projectPath, "routes", "api.php");
  const template = `/* use App\\Http\\Controllers${replaceSlashes(
    groupName
  )}\\${entityName}Controller;\n
//  ${apiIdPlural} ro'yxatini olish
Route::get('${groupName.toLocaleLowerCase()}/${apiIdPlural}', [${entityName}Controller::class, 'index']);  
// Yangi ${entityName.toLocaleLowerCase()} qo'shish       
Route::post('${groupName.toLocaleLowerCase()}/${apiIdPlural}', [${entityName}Controller::class, 'store']);  
// Muayyan ${entityName.toLocaleLowerCase()} olish
Route::get('${groupName.toLocaleLowerCase()}/${apiIdPlural}/{id}', [${entityName}Controller::class, 'show']);  
// Muayyan ${entityName.toLocaleLowerCase()} yangilash
Route::put('${groupName.toLocaleLowerCase()}/${apiIdPlural}/{id}', [${entityName}Controller::class, 'update']); 
// Muayyan ${entityName.toLocaleLowerCase()} o'chirish
Route::delete('${groupName.toLocaleLowerCase()}/${apiIdPlural}/{id}', [${entityName}Controller::class, 'destroy']); */; 
`;
  templates.push(template);
  // Faylni o'qish va qo'shish
  fs.readFile(routePath, "utf8", (err, data) => {
    if (err) {
      console.error("Faylni o'qishda xato:", err);
      return;
    }

    // Faylga yangi marshrutni qo'shish
    const updatedData = `<?php \n // use Illuminate\\Http\\Request;
    // use Illuminate\\Support\\Facades\\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/ \n \n` + templates.map((template) => {
      return template;
    }).join("\n");
    fs.writeFile(routePath, updatedData, "utf8", (err) => {
      if (err) {
        console.error("Faylni yangilashda xato:", err);
        return;
      }
      console.log("Marshrut muvaffaqiyatli qo'shildi!");
      formatPhpFile(routePath);
    });
  });
};

