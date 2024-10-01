<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSkillTable extends Migration
{
    public function up()
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            // Relations
            // Many-to-Many relation, managed by a pivot table.
        });
    }

    public function down()
    {
        Schema::dropIfExists('skills');
    }
}