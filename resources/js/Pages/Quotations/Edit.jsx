import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, quotation, customers, skus }) {
    const { data, setData, put, processing, errors } = useForm({
        customer_id: quotation.customer_id || '',
        valid_until: quotation.valid_until ? quotation.valid_until.split('T')[0] : '',
        show_date_on_pdf: quotation.show_date_on_pdf ?? true,
        items: quotation.items?.map(item => ({
            sku_id: item.sku_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            description: item.description || '',
        })) || [{ sku_id: '', quantity: 1, unit_price: 0, description: '' }],
        notes: quotation.notes || '',
        tax_rate: quotation.subtotal > 0
            ? ((quotation.tax_amount / quotation.subtotal) * 100).toFixed(2)
            : 0,
    });

    const addItem = () => {
        setData('items', [...data.items, { sku_id: '', quantity: 1, unit_price: 0, description: '' }]);
    };

    const removeItem = (index) => {
        const newItems = data.items.filter((_, i) => i !== index);
        setData('items', newItems);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;

        if (field === 'sku_id') {
            const sku = skus.find(s => s.id === parseInt(value));
            if (sku) {
                newItems[index].unit_price = sku.unit_price;
                newItems[index].description = sku.description || sku.name;
            }
        }

        setData('items', newItems);
    };

    const calculateSubtotal = () => {
        return data.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const taxAmount = subtotal * (data.tax_rate / 100);
        return subtotal + taxAmount;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('quotations.update', quotation.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Quotation: {quotation.quotation_number}</h2>}
        >
            <Head title={`Edit Quotation: ${quotation.quotation_number}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Valid Until</label>
                                        <input
                                            type="date"
                                            value={data.valid_until}
                                            onChange={(e) => setData('valid_until', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="flex items-end">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.show_date_on_pdf}
                                                onChange={(e) => setData('show_date_on_pdf', e.target.checked)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">Show date on PDF</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Items */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="block text-sm font-medium text-gray-700">Items *</label>
                                        <button type="button" onClick={addItem} className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                                            + Add Item
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {data.items.map((item, index) => (
                                            <div key={index} className="grid grid-cols-12 gap-3 items-start bg-gray-50 p-3 rounded-md">
                                                <div className="col-span-4">
                                                    <label className="block text-xs text-gray-500 mb-1">SKU</label>
                                                    <select
                                                        value={item.sku_id}
                                                        onChange={(e) => updateItem(index, 'sku_id', e.target.value)}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                        required
                                                    >
                                                        <option value="">Select SKU</option>
                                                        {skus.map((sku) => (
                                                            <option key={sku.id} value={sku.id}>{sku.sku_code} - {sku.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-span-3">
                                                    <label className="block text-xs text-gray-500 mb-1">Description</label>
                                                    <input
                                                        type="text"
                                                        value={item.description}
                                                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-1">
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
                                                <div className="col-span-1 text-right pt-6">
                                                    <span className="font-semibold text-sm">RM {(item.quantity * item.unit_price).toFixed(2)}</span>
                                                </div>
                                                <div className="col-span-1 pt-6 text-center">
                                                    {data.items.length > 1 && (
                                                        <button type="button" onClick={() => removeItem(index)} className="text-red-600 hover:text-red-800 font-bold">✕</button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.items && <div className="text-red-600 text-sm mt-1">{errors.items}</div>}
                                </div>

                                {/* Totals */}
                                <div className="flex justify-end border-t pt-4">
                                    <div className="w-64 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-semibold">RM {calculateSubtotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">Tax Rate (%):</span>
                                            <input
                                                type="number"
                                                value={data.tax_rate}
                                                onChange={(e) => setData('tax_rate', parseFloat(e.target.value) || 0)}
                                                className="w-16 p-1 text-right border rounded text-xs"
                                                min="0" max="100"
                                            />
                                        </div>
                                        <div className="flex justify-between text-lg font-bold border-t pt-2">
                                            <span>Total:</span>
                                            <span>RM {calculateTotal().toFixed(2)}</span>
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
                                        placeholder="Quotation notes..."
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3">
                                    <Link
                                        href={route('quotations.show', quotation.id)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Quotation'}
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
