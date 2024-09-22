import fs from "fs";
import path from "path";
import { ensureDirectoryExists } from "../../utils/folder";
export function generateVueComponent(entityName: string) {
  const componentPath = path.join("src", "components", `${entityName}.vue`);

  // Ensure the components directory exists
  ensureDirectoryExists(componentPath);

  const componentTemplate = `
<template>
  <div>
    <h1>${entityName} Component</h1>
  </div>
</template>

<script setup lang="ts">
// Your Composition API logic here
</script>

<style scoped>
/* Add your styles here */
</style>
`;

  fs.writeFileSync(componentPath, componentTemplate, "utf8");
  // log to console that component was created successfully with green color
  console.log(`\x1b[32m${entityName} component created successfully!\x1b[0m`);
}
