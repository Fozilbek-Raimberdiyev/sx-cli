import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/configure-entity/:entityName', (req: Request, res: Response) => {
    const entityName = req.params.entityName;
    const componentPath = `${process.cwd()}/src/ui/index.html`;
    res.sendFile(componentPath); // Brauzerda UI ko'rsatiladi
});

// get migration types
app.get('/api/laravel/migration-types', async (req: Request, res: Response) => {
    const migration = await import('./laravel/mock/migration');
    return res.status(200).send(migration.migrationTypes);
});

// get entity
app.post('/api/laravel/create-entity', async (req: Request, res: Response) => {
    const entity = req.body;
    const { generateMigration } = await import('./laravel');
    generateMigration({ apiIdSingular: entity.apiIdSingular, apiIdPlural: entity.apiIdPlural }, entity.fields, entity.projectPath);
    return res.status(200).send({ success: true });
})



app.listen(3000, () => {
    console.log('Server ishlamoqda: http://localhost:3000');
});
