import path from "path";
import fs from "fs";
import { replaceSlashes } from "../../utils/formatter";
export function generateRoute(
  entityName: string,
  apiIdPlural: string,
  projectPath: string,
  groupName: string = "/admin"
) {
  const routePath = path.join(projectPath, "routes", "api.php");
  const template = `use App\\Http\\Controllers\\${replaceSlashes(
    groupName
  )}\\${entityName}Controller;
//  ${apiIdPlural} ro'yxatini olish
Route::get('${groupName}/${apiIdPlural}', [${entityName}Controller::class, 'index']);  
// Yangi ${entityName.toLocaleLowerCase()} qo'shish       
Route::post('${groupName}/${apiIdPlural}', [${entityName}Controller::class, 'store']);  
// Muayyan ${entityName.toLocaleLowerCase()} olish
Route::get('${groupName}/${apiIdPlural}/{id}', [${entityName}Controller::class, 'show']);  
// Muayyan ${entityName.toLocaleLowerCase()} yangilash
Route::put('${groupName}/${apiIdPlural}/{id}', [${entityName}Controller::class, 'update']); 
// Muayyan ${entityName.toLocaleLowerCase()} o'chirish
Route::delete('${groupName}/${apiIdPlural}/{id}', [${entityName}Controller::class, 'destroy']); 
`;

  // Faylni o'qish va qo'shish
  fs.readFile(routePath, "utf8", (err, data) => {
    if (err) {
      console.error("Faylni o'qishda xato:", err);
      return;
    }

    // Agar mavjud bo'lsa, kodni tekshirish
    if (
      !data.includes(
        "use App\\Http\\Controllers\\" +
          replaceSlashes(groupName) +
          "\\" +
          entityName +
          "Controller;"
      )
    ) {
      // Faylga yangi marshrutni qo'shish
      const updatedData = `${data.trim()}\n${template.trim()}\n`;

      fs.writeFile(routePath, updatedData, "utf8", (err) => {
        if (err) {
          console.error("Faylni yangilashda xato:", err);
          return;
        }
        console.log("Marshrut muvaffaqiyatli qo'shildi!");
      });
    } else {
      console.log("Marshrut allaqachon mavjud.");
    }
  });
}
