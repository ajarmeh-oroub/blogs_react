<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::with(['users' , 'category'])->get();
        return response()->json($blogs);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
 
        $validated = $request->validate(
            [
               'user_Id' => 'required|numeric',
                'title' => 'required|string|max:255',
             'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10240', 
                'article' => 'required|string',
                'category_id'=>'numeric',
            ],
            [
                'title.required' => 'The title field is required.',
                'image.required' => 'An image is required.',
                'image.image' => 'The uploaded file must be an image.',
                'article.required' => 'The article field is required.',
            ]
        );
    
        try {
          
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('uploads/blogs', 'public');
                $validated['image'] = $imagePath; 
            }
    
            $blog = Blog::create($validated);
    
            return response()->json(['message' => 'Blog created successfully', 'blog' => $blog], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create blog', 'details' => $e->getMessage()], 500);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    
     public function update(Request $request, $id)
     {
         // Validate the incoming data
         $validatedData = $request->validate([
             'title' => 'string|max:255',
             'article' => 'string',
             'category_id' => 'integer',
             'image' => 'nullable|string', // Update: Allow image to be a string (path)
         ]);
     
         // Find the blog by ID
         $blog = Blog::find($id);
         if (!$blog) {
             return response()->json(['message' => 'Blog not found'], 404);
         }
     
         // If the image path is provided (as a string), update it
         if ($request->has('image')) {
             $blog->image = $validatedData['image']; // Update the image path
         }
     
         // Update other fields
         $blog->title = $validatedData['title'];
         $blog->article = $validatedData['article'];
         $blog->category_id = $validatedData['category_id'];
         $blog->save();
     
         // Return the updated blog
         return response()->json([
             'message' => 'Blog updated successfully',
             'blog' => $blog
         ]);
     }
     
     
     
     
    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the blog
        $blog = Blog::find($id);
    
        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }
    
        // Optionally delete the associated image
        if ($blog->image && Storage::exists($blog->image)) {
            Storage::delete($blog->image);
        }
    
        // Delete the blog
        $blog->delete();
    
        return response()->json(['message' => 'Blog deleted successfully']);
    }
    

    public function getBlogUser($id){

        $blogs = Blog::with('users' , 'category')->where('user_id', '=', $id)->get();

        return response()->json($blogs);

    }
}
