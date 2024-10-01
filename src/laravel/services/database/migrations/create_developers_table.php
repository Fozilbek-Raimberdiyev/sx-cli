<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeveloperTable extends Migration
{
    public function up()
    {
        Schema::create('developers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            // Relations
            
// Many-to-Many relation, managed by a pivot table.
// Many-to-Many relation, managed by a pivot table.
$table->foreignId('image_id')->constrained('images');
$table->foreignId('address_id')->constrained('addresses');
        });
    }

    public function down()
    {
        Schema::dropIfExists('developers');
    }
}