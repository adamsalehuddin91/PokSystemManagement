import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        sku_code: '',
        name: '',
        description: '',
        category_id: '',
        unit_price: '',
        cost_price: '',
        current_stock: 0,
        min_stock_level: 0,
        max_stock_level: 0,
        status: 'active',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('inventory.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New SKU</h2>}
        >
            <Head title="Create SKU" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* SKU Code */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">SKU Code *</label>
                                    <input
                                        type="text"
                                        value={data.sku_code}
                                        onChange={(e) => setData('sku_code', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.sku_code && <div className="text-red-600 text-sm mt-1">{errors.sku_code}</div>}
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <div className="text-red-600 text-sm mt-1">{errors.category_id}</div>}
                                </div>

                                {/* Pricing */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Cost Price (RM) *</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.cost_price}
                                            onChange={(e) => setData('cost_price', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.cost_price && <div className="text-red-600 text-sm mt-1">{errors.cost_price}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Unit Price (RM) *</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.unit_price}
                                            onChange={(e) => setData('unit_price', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.unit_price && <div className="text-red-600 text-sm mt-1">{errors.unit_price}</div>}
                                    </div>
                                </div>

                                {/* Stock Levels */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Initial Stock *</label>
                                        <input
                                            type="number"
                                            value={data.current_stock}
                                            onChange={(e) => setData('current_stock', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.current_stock && <div className="text-red-600 text-sm mt-1">{errors.current_stock}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Min Stock Level *</label>
                                        <input
                                            type="number"
                                            value={data.min_stock_level}
                                            onChange={(e) => setData('min_stock_level', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.min_stock_level && <div className="text-red-600 text-sm mt-1">{errors.min_stock_level}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Max Stock Level *</label>
                                        <input
                                            type="number"
                                            value={data.max_stock_level}
                                            onChange={(e) => setData('max_stock_level', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.max_stock_level && <div className="text-red-600 text-sm mt-1">{errors.max_stock_level}</div>}
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status *</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {errors.status && <div className="text-red-600 text-sm mt-1">{errors.status}</div>}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3">
                                    <Link
                                        href={route('inventory.index')}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create SKU'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
