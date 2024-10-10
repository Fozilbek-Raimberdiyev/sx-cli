#!/usr/bin/env node
import { Command } from 'commander'
import inquirer from 'inquirer'
import { exec, execSync } from 'child_process'
const program = new Command()
import {
    tailwindReactSetup,
    tailwindVueSetup,
    tailwindLaravelVueSetup,
} from './tailwind'
import { laravelVueSetup } from './laravel'

// start dev server
program
    .command('start server')
    .description('start dev server')
    .action(async () => {
        execSync('yarn start', { stdio: 'inherit', cwd: __dirname })
    })

// setup tailwind
program
    .command('tailwind:setup')
    .description('setup tailwind')
    .action(async () => {
        const { framework, packageManager } = await inquirer.prompt([
            {
                type: 'list',
                name: 'framework',
                message:
                    'Tailwind CSS setup qilinishi uchun frameworkni tanlang:',
                choices: [
                    'Vue 3',
                    'React',
                    'Laravel + Vue 3',
                    'Laravel + React',
                ],
            },
            {
                type: 'list',
                name: 'packageManager',
                message: 'Package managerni tanlang:',
                choices: ['npm', 'yarn', 'pnpm'],
            },
        ])
        const projectPath = process.cwd()

        switch (framework) {
            case 'Vue 3':
                tailwindVueSetup(projectPath, packageManager)
                break
            case 'React':
                tailwindReactSetup(projectPath, packageManager)
                break
            case 'Laravel + Vue 3':
                tailwindLaravelVueSetup(projectPath, packageManager)
                break
            case 'Laravel + React':
                //  tailwindLaravelReactSetup(projectPath, packageManager);
                break
        }
    })

// setup vue 3 in laravel
program
    .command('laravel:vue-setup')
    .description('setup vue 3 in laravel')
    .action(async () => {
        const projectPath = process.cwd()
        laravelVueSetup(projectPath)
        // tailwindLaravelVueSetup(projectPath, "yarn");
    })

// setup react in laravel
// program
//   .command("react:setup")
//   .description("setup react in laravel")
//   .action(async () => {

//     const projectPath = process.cwd();
//     tailwindLaravelReactSetup(projectPath, "yarn");
//   });

// generate entity
program
    .command('generate-entity <entityName>')
    .description('generate entity')
    .action(async (entityName) => {
        // open in browser
        const url = `http://localhost:3000/entity?entityName=${entityName}?projectPath=${process.cwd()}`
        execSync(`start ${url}`)
    })

// build schema
program
    .command('build-scheme')
    .description('Building database tables')
    .action(async () => {
        const projectPath = process.cwd()
        // run server if not running in port 3000, if running, open in browser
        // check 3000 port is in use
        execSync('npx kill-port 3000', {
            stdio: 'inherit',
            cwd: __dirname,
        })
        // console log with blue colors "Visit the site: http://localhost:3000/scheme?projectPath=" + projectPath
        console.log(
            '\x1b[34m%s\x1b[0m',
            'Visit the site: http://localhost:3000/scheme?projectPath=' +
                projectPath
        )
        exec(
            'start http://localhost:3000/scheme?projectPath=' +
                projectPath +
                ' && npm run start',
            { cwd: __dirname }
        )
    })

program.parse(process.argv)
