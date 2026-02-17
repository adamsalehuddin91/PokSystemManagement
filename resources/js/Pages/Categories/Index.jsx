import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, categories }) {
    const [editingId, setEditingId] = useState(null);

    const createForm = useForm({ name: '', parent_id: '' });
    const editForm = useForm({ name: '', parent_id: '' });

    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('categories.store'), {
            onSuccess: () => createForm.reset(),
        });
    };

    const startEdit = (category) => {
        setEditingId(category.id);
        editForm.setData({
            name: category.name,
            parent_id: category.parent_id || '',
        });
    };

    const handleUpdate = (e, id) => {
        e.preventDefault();
        editForm.patch(route('categories.update', id), {
            onSuccess: () => setEditingId(null),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('categories.destroy', id));
        }
    };

    // Flatten categories for parent dropdown (exclude current editing one)
    const allCategories = [];
    categories.forEach((cat) => {
        allCategories.push(cat);
        if (cat.children) {
            cat.children.forEach((child) => allCategories.push(child));
        }
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Create Form */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h3>
                            <form onSubmit={handleCreate} className="flex items-end gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                                    <input
                                        type="text"
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {createForm.errors.name && <div className="text-red-600 text-sm mt-1">{createForm.errors.name}</div>}
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Parent Category</label>
                                    <select
                                        value={createForm.data.parent_id}
                                        onChange={(e) => createForm.setData('parent_id', e.target.value || '')}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">None (Top Level)</option>
                                        {allCategories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 disabled:opacity-50"
                                >
                                    {createForm.processing ? 'Adding...' : 'Add Category'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Categories List */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                All Categories ({allCategories.length})
                            </h3>

                            {categories.length > 0 ? (
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <div key={category.id}>
                                            {/* Parent Category */}
                                            <CategoryRow
                                                category={category}
                                                isChild={false}
                                                editingId={editingId}
                                                editForm={editForm}
                                                allCategories={allCategories}
                                                onStartEdit={startEdit}
                                                onUpdate={handleUpdate}
                                                onCancelEdit={() => setEditingId(null)}
                                                onDelete={handleDelete}
                                            />

                                            {/* Child Categories */}
                                            {category.children && category.children.map((child) => (
                                                <CategoryRow
                                                    key={child.id}
                                                    category={child}
                                                    isChild={true}
                                                    editingId={editingId}
                                                    editForm={editForm}
                                                    allCategories={allCategories}
                                                    onStartEdit={startEdit}
                                                    onUpdate={handleUpdate}
                                                    onCancelEdit={() => setEditingId(null)}
                                                    onDelete={handleDelete}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    No categories yet. Create one above.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function CategoryRow({ category, isChild, editingId, editForm, allCategories, onStartEdit, onUpdate, onCancelEdit, onDelete }) {
    const isEditing = editingId === category.id;

    if (isEditing) {
        return (
            <form
                onSubmit={(e) => onUpdate(e, category.id)}
                className={`flex items-center gap-4 p-3 bg-yellow-50 rounded-lg ${isChild ? 'ml-8' : ''}`}
            >
                <input
                    type="text"
                    value={editForm.data.name}
                    onChange={(e) => editForm.setData('name', e.target.value)}
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
                <select
                    value={editForm.data.parent_id}
                    onChange={(e) => editForm.setData('parent_id', e.target.value || '')}
                    className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">None (Top Level)</option>
                    {allCategories
                        .filter((c) => c.id !== category.id)
                        .map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                </select>
                <button
                    type="submit"
                    disabled={editForm.processing}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-500 text-sm"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancelEdit}
                    className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 text-sm"
                >
                    Cancel
                </button>
                {editForm.errors.name && <span className="text-red-600 text-sm">{editForm.errors.name}</span>}
                {editForm.errors.parent_id && <span className="text-red-600 text-sm">{editForm.errors.parent_id}</span>}
            </form>
        );
    }

    return (
        <div className={`flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg ${isChild ? 'ml-8 border-l-2 border-gray-200' : ''}`}>
            <div className="flex items-center gap-2">
                {isChild && <span className="text-gray-400 text-sm">--</span>}
                <span className={`text-sm ${isChild ? 'text-gray-600' : 'font-medium text-gray-900'}`}>
                    {category.name}
                </span>
                {!isChild && category.children && category.children.length > 0 && (
                    <span className="text-xs text-gray-400">({category.children.length} sub)</span>
                )}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onStartEdit(category)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(category.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
