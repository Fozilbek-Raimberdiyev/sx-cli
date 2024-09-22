import fs from "fs";
import path from "path";
// Function to ensure the directory exists, and if not, create it
export function ensureDirectoryExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
