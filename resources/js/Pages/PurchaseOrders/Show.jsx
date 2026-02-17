import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, purchaseOrder }) {
    const handleApprove = () => {
        if (confirm('Approve this Purchase Order?')) {
            router.post(route('purchase-orders.approve', purchaseOrder.id));
        }
    };

    const handleSubmit = () => {
        if (confirm('Submit this PO for approval?')) {
            router.post(route('purchase-orders.submit', purchaseOrder.id));
        }
    };

    const handleCancel = () => {
        if (confirm('Cancel this Purchase Order?')) {
            router.post(route('purchase-orders.cancel', purchaseOrder.id));
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            draft: 'bg-gray-100 text-gray-800',
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            received: 'bg-blue-100 text-blue-800',
            cancelled: 'bg-red-100 text-red-800',
        };

        return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${badges[status]}`}>
            {status.toUpperCase()}
        </span>;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Purchase Order: {purchaseOrder.po_number}
                    </h2>
                    <div className="flex gap-2">
                        {purchaseOrder.status === 'draft' && (
                            <>
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                                >
                                    Submit for Approval
                                </button>
                                <Link
                                    href={route('purchase-orders.edit', purchaseOrder.id)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Edit
                                </Link>
                            </>
                        )}
                        {purchaseOrder.status === 'pending' && (
                            <>
                                <button
                                    onClick={handleApprove}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Approve
                                </button>
                                <Link
                                    href={route('purchase-orders.edit', purchaseOrder.id)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Edit
                                </Link>
                            </>
                        )}
                        {!['cancelled', 'received'].includes(purchaseOrder.status) && (
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        )}
                        <a
                            href={route('purchase-orders.pdf', purchaseOrder.id)}
                            target="_blank"
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                            Download PDF
                        </a>
                    </div>
                </div>
            }
        >
            <Head title={`PO: ${purchaseOrder.po_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header Information */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">PO Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm text-gray-500">PO Number</label>
                                            <p className="font-semibold text-lg">{purchaseOrder.po_number}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Status</label>
                                            <p>{getStatusBadge(purchaseOrder.status)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Created Date</label>
                                            <p className="font-semibold">
                                                {new Date(purchaseOrder.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Created By</label>
                                            <p className="font-semibold">{purchaseOrder.creator?.name || '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Supplier Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm text-gray-500">Supplier Name</label>
                                            <p className="font-semibold">{purchaseOrder.supplier?.name}</p>
                                        </div>
                                        {purchaseOrder.supplier?.company_name && (
                                            <div>
                                                <label className="text-sm text-gray-500">Company</label>
                                                <p className="font-semibold">{purchaseOrder.supplier.company_name}</p>
                                            </div>
                                        )}
                                        {purchaseOrder.supplier?.email && (
                                            <div>
                                                <label className="text-sm text-gray-500">Email</label>
                                                <p className="font-semibold">{purchaseOrder.supplier.email}</p>
                                            </div>
                                        )}
                                        {purchaseOrder.supplier?.phone && (
                                            <div>
                                                <label className="text-sm text-gray-500">Phone</label>
                                                <p className="font-semibold">{purchaseOrder.supplier.phone}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {purchaseOrder.status === 'approved' && purchaseOrder.approved_at && (
                                <div className="mt-6 pt-6 border-t">
                                    <div className="bg-green-50 p-4 rounded-md">
                                        <p className="text-sm text-green-800">
                                            <strong>Approved by:</strong> {purchaseOrder.approver?.name || '-'} on{' '}
                                            {new Date(purchaseOrder.approved_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Items</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                SKU Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                Quantity
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                Unit Price
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {purchaseOrder.items?.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.sku?.sku_code}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {item.sku?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                                    RM {parseFloat(item.unit_price).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right">
                                                    RM {parseFloat(item.total_price).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-right font-semibold">
                                                Total Amount:
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-lg">
                                                RM {parseFloat(purchaseOrder.total_amount).toFixed(2)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {purchaseOrder.notes && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Notes</h3>
                                <p className="text-gray-700">{purchaseOrder.notes}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
