<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersTableToHaveName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove the first_name and last_name columns
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
            
            // Add the name column
            $table->string('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Add back first_name and last_name
            $table->string('first_name');
            $table->string('last_name');
            
            // Drop the name column
            $table->dropColumn('name');
        });
    }
}
