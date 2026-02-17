import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Create({ auth, customers, skus, purchaseOrder }) {
    const { data, setData, post, processing, errors } = useForm({
        purchase_order_id: purchaseOrder ? purchaseOrder.id : '',
        customer_id: '',
        delivery_date: new Date().toISOString().split('T')[0],
        notes: '',
        items: [{ sku_id: '', quantity: 1, unit_price: 0 }],
    });

    useEffect(() => {
        if (purchaseOrder) {
            // Auto-fill items from PO
            const poItems = purchaseOrder.items.map(item => ({
                sku_id: item.sku_id,
                quantity: item.quantity,
                unit_price: item.sku.unit_price // Use selling price from SKU, not cost from PO
            }));
            setData(prev => ({
                ...prev,
                items: poItems,
                notes: `Delivery for PO #${purchaseOrder.po_number}`
            }));
        }
    }, [purchaseOrder, setData]);

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
                newItems[index].unit_price = sku.unit_price; // Selling price
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
        post(route('delivery-orders.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Delivery Order</h2>}
        >
            <Head title="Create Delivery Order" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {purchaseOrder && (
                                <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-blue-700">
                                                Creating Delivery Order from <strong>PO: {purchaseOrder.po_number}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Customer */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Customer *</label>
                                        <select
                                            value={data.customer_id}
                                            onChange={(e) => setData('customer_id', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select Customer</option>
                                            {customers.map((customer) => (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.name} {customer.company_name && `(${customer.company_name})`}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.customer_id && <div className="text-red-600 text-sm mt-1">{errors.customer_id}</div>}
                                    </div>

                                    {/* Delivery Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Delivery Date *</label>
                                        <input
                                            type="date"
                                            value={data.delivery_date}
                                            onChange={(e) => setData('delivery_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.delivery_date && <div className="text-red-600 text-sm mt-1">{errors.delivery_date}</div>}
                                    </div>
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
                                            <div key={index} className="grid grid-cols-12 gap-3 items-start bg-gray-50 p-3 rounded-md">
                                                <div className="col-span-5">
                                                    <label className="block text-xs text-gray-500 mb-1">SKU</label>
                                                    <select
                                                        value={item.sku_id}
                                                        onChange={(e) => updateItem(index, 'sku_id', e.target.value)}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                        required
                                                    >
                                                        <option value="">Select SKU</option>
                                                        {skus.map((sku) => (
                                                            <option key={sku.id} value={sku.id}>
                                                                {sku.sku_code} - {sku.name} (Stock: {sku.current_stock})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-span-2">
                                                    <label className="block text-xs text-gray-500 mb-1">Qty</label>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                        min="1"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label className="block text-xs text-gray-500 mb-1">Price (RM)</label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={item.unit_price}
                                                        onChange={(e) => updateItem(index, 'unit_price', e.target.value)}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2 text-right pt-6">
                                                    <span className="font-semibold text-sm">
                                                        RM {(item.quantity * item.unit_price).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="col-span-1 pt-6 text-center">
                                                    {data.items.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(index)}
                                                            className="text-red-600 hover:text-red-800 font-bold"
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
                                            <div className="text-sm text-gray-500">Estimated Total Value</div>
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
                                        placeholder="Delivery instructions..."
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3">
                                    <Link
                                        href={route('delivery-orders.index')}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Delivery Order'}
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
