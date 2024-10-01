<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Createdeveloper_projectTable extends Migration
{
    public function up()
    {
        Schema::create('developer_project', function (Blueprint $table) {
            $table->foreignId('developer_id')->constrained();
$table->foreignId('project_id')->constrained();
$table->primary(['developer_id', 'project_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('developer_project');
    }
}