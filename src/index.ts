#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
const program = new Command();
import { tailwindReactSetup, tailwindVueSetup } from "./tailwind";
import { laravelVueSetup } from "./laravel"
// setup tailwind
program
  .command("tailwind:setup")
  .description("setup tailwind")
  .action(async () => {
    const { framework, packageManager } = await inquirer.prompt([
      {
        type: "list",
        name: "framework",
        message: "Tailwind CSS setup qilinishi uchun frameworkni tanlang:",
        choices: ["Vue 3", "React", "Laravel + Vue 3", "Laravel + React"],
      },
      {
        type: "list",
        name: "packageManager",
        message: "Package managerni tanlang:",
        choices: ["npm", "yarn", "pnpm"],
      },
    ]);
    const projectPath = process.cwd();

    switch (framework) {
      case "Vue 3":
        tailwindVueSetup(projectPath, packageManager);
        break;
      case "React":
        tailwindReactSetup(projectPath, packageManager);
        break;
      case "Laravel + Vue 3":
        //  tailwindLaravelVueSetup(projectPath, packageManager);
        break;
      case "Laravel + React":
        //  tailwindLaravelReactSetup(projectPath, packageManager);
        break;
    }
  });

// setup vue 3 in laravel
program
  .command("laravel:vue-setup")
  .description("setup vue 3 in laravel")
  .action(async () => {
    const projectPath = process.cwd();
    laravelVueSetup(projectPath)
    // tailwindLaravelVueSetup(projectPath, "yarn");
  });

// setup react in laravel
// program
//   .command("react:setup")
//   .description("setup react in laravel")
//   .action(async () => {

//     const projectPath = process.cwd();
//     tailwindLaravelReactSetup(projectPath, "yarn");
//   });



program.parse(process.argv);
