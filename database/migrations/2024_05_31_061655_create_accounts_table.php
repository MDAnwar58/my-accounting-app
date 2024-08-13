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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('title', 500)->nullable();
            $table->string('amount', 50)->nullable();
            $table->string('price', 50);
            $table->enum('type', ['collect', 'expense']);
            $table->timestamp('date_time');
            $table->unsignedBigInteger('month_id')->nullable();
            $table->unsignedBigInteger('year_id')->nullable();
            $table->string('image')->nullable();
            $table->foreign('user_id')->references('id')->on('users')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreign('month_id')->references('id')->on('months')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreign('year_id')->references('id')->on('years')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
