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
        Schema::create('from_fields', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_id');
            $table->string('name');
            $table->foreignId('field_type_id')->constrained('field_types')->onDelete('cascade');
            $table->boolean('is_required')->default(false);
            $table->boolean('readonly')->default(false);
            $table->bigInteger('createdby')->nullable();
            $table->bigInteger('updatedby')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('from_fields');
    }
};
