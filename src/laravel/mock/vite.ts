export const viteVueConfig = `
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from "laravel-vite-plugin";
export default defineConfig({
    plugins: [vue(),laravel({
            input: [
                "resources/vue/main.ts",
            ],
            refresh: true,
        })
],
    resolve: {
        alias: {
            '@': '/resources/vue',
        },
    }
});
`