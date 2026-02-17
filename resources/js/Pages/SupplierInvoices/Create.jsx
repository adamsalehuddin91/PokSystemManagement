import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Create({ auth, suppliers, skus, purchaseOrder, purchaseOrders }) {
    const { data, setData, post, processing, errors } = useForm({
        supplier_id: '',
        purchase_order_id: purchaseOrder ? purchaseOrder.id : '',
        supplier_ref_number: '',
        invoice_date: new Date().toISOString().split('T')[0],
        notes: '',
        items: [{ sku_id: '', quantity: 1, unit_cost: 0 }],
    });

    useEffect(() => {
        if (purchaseOrder) {
            const poItems = purchaseOrder.items.map(item => ({
                sku_id: item.sku_id,
                quantity: item.quantity,
                unit_cost: item.unit_price, // PO unit_price = cost price for supplier
            }));

            setData(prev => ({
                ...prev,
                supplier_id: purchaseOrder.supplier_id,
                items: poItems,
                notes: `From PO ${purchaseOrder.po_number}`,
            }));
        }
    }, [purchaseOrder, setData]);

    const handlePoSelect = (poId) => {
        setData('purchase_order_id', poId);
        if (poId) {
            const po = purchaseOrders.find(p => p.id === parseInt(poId));
            if (po) {
                setData(prev => ({
                    ...prev,
                    purchase_order_id: poId,
                    supplier_id: po.supplier_id,
                }));
            }
        }
    };

    const addItem = () => {
        setData('items', [...data.items, { sku_id: '', quantity: 1, unit_cost: 0 }]);
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
                newItems[index].unit_cost = sku.cost_price; // Auto-fill with current cost price
            }
        }

        setData('items', newItems);
    };

    const calculateTotal = () => {
        return data.items.reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('supplier-invoices.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Supplier Invoice</h2>}
        >
            <Head title="New Supplier Invoice" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {purchaseOrder && (
                                <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4">
                                    <p className="text-sm text-blue-700">
                                        Creating from <strong>PO: {purchaseOrder.po_number}</strong>
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Link to PO (optional)</label>
                                        <select
                                            value={data.purchase_order_id}
                                            onChange={(e) => handlePoSelect(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="">No PO link</option>
                                            {purchaseOrders.map((po) => (
                                                <option key={po.id} value={po.id}>
                                                    {po.po_number} - {po.supplier?.company_name || po.supplier?.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Supplier Ref / Invoice No.</label>
                                        <input
                                            type="text"
                                            value={data.supplier_ref_number}
                                            onChange={(e) => setData('supplier_ref_number', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Supplier's own invoice number..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Invoice Date *</label>
                                        <input
                                            type="date"
                                            value={data.invoice_date}
                                            onChange={(e) => setData('invoice_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.invoice_date && <div className="text-red-600 text-sm mt-1">{errors.invoice_date}</div>}
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
                                                                {sku.sku_code} - {sku.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-span-2">
                                                    <label className="block text-xs text-gray-500 mb-1">Qty</label>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                        min="1"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label className="block text-xs text-gray-500 mb-1">Cost (RM)</label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={item.unit_cost}
                                                        onChange={(e) => updateItem(index, 'unit_cost', parseFloat(e.target.value) || 0)}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2 text-right pt-6">
                                                    <span className="font-semibold text-sm">RM {(item.quantity * item.unit_cost).toFixed(2)}</span>
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
                                        placeholder="Notes..."
                                    />
                                </div>

                                {/* Info box */}
                                <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                                    <p className="text-sm text-amber-700">
                                        <strong>Note:</strong> Stock will be added to inventory when you confirm this invoice.
                                        The cost price (harga modal) of each SKU will also be updated automatically.
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3">
                                    <Link
                                        href={route('supplier-invoices.index')}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Supplier Invoice'}
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
