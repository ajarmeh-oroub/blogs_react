<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    function index(){

        $blogs['latest'] = Blog::latest()->take(13)->get();
        $blogs['first'] = $blogs['latest']->first();

        $blogIds = DB::table('blog_user')
            ->select('blog_id', DB::raw('COUNT(*) as user_count'))
            ->groupBy('blog_id')
            ->orderBy('user_count', 'desc')
            ->take(3)
            ->pluck('blog_id');

        $blogs['trends'] = Blog::whereIn('id', $blogIds)->get();



        return response()->json($blogs, 200);
    }
}
