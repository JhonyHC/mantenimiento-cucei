<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Solution extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'report_id',
        'user_id',
        'solved_at',
    ];

    protected $casts = [
        'solved_at' => 'datetime',
    ];

    public function report()
    {
        return $this->belongsTo(Report::class);
    }

    public function solver(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function evidences()
    {
        return $this->morphMany(Evidence::class, 'evidenceable');
    }
}
