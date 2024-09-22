import fs from "fs";
import path from "path";
import { ensureDirectoryExists } from "../../utils/folder";
export function generateRoute(entityName: string) {
  const routesPath = path.join("src", "router", "routes.ts");

  // Ensure the router directory exists
  ensureDirectoryExists(routesPath);

  const routeTemplate = `
{
  path: '/${entityName.toLowerCase()}',
  name: '${entityName}',
  component: () => import('@/components/${entityName}.vue')
}
`;

  fs.appendFileSync(routesPath, routeTemplate, "utf8");
  console.log(`Route added to ${routesPath}`);
}
