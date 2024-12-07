<?php

namespace App\Http\Controllers;

use App\Models\Blog;

use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $blog = Blog::with('user')->find($id);

    if (!$blog) {
        return response()->json(['message' => 'Blog not found'], 404);
    }

    return response()->json($blog);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        
        // Check if the search query is empty
        if (empty($search)) {
            return response()->json(['message' => 'No search term provided'], 400);
        }

        // Perform search query
        $results = Blog::where('title', 'LIKE', "%$search%")
                        ->orWhere('article', 'LIKE', "%$search%")
                        ->get();

        // Check if no results were found
        if ($results->isEmpty()) {
            return response()->json(['message' => 'No blogs found'], 404);
        }

        // Return the results as JSON
        return response()->json($results);
    }


}
