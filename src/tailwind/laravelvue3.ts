import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { PackageManager } from "../types/index";
export function tailwindLaravelVueSetup(
    projectPath: string,
    packageManager: PackageManager
) {
    // Package manager yordamida Tailwind CSSni o'rnatish
    const installTemplate =
        packageManager === "yarn"
            ? "yarn add -D tailwindcss postcss autoprefixer"
            : packageManager === "pnpm"
                ? "pnpm add --save-dev tailwindcss postcss autoprefixer"
                : "npm install --save-dev tailwindcss postcss autoprefixer";

    // terminalda install commandni yurgizish
    execSync(installTemplate, { stdio: "inherit" });
    const executionTemplate =
        packageManager === "yarn"
            ? "npx tailwindcss init -p"
            : packageManager === "pnpm"
                ? "npx tailwindcss init -p"
                : "npx tailwindcss init -p";
    // Tailwind konfiguratsiya faylini yaratish
    execSync(executionTemplate, { stdio: "inherit" });

    const vueConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
    fs.writeFileSync(
        path.join(projectPath, "tailwind.config.js"),
        vueConfig,
        "utf8"
    );

    // Tailwind fayllarini qo'shish
    const content = `
         @tailwind base;
         @tailwind components;
         @tailwind utilities;
         `;
    //  tailwind.css faylini yaratish
    const pathUrl = path.join(projectPath, "resources", "vue", "assets", "css");
    fs.mkdirSync(pathUrl, { recursive: true });
    fs.writeFileSync(path.join(pathUrl, "tailwind.css"), content, "utf8");
    const tailwindCssUrl = path.join(pathUrl, "tailwind.css");
    // consoleda yashil rangda success logni yozish
    console.log(`\x1b[32mTailwind CSS muvaffaqiyatli setup qilindi!\x1b[0m`);
    // log with blue color
    console.info(
        `\x1b[34mTailwind CSS bilan ishlashni boshlash uchun ${tailwindCssUrl} faylini asosiy css faylga import qiling va local serveringizni qaytadan ishga tushiring\x1b[0m`
    );
}
