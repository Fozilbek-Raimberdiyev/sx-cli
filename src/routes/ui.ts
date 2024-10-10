import { Router } from 'express'
import { Request, Response } from 'express'
import path from 'path'
const router = Router({})
// any get request redirect to dist/index.html
router.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'))
})
// build scheme ui
router.get('/build-scheme', (req: Request, res: Response) => {
    const componentPath = `${process.cwd()}/src/ui/BuildSchema/index.html`
    res.sendFile(componentPath)
})

// configure entity ui
router.get('/configure-entity/:entityName', (req: Request, res: Response) => {
    const componentPath = `${process.cwd()}/src/ui/GenerateEntity/index.html`
    res.sendFile(componentPath)
})

export default router
