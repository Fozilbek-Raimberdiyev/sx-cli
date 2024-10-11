import { exec, execSync } from 'child_process'
export function formatPhpFile(filePath: string) {
    exec('npx prettier --write --plugin=@prettier/plugin-php ' + filePath, {
        cwd: __dirname,
    })
}

export function formatJsFile(filePath: string) {
    exec('npx prettier --write --plugin=@prettier/plugin-php ' + filePath, {
        cwd: __dirname,
    })
}

export function formatTsFile(filePath: string) {
    exec('npx prettier --write --plugin=@prettier/plugin-php ' + filePath, {
        cwd: __dirname,
    })
}

export function formatVueFile(filePath: string) {
    exec('npx prettier --write --plugin=prettier-plugin-vue ' + filePath, {
        cwd: __dirname,
    })
}
