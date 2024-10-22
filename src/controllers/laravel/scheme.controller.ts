import { Request, Response } from 'express'
let clients: any[] = []

async function handleSchemeEvents(req: Request, res: Response) {
    // config server sent events
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    clients.push(res)

    req.on('close', () => {
        res.end()
    })
}
async function buildScheme(req: Request, res: Response) {
    try {
        const jobCount = 9
        const tasksCount =
            (req.body.tables.length + req.body.pivots.length) * jobCount
        const oneUnit = Math.ceil(100 / tasksCount / jobCount)

        const data = req.body
        const tables = data.tables
        if (!data.projectPath) {
            return res
                .status(400)
                .send({ success: false, message: 'Project path is required' })
        }
        const { generateMigration, generatePivotMigration } = await import(
            '../../laravel/services/test'
        )
        const {
            generateModel,
            generateFormRequest,
            generateController,
            generateRoute,
        } = await import('../../laravel')
        const {
            generateVueComponent,
            generateRoute: generateVueRoute,
            generateAppVueContent,
        } = await import('../../vue')

        tables.forEach(async (table: any, index: number) => {
            // generateMigration(table, data.projectPath, table.fields, index)
            // generateModel(
            //     table.name,
            //     table.fields,
            //     data.projectPath,
            //     table.groupName,
            //     table.relations
            // )
            // generateFormRequest(
            //     table.name,
            //     table.fields,
            //     data.projectPath,
            //     table.groupName,
            //     table.relations
            // )
            // generateController(
            //     table.name,
            //     data.projectPath,
            //     table.groupName,
            //     table.relations
            // )

            // generateRoute(
            //     table.name,
            //     table.apiIdPlural,
            //     data.projectPath,
            //     table.groupName,
            //     table.relations
            // )
            // generateVueComponent(
            //     table.name,
            //     data.projectPath,
            //     table.groupName,
            //     table.apiIdSingular,
            //     table.apiIdPlural,
            //     table.fields,
            //     table.relations,
            //     tables
            // )
            generateVueRoute(
                table.name,
                table.apiIdPlural,
                data.projectPath,
                table.groupName,
                table.apiIdSingular
            )
        })
        // generateAppVueContent(
        //     tables.map((table: any) => {
        //         return {
        //             name: table.apiIdPlural,
        //             groupName: table.groupName,
        //         }
        //     }),
        //     data.projectPath
        // )
        // Process pivots
        data.pivots.forEach((pivot: any, index: number) => {
            // generatePivotMigration(pivot, data.projectPath, index + 10)
        })
        // return  response with timeout
        return res.status(200).send({ success: true, data: req.body })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, error: e })
    }
}

const sendProgressUpdate = (progress: number) => {
    const message = JSON.stringify({ progress })
    clients.forEach((client) => {
        console.log('before write')
        client.write(`data: ${message}\n\n`)
        console.log('after write', message)
    })
}

export { buildScheme, handleSchemeEvents }
