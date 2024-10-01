<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressTable extends Migration
{
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            // Relations
            $table->foreignId('developer_id')->constrained('developers');
        });
    }

    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}