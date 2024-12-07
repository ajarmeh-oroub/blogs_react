<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;


    protected $fillable = ['image', 'title', 'article','category_id', 'user_Id'];


    function comments(){
        return $this->hasMany(Comment::class);
    }

    function users(){
        return $this->belongsTo(User::class , 'user_id');
    }
    function category(){
        return $this->belongsTo(Category::class);
    }
}
