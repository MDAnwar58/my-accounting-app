<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    use HasFactory;
    protected $table = 'years';
    protected $fillable = [
        'name'
    ];

    public function months()
    {
        return $this->hasMany(Month::class);
    }
}
