<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'desc',
        'home_url',
        'affiliate_irl',
        'thumbnail',
        'is_featured',
        'extra_info',
        'focus_keyphrase',
        'seo_title',
        'meta_description'
    ];

    public function coupons()
    {
        return $this->belongsToMany(Coupon::class);
    }
}
