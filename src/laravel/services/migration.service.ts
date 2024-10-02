import fs from "fs";
import path from "path";
import { ensureDirectoryExists } from "../../utils/folder";
import { formatPhpFile } from "../../utils/prettier";
// generate migration with fields for laravel

export function generateMigration(
  entityName: { apiIdSingular: string; apiIdPlural: string },
  fields: { name: string; type: string, isNullable: boolean }[],
  projectPath: string
) {
  const migrationPath = path.join(
    projectPath,
    "database",
    "migrations",
    generateMigrationFileName(entityName.apiIdPlural)
  );
  if (!fs.existsSync(migrationPath)) {
    const template = `<?php
        use Illuminate\\Database\\Migrations\\Migration;
        use Illuminate\\Database\\Schema\\Blueprint;
        use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            '${entityName.apiIdPlural}',
            function (Blueprint $table) {
                $table->id();
                ${fields
        .map((field) => ` $table->${field.type}('${field.name}')${field.isNullable ? "->nullable();" : ";"}`)
        .join("\n")}
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('${entityName.apiIdPlural}');
    }
};

`;
    ensureDirectoryExists(migrationPath);
    // if the migration file does not exist, create it
    fs.writeFileSync(migrationPath, template, "utf8");
    formatPhpFile(migrationPath);
  }
}

export function generateMigrationFileName(tableName: string) {
  const now = new Date();

  // Format the date as YYYY_MM_DD_HHMMSS
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Create the migration file name
  const timestamp = `${year}_${month}_${day}_${hours}${minutes}${seconds}`;
  const fileName = `${timestamp}_create_${tableName}_table.php`;

  return fileName;
}


export function generateTimeStampMigration() {
  const now = new Date();

  // Format the date as YYYY_MM_DD_HHMMSS
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Create the migration file name
  const timestamp = `${year}_${month}_${day}_${hours}${minutes}${seconds}`;

  return timestamp;
}