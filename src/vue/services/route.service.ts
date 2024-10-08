import fs from "fs";
import path from "path";
import { ensureDirectoryExists } from "../../utils/folder";
import { formatTsFile } from "../../utils/prettier"
export function generateRoute(entityName: string, apiIdPlural: string, projectPath: string, groupName: string = "/admin", apiIdSingular: string) {
  const routesPath = path.join(projectPath, "resources", "vue", "router", "routes", `${groupName.toLocaleLowerCase()}/${apiIdPlural}.ts`);
  // Ensure the router directory exists
  ensureDirectoryExists(routesPath);

  const routeTemplate = `
  import { h, resolveComponent } from "vue";
export const ${apiIdSingular}Routes = {
  path: "/${apiIdPlural}",
  name: "${entityName}",
  component: {
  render() {
    return h(resolveComponent("router-view"))
  }
  },
  children: [
    {
    path: "",
    name: "${entityName}Index",
    component: () => import("@/pages${groupName}/${apiIdPlural}/Index.vue")
    },
    {
    path: "create",
    name: "${entityName}Create",
    component: () => import("@/pages${groupName}/${apiIdPlural}/AddOrUpdate.vue")
    },
    {
    path: ":id/update",
    name: "${entityName}Edit",
    component: () => import("@/pages${groupName}/${apiIdPlural}/AddOrUpdate.vue")
    }
  ]
}
`;

  fs.appendFileSync(routesPath, routeTemplate, "utf8");
  console.log(`Route added to ${routesPath}`);
}
