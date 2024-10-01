<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Createdeveloper_skillTable extends Migration
{
    public function up()
    {
        Schema::create('developer_skill', function (Blueprint $table) {
            $table->foreignId('developer_id')->constrained();
$table->foreignId('skill_id')->constrained();
$table->primary(['developer_id', 'skill_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('developer_skill');
    }
}