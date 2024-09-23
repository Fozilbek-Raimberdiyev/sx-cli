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



app.listen(3000, () => {
    console.log('Server ishlamoqda: http://localhost:3000');
});
