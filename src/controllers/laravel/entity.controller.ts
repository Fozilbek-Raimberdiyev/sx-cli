import { Request, Response } from 'express'

async function generateEnity(req: Request, res: Response) {
    const entity = req.body
    //   importing services
    const {
        generateMigration,
        generateModel,
        generateFormRequest,
        generateController,
        generateRoute,
    } = await import('../../laravel')
    const { generateVueComponent, generateRoute: generateVueRoute } =
        await import('../../vue')
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
}

export { generateEnity }
