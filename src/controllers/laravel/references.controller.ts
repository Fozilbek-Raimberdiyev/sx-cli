import { Request, Response } from 'express'
async function getMigrationTypes(req: Request, res: Response) {
    const migration = await import('../../laravel/mock/migration')
    return res.status(200).send(migration.migrationTypes)
}


export {
    getMigrationTypes
}
