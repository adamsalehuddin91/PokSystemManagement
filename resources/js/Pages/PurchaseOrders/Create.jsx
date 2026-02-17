import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ auth, suppliers, skus }) {
    const { data, setData, post, processing, errors } = useForm({
        supplier_id: '',
        notes: '',
        status: 'draft',
        items: [{ sku_id: '', quantity: 1, unit_price: 0 }],
    });

    const addItem = () => {
        setData('items', [...data.items, { sku_id: '', quantity: 1, unit_price: 0 }]);
    };

    const removeItem = (index) => {
        const newItems = data.items.filter((_, i) => i !== index);
        setData('items', newItems);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;

        // Auto-fill unit price when SKU is selected
        if (field === 'sku_id') {
            const sku = skus.find(s => s.id === parseInt(value));
            if (sku) {
                newItems[index].unit_price = sku.cost_price;
            }
        }

        setData('items', newItems);
    };

    const calculateTotal = () => {
        return data.items.reduce((sum, item) => {
            return sum + (item.quantity * item.unit_price);
        }, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('purchase-orders.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Purchase Order</h2>}
        >
            <Head title="Create Purchase Order" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Supplier */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Supplier *</label>
                                    <select
                                        value={data.supplier_id}
                                        onChange={(e) => setData('supplier_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Supplier</option>
                                        {suppliers.map((supplier) => (
                                            <option key={supplier.id} value={supplier.id}>
                                                {supplier.name} {supplier.company_name && `(${supplier.company_name})`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.supplier_id && <div className="text-red-600 text-sm mt-1">{errors.supplier_id}</div>}
                                </div>

                                {/* Items */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="block text-sm font-medium text-gray-700">Items *</label>
                                        <button
                                            type="button"
                                            onClick={addItem}
                                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                                        >
                                            + Add Item
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {data.items.map((item, index) => (
                                            <div key={index} className="grid grid-cols-12 gap-3 items-start">
                                                <div className="col-span-5">
                                                    <select
                                                        value={item.sku_id}
                                                        onChange={(e) => updateItem(index, 'sku_id', e.target.value)}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                        required
                                                    >
                                                        <option value="">Select SKU</option>
                                                        {skus.map((sku) => (
                                                            <option key={sku.id} value={sku.id}>
                                                                {sku.sku_code} - {sku.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-span-2">
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                                        placeholder="Qty"
                                                        min="1"
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={item.unit_price}
                                                        onChange={(e) => updateItem(index, 'unit_price', e.target.value)}
                                                        placeholder="Price"
                                                        min="0"
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2 text-right pt-2">
                                                    <span className="font-semibold">
                                                        RM {(item.quantity * item.unit_price).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="col-span-1">
                                                    {data.items.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(index)}
                                                            className="px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.items && <div className="text-red-600 text-sm mt-1">{errors.items}</div>}
                                </div>

                                {/* Total */}
                                <div className="border-t pt-4">
                                    <div className="flex justify-end">
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">Total Amount</div>
                                            <div className="text-2xl font-bold text-gray-900">
                                                RM {calculateTotal().toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                                    <textarea
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Additional notes..."
                                    />
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
                                        <option value="draft">Save as Draft</option>
                                        <option value="pending">Submit for Approval</option>
                                    </select>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3">
                                    <Link
                                        href={route('purchase-orders.index')}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Purchase Order'}
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
