import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, sku, stockHistory }) {
    const [showAdjustModal, setShowAdjustModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        quantity: '',
        notes: '',
    });

    const handleAdjustStock = (e) => {
        e.preventDefault();
        post(route('inventory.adjust-stock', sku.id), {
            onSuccess: () => {
                reset();
                setShowAdjustModal(false);
            },
        });
    };

    const profitMargin = sku.cost_price > 0
        ? (((sku.unit_price - sku.cost_price) / sku.cost_price) * 100).toFixed(2)
        : 0;

    const stockValue = (sku.current_stock * sku.cost_price).toFixed(2);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">SKU Details: {sku.sku_code}</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowAdjustModal(true)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Adjust Stock
                        </button>
                        <Link
                            href={route('inventory.edit', sku.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Edit SKU
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`SKU: ${sku.sku_code}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* SKU Information */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500">SKU Code</label>
                                    <p className="font-semibold">{sku.sku_code}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Name</label>
                                    <p className="font-semibold">{sku.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Category</label>
                                    <p className="font-semibold">{sku.category?.name || '-'}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Status</label>
                                    <p>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${sku.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {sku.status}
                                        </span>
                                    </p>
                                </div>
                                {sku.description && (
                                    <div className="col-span-2">
                                        <label className="text-sm text-gray-500">Description</label>
                                        <p className="text-gray-700">{sku.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stock & Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Stock Information */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Stock Information</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Current Stock</span>
                                        <span className="font-bold text-2xl">{sku.current_stock}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Min Level</span>
                                        <span className="font-semibold">{sku.min_stock_level}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Max Level</span>
                                        <span className="font-semibold">{sku.max_stock_level}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Stock Value</span>
                                        <span className="font-semibold">RM {stockValue}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Information */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Pricing Information</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Cost Price</span>
                                        <span className="font-semibold">RM {parseFloat(sku.cost_price).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Unit Price</span>
                                        <span className="font-semibold">RM {parseFloat(sku.unit_price).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Profit Margin</span>
                                        <span className="font-semibold text-green-600">{profitMargin}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Profit per Unit</span>
                                        <span className="font-semibold text-green-600">
                                            RM {(sku.unit_price - sku.cost_price).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stock Movement History */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Stock Movement History (Last 30 Days)</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">By</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {stockHistory.length > 0 ? (
                                            stockHistory.map((movement) => (
                                                <tr key={movement.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {new Date(movement.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${movement.type === 'in'
                                                                ? 'bg-green-100 text-green-800'
                                                                : movement.type === 'out'
                                                                    ? 'bg-red-100 text-red-800'
                                                                    : 'bg-blue-100 text-blue-800'
                                                            }`}>
                                                            {movement.type.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                                                        {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {movement.reference_type || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {movement.notes || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {movement.creator?.name || '-'}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                    No stock movements yet
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Adjust Stock Modal */}
            {showAdjustModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Adjust Stock</h3>
                            <form onSubmit={handleAdjustStock} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Quantity (use negative for deduction)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="e.g., 10 or -5"
                                        required
                                    />
                                    {errors.quantity && <div className="text-red-600 text-sm mt-1">{errors.quantity}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                                    <textarea
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Reason for adjustment..."
                                    />
                                </div>

                                {errors.error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                        {errors.error}
                                    </div>
                                )}

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAdjustModal(false);
                                            reset();
                                        }}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Adjusting...' : 'Adjust Stock'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
