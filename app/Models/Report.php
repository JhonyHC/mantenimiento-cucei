<?php

namespace App\Models;

use App\Enums\ReportStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'infrastructure_id',
    ];

    protected $attributes = [
        'status' => ReportStatus::OPEN,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function solution(): HasOne
    {
        return $this->hasOne(Solution::class);
    }

    public function evidences()
    {
        return $this->morphMany(Evidence::class, 'evidenceable');
    }

    public function infrastructure(): BelongsTo
    {
        return $this->belongsTo(Infrastructure::class);
    }

    public function importance()
    {
        return $this->belongsToMany(User::class, 'report_importance')->withTimestamps();
    }

    public function solver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'solver_id');
    }

    protected function userAddedImportance(): Attribute
    {
        return Attribute::make(get: fn () => $this->importance()->wherePivot('user_id', auth()->id())->exists());
    }


}
