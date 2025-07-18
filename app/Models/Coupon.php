<?php

namespace App\Models;

use Carbon\Carbon;
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
    protected static function boot()
    {
        parent::boot();
        static::updated(function ($coupon) {
            $storeId = \Illuminate\Support\Facades\DB::table('coupon_store')
                ->where('coupon_id', $coupon->id)
                ->value('store_id');
            if ($storeId) {
                $store = Store::find($storeId);
                if ($store) {
                    $store->updated_at = Carbon::now();
                    $store->save();
                }
            }
        });
        static::created(function ($coupon) {
            $storeId = \Illuminate\Support\Facades\DB::table('coupon_store')
                ->where('coupon_id', $coupon->id)
                ->value('store_id');
            if ($storeId) {
                $store = Store::find($storeId);
                if ($store) {
                    $store->updated_at = Carbon::now();
                    $store->save();
                }
            }
        });
    }


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
