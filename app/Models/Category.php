<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Category extends Model
{

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    protected $fillable = [
        'name',
        'slug',
        'desc',
        'parent_cat',
        'icon',
        'image_icon',
        'single_line_desc',
        'is_popular',
        'focus_keyphrase',
        'seo_title',
        'meta_description'
    ];


    // Category.php

    public function coupons()
    {
        return $this->belongsToMany(Coupon::class);
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_cat');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_cat');
    }
}
