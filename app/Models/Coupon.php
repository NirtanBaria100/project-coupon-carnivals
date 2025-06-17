<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = [
        'title',
        'long_desc',
        'coupon_type',
        'code',
        'coupon_url',
        'expires',
        'updated_at',
        'is_exclusive',
        'is_featured',
        'is_verified',
        'is_published',
        'featured_image'
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function stores()
    {
        return $this->belongsToMany(Store::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
