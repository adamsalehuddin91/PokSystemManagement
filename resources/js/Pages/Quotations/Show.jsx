import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, quotation }) {
    const getStatusBadge = (status) => {
        const badges = {
            draft: 'bg-gray-100 text-gray-800',
            sent: 'bg-blue-100 text-blue-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            converted: 'bg-purple-100 text-purple-800',
        };
        return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${badges[status]}`}>{status.toUpperCase()}</span>;
    };

    const handleStatusChange = (newStatus) => {
        if (confirm(`Change status to "${newStatus}"?`)) {
            router.patch(route('quotations.status', quotation.id), { status: newStatus });
        }
    };

    const handleConvert = () => {
        if (confirm('Convert this quotation to Invoice? All items will be copied automatically.')) {
            router.post(route('quotations.convert', quotation.id));
        }
    };

    const handleDelete = () => {
        if (confirm('Delete this draft quotation?')) {
            router.delete(route('quotations.destroy', quotation.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Quotation: {quotation.quotation_number}
                    </h2>
                    <div className="flex gap-2">
                        <a
                            href={route('quotations.pdf', quotation.id)}
                            target="_blank"
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                        >
                            PDF
                        </a>
                        {['draft', 'sent'].includes(quotation.status) && (
                            <Link
                                href={route('quotations.edit', quotation.id)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                            >
                                Edit
                            </Link>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={`Quotation: ${quotation.quotation_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Quotation Info */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Date Created:</span>
                                            <span>{new Date(quotation.created_at).toLocaleDateString()}</span>
                                        </div>
                                        {quotation.valid_until && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Valid Until:</span>
                                                <span>{new Date(quotation.valid_until).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Status:</span>
                                            {getStatusBadge(quotation.status)}
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Show Date on PDF:</span>
                                            <span>{quotation.show_date_on_pdf ? 'Yes' : 'No'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Amount:</span>
                                            <span className="font-bold text-lg">RM {parseFloat(quotation.total_amount).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Customer</h3>
                                    <p className="font-semibold">{quotation.customer?.name}</p>
                                    <p className="text-gray-600">{quotation.customer?.company_name}</p>
                                    <p className="text-gray-600">{quotation.customer?.email}</p>
                                    <p className="text-gray-600">{quotation.customer?.phone}</p>
                                </div>
                            </div>

                            {quotation.notes && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                    <span className="text-sm font-medium text-gray-500">Notes:</span>
                                    <p className="text-sm text-gray-700 mt-1">{quotation.notes}</p>
                                </div>
                            )}

                            {/* Converted Invoice Link */}
                            {quotation.converted_invoice && (
                                <div className="mt-4 p-3 bg-purple-50 border-l-4 border-purple-400 rounded-md">
                                    <p className="text-sm text-purple-700">
                                        Converted to Invoice:{' '}
                                        <Link
                                            href={route('invoices.show', quotation.converted_invoice.id)}
                                            className="font-bold underline hover:text-purple-900"
                                        >
                                            {quotation.converted_invoice.invoice_number}
                                        </Link>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Line Items</h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {quotation.items?.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{item.sku?.name}</div>
                                                {item.description && (
                                                    <div className="text-xs text-gray-500">{item.description}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm">{item.quantity}</td>
                                            <td className="px-6 py-4 text-right text-sm">RM {parseFloat(item.unit_price).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right text-sm font-semibold">RM {parseFloat(item.total_price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t">
                                        <td colSpan="3" className="px-6 py-3 text-right text-sm text-gray-600">Subtotal:</td>
                                        <td className="px-6 py-3 text-right text-sm font-semibold">RM {parseFloat(quotation.subtotal).toFixed(2)}</td>
                                    </tr>
                                    {parseFloat(quotation.tax_amount) > 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-1 text-right text-sm text-gray-600">Tax:</td>
                                            <td className="px-6 py-1 text-right text-sm">RM {parseFloat(quotation.tax_amount).toFixed(2)}</td>
                                        </tr>
                                    )}
                                    <tr className="border-t-2">
                                        <td colSpan="3" className="px-6 py-3 text-right text-lg font-bold">Total:</td>
                                        <td className="px-6 py-3 text-right text-lg font-bold">RM {parseFloat(quotation.total_amount).toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Actions */}
                    {quotation.status !== 'converted' && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                                <div className="flex flex-wrap gap-3">
                                    {quotation.status === 'draft' && (
                                        <button
                                            onClick={() => handleStatusChange('sent')}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            Mark as Sent
                                        </button>
                                    )}
                                    {['draft', 'sent'].includes(quotation.status) && (
                                        <button
                                            onClick={() => handleStatusChange('accepted')}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                        >
                                            Mark as Accepted
                                        </button>
                                    )}
                                    {['draft', 'sent'].includes(quotation.status) && (
                                        <button
                                            onClick={() => handleStatusChange('rejected')}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Mark as Rejected
                                        </button>
                                    )}
                                    {quotation.status === 'accepted' && (
                                        <button
                                            onClick={handleConvert}
                                            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-bold text-lg"
                                        >
                                            Convert to Invoice
                                        </button>
                                    )}
                                    {quotation.status === 'draft' && (
                                        <button
                                            onClick={handleDelete}
                                            className="px-4 py-2 bg-gray-200 text-red-600 rounded-md hover:bg-gray-300"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
