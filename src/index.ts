#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
const program = new Command();
import { tailwindReactSetup, tailwindVueSetup } from "./tailwind";

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

program.parse(process.argv);
