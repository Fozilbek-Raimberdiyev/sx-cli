#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();

program
  .command("make:model <name>")
  .description("Create a new model")
  .action((name) => {
    console.log(name);
  });
program.parse(process.argv);
