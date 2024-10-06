import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())
// Serve static files from the dist directory (your Vue build)
app.use(express.static(path.resolve(__dirname, '../dist')))

// get migration types
app.get('/api/laravel/migration-types', async (req: Request, res: Response) => {
    const migration = await import('./laravel/mock/migration')
    return res.status(200).send(migration.migrationTypes)
})

// configure entity ui
app.get('/configure-entity/:entityName', (req: Request, res: Response) => {
    const componentPath = `${process.cwd()}/src/ui/GenerateEntity/index.html`
    res.sendFile(componentPath)
})
// generate entity
app.post('/api/laravel/create-entity', async (req: Request, res: Response) => {
    const entity = req.body
    //   importing services
    const {
        generateMigration,
        generateModel,
        generateFormRequest,
        generateController,
        generateRoute,
    } = await import('./laravel')
    const { generateVueComponent, generateRoute: generateVueRoute } =
        await import('./vue')
    generateMigration(
        {
            apiIdSingular: entity.apiIdSingular,
            apiIdPlural: entity.apiIdPlural,
        },
        entity.fields,
        entity.projectPath
    )
    generateModel(
        entity.title,
        entity.fields,
        entity.projectPath,
        entity.groupName
    )
    generateFormRequest(
        entity.title,
        entity.fields,
        entity.projectPath,
        entity.groupName
    )
    generateController(entity.title, entity.projectPath, entity.groupName)
    generateRoute(
        entity.title,
        entity.apiIdPlural,
        entity.projectPath,
        entity.groupName
    )
    generateVueComponent(
        entity.title,
        entity.projectPath,
        entity.groupName,
        entity.apiIdSingular,
        entity.apiIdPlural,
        entity.fields
    )
    generateVueRoute(
        entity.title,
        entity.apiIdPlural,
        entity.projectPath,
        entity.groupName,
        entity.apiIdSingular
    )
    return res.status(200).send({ success: true })
})

// build scheme ui
app.get('/build-scheme', (req: Request, res: Response) => {
    const componentPath = `${process.cwd()}/src/ui/BuildSchema/index.html`
    res.sendFile(componentPath)
})
// generate scheme
app.post('/api/laravel/build-scheme', async (req: Request, res: Response) => {
    try {
        const { generateMigration, generatePivotMigration } = await import(
            './laravel/services/test'
        )
        const {
            generateModel,
            generateFormRequest,
            generateController,
            generateRoute,
        } = await import('./laravel')
        const data = req.body
        const tables = data.tables
        tables.forEach((table: any) => {
            generateMigration(table, data.projectPath, table.fields)
            generateModel(
                table.name,
                table.fields,
                data.projectPath,
                table.groupName,
                table.relations
            )
            generateFormRequest(
                table.name,
                table.fields,
                data.projectPath,
                table.groupName
            )
            generateController(
                table.name,
                data.projectPath,
                table.groupName,
                table.relations
            )
            generateRoute(
                table.name,
                table.apiIdPlural,
                data.projectPath,
                table.groupName
            )
        })

        // Process pivots
        data.pivots.forEach((pivot: any) => {
            generatePivotMigration(pivot, data.projectPath)
        })
        // return  response with timeout
        return res.status(200).send({ success: true, data: req.body })
    } catch (e) {
        return res.status(500).send({ success: false, error: e })
    }
})

// any get request redirect to dist/index.html
app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
})
app.listen(3000, async () => {
    console.log('Server is running on port 3000')
})
