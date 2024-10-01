import fs from 'fs'
import path from 'path'
import { ensureDirectoryExists } from '../../utils/folder'
// Helper to generate migration for a table
export function generateMigration(table: any) {
    const migrationContent = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

class Create${table.name}Table extends Migration
{
    public function up()
    {
        Schema::create('${table.apiIdPlural}', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            // Relations
            ${table.relations.map((relation: any) => generateRelation(relation)).join('\n')}
        });
    }

    public function down()
    {
        Schema::dropIfExists('${table.apiIdPlural}');
    }
}`

    const migrationPath = path.join(
        __dirname,
        'database/migrations',
        `create_${table.apiIdPlural}_table.php`
    )
    ensureDirectoryExists(migrationPath)
    fs.writeFileSync(migrationPath, migrationContent)
    console.log(`Migration created for table: ${table.name}`)
}

// Generate relation based on type
export function generateRelation(relation: any) {
    if (!relation.relationType) return ''

    switch (relation.relationType.code) {
        case 'one-to-many':
            return `$table->foreignId('${relation.relationTable.apiIdSingular}_id')->constrained('${relation.relationTable.apiIdPlural}');`

        case 'many-to-many':
            return `// Many-to-Many relation, managed by a pivot table.`

        default:
            return ''
    }
}

// Helper to generate pivot migration
export function generatePivotMigration(pivot: any) {
    const pivotMigrationContent = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

class Create${pivot.name}Table extends Migration
{
    public function up()
    {
        Schema::create('${pivot.name}', function (Blueprint $table) {
            ${pivot.fields.map((field: any) => generatePivotField(field)).join('\n')}
        });
    }

    public function down()
    {
        Schema::dropIfExists('${pivot.name}');
    }
}`

    const pivotMigrationPath = path.join(
        __dirname,
        'database/migrations',
        `create_${pivot.name}_table.php`
    )
    fs.writeFileSync(pivotMigrationPath, pivotMigrationContent)
    console.log(`Pivot migration created for: ${pivot.name}`)
}

// Helper to generate pivot fields
export function generatePivotField(field: any) {
    switch (field.type) {
        case 'foreignId':
            return `$table->foreignId('${field.title}_id')->constrained();`

        case 'primary':
            return `$table->primary([${field.title.map((t: any) => `'${t}'`).join(', ')}]);`

        default:
            return ''
    }
}

// Helper to create Laravel Model
export function generateModel(table: any) {
    const modelContent = `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class ${table.name} extends Model
{
    protected $fillable = [];

    // Relations
    ${table.relations.map((relation: any) => generateModelRelation(relation)).join('\n')}
}`

    const modelPath = path.join(__dirname, 'app/Models', `${table.name}.php`)
    fs.writeFileSync(modelPath, modelContent)
    console.log(`Model created for: ${table.name}`)
}

// Generate model relations
export function generateModelRelation(relation: any) {
    if (!relation.relationType) return ''

    switch (relation.relationType.code) {
        case 'one-to-many':
            return `public function ${relation.relationTable.apiIdPlural}()
      {
          return $this->hasMany(${relation.relationTable.name}::class);
      }`

        case 'many-to-many':
            return `public function ${relation.relationTable.apiIdPlural}()
      {
          return $this->belongsToMany(${relation.relationTable.name}::class);
      }`

        default:
            return ''
    }
}

// // Process tables
// const data = {
//     /* The provided object goes here */
// }

// data.tables.forEach((table) => {
//     generateMigration(table)
//     generateModel(table)
// })

// // Process pivots
// data.pivots.forEach((pivot) => generatePivotMigration(pivot))
