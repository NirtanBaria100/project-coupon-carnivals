<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->foreignId('parent_cat')->nullable()->constrained('categories')->onDelete('cascade');
            $table->text('desc')->nullable();
            $table->string('icon')->nullable();
            $table->string('image_icon')->nullable();
            $table->string('single_line_desc')->nullable();
            $table->boolean('is_popular')->default(false);
            $table->text('focus_keyphrase')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
