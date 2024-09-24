export const appTsContent = `
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
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
   @vite('resources/js/app.ts')
</body>
</html>
`;

export const routeConfig = `Route::get('{any?}', fn() => view("app"))->where("any", ".*");`;