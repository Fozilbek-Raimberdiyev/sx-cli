// import { PackageManager } from "../types/index";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { execSync } from "child_process"
import { viteVueConfig } from "./mock/vite"
import { appTsContent, appVueContent, bladeContent } from "./mock/vue"
export async function laravelVueSetup(
    projectPath: string
) {
    try {
        console.log("Installing Vue 3 and Vite...");
        const { packageManager } = await inquirer
            .prompt([{ type: "list", name: "packageManager", message: "Package managerni tanlang:", choices: ["npm", "yarn", "pnpm"] }]);
        // install vue
        const installTemplate = packageManager === "yarn" ? "yarn add vue vue-router ant-design-vue pinia vue-i18n@10" : packageManager === "pnpm" ? "pnpm add vue vue-router ant-design-vue pinia vue-i18n@10" : "npm install vue vue-router ant-design-vue pinia vue-i18n@10";
        execSync(installTemplate, { stdio: "inherit", cwd: projectPath });
        // install vite as dev dependency
        const installTemplate2 = packageManager === "yarn" ? "yarn add -D vite" : packageManager === "pnpm" ? "pnpm add --save-dev vite" : "npm install  vite --save-dev";
        execSync(installTemplate2, { stdio: "inherit", cwd: projectPath });
        // install vite vue plugin
        const installTemplate3 = packageManager === "yarn" ? "yarn add -D @vitejs/plugin-vue laravel-vite-plugin" : packageManager === "pnpm" ? "pnpm add --save-dev @vitejs/plugin-vue laravel-vite-plugin" : "npm install --save-dev @vitejs/plugin-vue laravel-vite-plugin";
        execSync(installTemplate3, { stdio: "inherit", cwd: projectPath });
        // create vite config
        fs.writeFileSync(`${projectPath}/vite.config.js`, viteVueConfig);
        console.log("Vite configuration created.");
        fs.writeFileSync(`${projectPath}/resources/js/app.ts`, appTsContent);
        console.log("Vue entry point setup in resources/js/app.ts.");
        fs.writeFileSync(`${projectPath}/resources/js/App.vue`, appVueContent);
        console.log("Basic Vue component (App.vue) created.");
        const bladePath = `${projectPath}/resources/views/app.blade.php`;
        fs.writeFileSync(bladePath, bladeContent);
        console.log("app.blade.php modified to include Vue component.");
        const routeConfig = `Route::get('{any?}', fn() => view("app"))->where("any", ".*");`
        // add route config 
        try {
            // Path to web.php
            const webRoutesPath = path.join(projectPath, "routes", "web.php");

            // Check if web.php exists
            if (fs.existsSync(webRoutesPath)) {
                const currentRoutes = fs.readFileSync(webRoutesPath, "utf-8");

                // Check if the routeConfig is already in the file
                if (!currentRoutes.includes(routeConfig)) {
                    // Append the routeConfig to web.php
                    fs.appendFileSync(webRoutesPath, `\n${routeConfig}\n`);
                    console.log("Vue route added to routes/web.php.");
                } else {
                    console.log("Vue route already exists in routes/web.php.");
                }
            } else {
                console.error("web.php file not found.");
            }
        } catch (error) {
            console.error("Error updating routes/web.php:", error);
        }
    }


    catch (e) {
        console.error(e);
    }
}