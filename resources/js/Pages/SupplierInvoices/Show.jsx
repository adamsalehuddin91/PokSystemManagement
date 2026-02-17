import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, supplierInvoice }) {
    const getStatusBadge = (status) => {
        const badges = {
            draft: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-green-100 text-green-800',
        };
        return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${badges[status]}`}>{status.toUpperCase()}</span>;
    };

    const handleConfirm = () => {
        if (confirm('Confirm this supplier invoice? This will:\n- Add stock to inventory for all items\n- Update cost price (harga modal) for each SKU\n- Record expense in finance\n\nThis action cannot be undone.')) {
            router.post(route('supplier-invoices.confirm', supplierInvoice.id));
        }
    };

    const handleDelete = () => {
        if (confirm('Delete this draft supplier invoice?')) {
            router.delete(route('supplier-invoices.destroy', supplierInvoice.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Supplier Invoice: {supplierInvoice.supplier_invoice_number}
                    </h2>
                </div>
            }
        >
            <Head title={`Supplier Invoice: ${supplierInvoice.supplier_invoice_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Invoice Info */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Invoice Date:</span>
                                            <span>{new Date(supplierInvoice.invoice_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Status:</span>
                                            {getStatusBadge(supplierInvoice.status)}
                                        </div>
                                        {supplierInvoice.supplier_ref_number && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Supplier Ref:</span>
                                                <span className="font-medium">{supplierInvoice.supplier_ref_number}</span>
                                            </div>
                                        )}
                                        {supplierInvoice.purchase_order && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Linked PO:</span>
                                                <Link
                                                    href={route('purchase-orders.show', supplierInvoice.purchase_order.id)}
                                                    className="text-blue-600 hover:text-blue-900 font-medium"
                                                >
                                                    {supplierInvoice.purchase_order.po_number}
                                                </Link>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Amount:</span>
                                            <span className="font-bold text-lg">RM {parseFloat(supplierInvoice.total_amount).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Supplier</h3>
                                    <p className="font-semibold">{supplierInvoice.supplier?.name}</p>
                                    <p className="text-gray-600">{supplierInvoice.supplier?.company_name}</p>
                                    <p className="text-gray-600">{supplierInvoice.supplier?.email}</p>
                                    <p className="text-gray-600">{supplierInvoice.supplier?.phone}</p>
                                </div>
                            </div>

                            {supplierInvoice.notes && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                    <span className="text-sm font-medium text-gray-500">Notes:</span>
                                    <p className="text-sm text-gray-700 mt-1">{supplierInvoice.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Items</h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Cost</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {supplierInvoice.items?.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{item.sku?.name}</div>
                                                <div className="text-xs text-gray-500">{item.sku?.sku_code}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm">{item.quantity}</td>
                                            <td className="px-6 py-4 text-right text-sm">RM {parseFloat(item.unit_cost).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right text-sm font-semibold">RM {parseFloat(item.total_cost).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2">
                                        <td colSpan="3" className="px-6 py-3 text-right text-lg font-bold">Total:</td>
                                        <td className="px-6 py-3 text-right text-lg font-bold">RM {parseFloat(supplierInvoice.total_amount).toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Actions */}
                    {supplierInvoice.status === 'draft' && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={handleConfirm}
                                        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-bold text-lg"
                                    >
                                        Confirm & Add Stock
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-gray-200 text-red-600 rounded-md hover:bg-gray-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <p className="mt-3 text-sm text-gray-500">
                                    Confirming will add all items to inventory stock and update each SKU's cost price (harga modal).
                                </p>
                            </div>
                        </div>
                    )}

                    {supplierInvoice.status === 'confirmed' && (
                        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                            <p className="text-sm text-green-700">
                                This supplier invoice has been confirmed. Stock has been added to inventory.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
