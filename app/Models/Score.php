<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;
    public $timestamps = false; // karena kita cuma pakai created_at default
    protected $fillable = ['player_name', 'game', 'score', 'created_at'];
}