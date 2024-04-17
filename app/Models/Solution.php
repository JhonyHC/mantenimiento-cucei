<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    use HasFactory;


    public function evidences()
    {
        return $this->morphMany(Evidence::class, 'evidenceable');
    }
}
