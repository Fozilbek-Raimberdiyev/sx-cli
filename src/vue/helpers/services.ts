import fs from "fs";
import path from "path";
import { ensureDirectoryExists } from "../../utils/folder";
export function generateService(entityName: string) {
  const servicePath = path.join("src", "services", `${entityName}Service.ts`);

  // Ensure the services directory exists
  ensureDirectoryExists(servicePath);

  const serviceTemplate = `
import axios from 'axios';

export const use${entityName}Service = () => {
  const fetchData = async () => {
    const response = await axios.get('/api/${entityName.toLowerCase()}');
    return response.data;
  };

  return { fetchData };
};
`;

  fs.writeFileSync(servicePath, serviceTemplate, "utf8");
  console.log(`Service generated at ${servicePath}`);
}
