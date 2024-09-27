export const appTsContent = `
import { createApp } from 'vue';
import App from './App.vue';
// import { createI18n } from "vue-i18n";
// const i18n = createI18n({});
// import router from "./router";
// import {createPinia} from "pinia";
// const pinia = createPinia();
const app = createApp(App);
// app.use(i18n);
// app.use(router);
// app.use(pinia);
app.mount('#app');
`;


export const appVueContent = `
<template>
  <div>
    <h1>Hello Vue 3 with Laravel and Vite</h1>
  </div>
</template>

<script setup>
// Your component logic here
</script>
`;


export const bladeContent = `
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel + Vue 3</title>
</head>
<body>
    <div id="app"></div>
   @vite('resources/vue/main.ts')
</body>
</html>
`;


export const shimsContent = `
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
`;


export const tsConfig = `
{
  "compilerOptions": {
    "target": "esnext", // or "es2020" or "es2022"
    "module": "esnext", // or "es2020" or "es2022"
    "moduleResolution": "node",
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["resources/vue/*"]
    },
    "types": ["vite/client"], // Include Vite types
    "noEmit": true
  },
  "include": ["resources/vue/**/*.ts", "resources/vue/**/*.d.ts", "resources/vue/**/*.tsx", "resources/vue/**/*.vue"],
  "exclude": ["node_modules"]
}

`;

export const routeConfig = `Route::get('{any?}', fn() => view("app"))->where("any", ".*");`;