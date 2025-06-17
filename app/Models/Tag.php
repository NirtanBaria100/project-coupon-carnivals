<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['name', 'slug', 'desc'];

    public function coupons()
    {
        return $this->belongsToMany(Coupon::class);
    }
}
