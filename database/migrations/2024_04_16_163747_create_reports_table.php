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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('infrastructure_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('solver_id')->nullable()->constrained(table: 'users', indexName: 'solver_user_id')->nullOnDelete();
            $table->string('title');
            $table->string('description');
            $table->integer('status')->default(1);
            $table->integer('importance')->default(0);
            $table->string('evidence_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
