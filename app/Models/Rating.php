<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = ['store_id','ip_address','ratings','is_approved'];

    public function stores(){
        $this->hasMany(Store::class,'id','store_id');
    }
}
