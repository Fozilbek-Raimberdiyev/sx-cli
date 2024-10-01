<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Createdeveloper_imageTable extends Migration
{
    public function up()
    {
        Schema::create('developer_image', function (Blueprint $table) {
            $table->foreignId('developer_id')->constrained();
$table->foreignId('image_id')->constrained();
$table->primary(['developer_id', 'image_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('developer_image');
    }
}