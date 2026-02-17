<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display categories
     */
    public function index()
    {
        $categories = Category::with('parent', 'children')
            ->whereNull('parent_id')
            ->get();

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store new category
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        Category::create($validated);

        return back()->with('success', 'Category created successfully');
    }

    /**
     * Update category
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        // Prevent circular reference
        if ($validated['parent_id'] == $category->id) {
            return back()->withErrors(['parent_id' => 'Category cannot be its own parent']);
        }

        $category->update($validated);

        return back()->with('success', 'Category updated successfully');
    }

    /**
     * Delete category
     */
    public function destroy(Category $category)
    {
        if ($category->hasChildren()) {
            return back()->withErrors(['error' => 'Cannot delete category with subcategories']);
        }

        if ($category->skus()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete category with SKUs']);
        }

        $category->delete();

        return back()->with('success', 'Category deleted successfully');
    }
}
