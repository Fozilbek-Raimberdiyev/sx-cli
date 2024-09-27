import { execSync } from "child_process";
export function formatPhpFile(filePath: string) {
    execSync("npx prettier --write --plugin=@prettier/plugin-php " + filePath, { stdio: "inherit", cwd: __dirname });
}

export function formatJsFile(filePath: string) {
    execSync("npx prettier --write --plugin=@prettier/plugin-php " + filePath, { stdio: "inherit", cwd: __dirname });
}

export function formatTsFile(filePath: string) {
    execSync("npx prettier --write --plugin=@prettier/plugin-php " + filePath, { stdio: "inherit", cwd: __dirname });
}

export function formatVueFile(filePath: string) {
    execSync("npx prettier --write --plugin=prettier-plugin-vue " + filePath, { stdio: "inherit", cwd: __dirname });
}