<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       if(Schema::hasColumn('categories','single_line_desc')){
            Schema::table('categories', function(Blueprint $table){
                $table->dropColumn('single_line_desc');
            });
       }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
