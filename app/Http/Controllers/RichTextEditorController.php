<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RichTextEditorController extends Controller
{
       public function storeImage(Request $request)
        {
            if ($request->hasFile('image')) {
                $filename = time() .'.'. $request->file('image')->getClientOriginalExtension();
                $path = $request->file('image')->move($request->query('path'), $filename);

                // Full public URL to the uploaded image
                $url = asset($path);

                return response()->json([
                    'success' => true,
                    'file' => [
                        'url' => $url
                    ]
                ]);
            }

            return response()->json(['success' => false, 'message' => 'No image uploaded.'], 400);
        }
}
