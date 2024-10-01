<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Createaddress_developerTable extends Migration
{
    public function up()
    {
        Schema::create('address_developer', function (Blueprint $table) {
            $table->foreignId('address_id')->constrained();
$table->foreignId('developer_id')->constrained();
$table->primary(['address_id', 'developer_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('address_developer');
    }
}