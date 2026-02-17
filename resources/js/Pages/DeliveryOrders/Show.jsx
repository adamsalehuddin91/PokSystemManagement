import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, deliveryOrder }) {
    const handleComplete = () => {
        if (confirm('Mark this delivery as completed? This will update stock levels.')) {
            router.post(route('delivery-orders.complete', deliveryOrder.id));
        }
    };

    const handleCancel = () => {
        if (confirm('Cancel this Delivery Order?')) {
            router.post(route('delivery-orders.cancel', deliveryOrder.id));
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            completed: 'bg-green-100 text-green-800',
        };

        return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${badges[status] || 'bg-gray-100 text-gray-800'}`}>
            {status.toUpperCase()}
        </span>;
    };

    const calculateTotal = () => {
        return deliveryOrder.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Delivery Order: {deliveryOrder.do_number}
                    </h2>
                    <div className="flex gap-2">
                        {deliveryOrder.status === 'pending' && (
                            <>
                                <button
                                    onClick={handleComplete}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Mark as Delivered
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        {(deliveryOrder.status === 'delivered' || deliveryOrder.status === 'completed') && (
                            <Link
                                href={route('invoices.create', { do_id: deliveryOrder.id })}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Generate Invoice
                            </Link>
                        )}
                        <a
                            href={route('delivery-orders.pdf', deliveryOrder.id)}
                            target="_blank"
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                            Download PDF
                        </a>
                    </div>
                </div>
            }
        >
            <Head title={`DO: ${deliveryOrder.do_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header Information */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">DO Information</h3>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-500">DO Number:</span>
                                            <span className="font-semibold col-span-2">{deliveryOrder.do_number}</span>
                                        </div>
                                        <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-500">Status:</span>
                                            <span className="col-span-2">{getStatusBadge(deliveryOrder.status)}</span>
                                        </div>
                                        <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-500">Delivery Date:</span>
                                            <span className="font-semibold col-span-2">
                                                {new Date(deliveryOrder.delivery_date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-500">PO Reference:</span>
                                            <span className="font-semibold col-span-2">
                                                {deliveryOrder.purchase_order ? (
                                                    <Link href={route('purchase-orders.show', deliveryOrder.purchase_order.id)} className="text-blue-600 hover:underline">
                                                        {deliveryOrder.purchase_order.po_number}
                                                    </Link>
                                                ) : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-500">Name:</span>
                                            <span className="font-semibold col-span-2">{deliveryOrder.customer?.name}</span>
                                        </div>
                                        {deliveryOrder.customer?.company_name && (
                                            <div className="grid grid-cols-3">
                                                <span className="text-sm text-gray-500">Company:</span>
                                                <span className="font-semibold col-span-2">{deliveryOrder.customer.company_name}</span>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-500">Address:</span>
                                            <span className="col-span-2 text-gray-700">{deliveryOrder.customer?.address || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Items to Deliver</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU Code</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Amount (Est.)</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Amount (Est.)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {deliveryOrder.items?.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.sku?.sku_code}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    <div className="font-medium">{item.sku?.name}</div>
                                                    <div className="text-xs text-gray-500">{item.sku?.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                                                    RM {parseFloat(item.unit_price).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                                                    RM {parseFloat(item.total_price).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-right font-semibold text-gray-700">Total Value (Est):</td>
                                            <td className="px-6 py-4 text-right font-bold text-gray-900">
                                                RM {calculateTotal().toFixed(2)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {deliveryOrder.notes && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Notes</h3>
                                <div className="bg-gray-50 p-4 rounded-md text-gray-700">
                                    {deliveryOrder.notes}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
