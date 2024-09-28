import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

// generate entity
app.get("/configure-entity/:entityName", (req: Request, res: Response) => {
  const componentPath = `${process.cwd()}/src/ui/GenerateEntity/index.html`;
  res.sendFile(componentPath);
});

// build schema
app.get("/build-schema", (req: Request, res: Response) => {
  const componentPath = `${process.cwd()}/src/ui/BuildSchema/index.html`;
  res.sendFile(componentPath);
});

// get migration types
app.get("/api/laravel/migration-types", async (req: Request, res: Response) => {
  const migration = await import("./laravel/mock/migration");
  return res.status(200).send(migration.migrationTypes);
});

// get entity
app.post("/api/laravel/create-entity", async (req: Request, res: Response) => {
  const entity = req.body;
  //   importing services
  const {
    generateMigration,
    generateModel,
    generateFormRequest,
    generateController,
    generateRoute,
  } = await import("./laravel");
  const { generateVueComponent, generateRoute: generateVueRoute } = await import("./vue");
  generateMigration(
    { apiIdSingular: entity.apiIdSingular, apiIdPlural: entity.apiIdPlural },
    entity.fields,
    entity.projectPath
  );
  generateModel(
    entity.title,
    entity.fields,
    entity.projectPath,
    entity.groupName
  );
  generateFormRequest(
    entity.title,
    entity.fields,
    entity.projectPath,
    entity.groupName
  );
  generateController(entity.title, entity.projectPath, entity.groupName);
  generateRoute(
    entity.title,
    entity.apiIdPlural,
    entity.projectPath,
    entity.groupName
  );
  generateVueComponent(entity.title, entity.projectPath, entity.groupName, entity.apiIdSingular, entity.apiIdPlural, entity.fields);
  generateVueRoute(entity.title, entity.apiIdPlural, entity.projectPath, entity.groupName, entity.apiIdSingular);
  return res.status(400).send({ success: true });
});
app.listen(3000, async () => {
  console.log("Server is running on port 3000");
});
