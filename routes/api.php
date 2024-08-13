<?php

use App\Http\Controllers\AccountController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/get-accounts', [AccountController::class, 'get']);
Route::get('/get-collect-money/{user_id}', [AccountController::class, 'collect']);
Route::get('/get-expense-money/{user_id}', [AccountController::class, 'expense']);
Route::post('/account-store', [AccountController::class, 'store'])->name('account.store');
Route::get('/account-edit/{id}', [AccountController::class, 'edit']);
Route::post('/account-update/{id}', [AccountController::class, 'update']);
Route::get('/account-delete/{id}', [AccountController::class, 'destory']);