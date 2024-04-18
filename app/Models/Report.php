<?php

namespace App\Models;

use App\Enums\ReportStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
    ];

    protected $attributes = [
        'status' => ReportStatus::OPEN,
        'importance' => 0
    ];


    public function evidences()
    {
        return $this->morphMany(Evidence::class, 'evidenceable');
    }
}
