import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ auth, invoice }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        payment_method: 'transfer',
        amount_paid: invoice.total_amount - (invoice.receipts?.reduce((sum, r) => sum + parseFloat(r.amount_paid), 0) || 0),
        payment_date: new Date().toISOString().split('T')[0],
        notes: '',
    });

    const handlePayment = (e) => {
        e.preventDefault();
        post(route('invoices.payment', invoice.id), {
            onSuccess: () => reset(),
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            paid: 'bg-green-100 text-green-800',
            partial: 'bg-yellow-100 text-yellow-800',
            unpaid: 'bg-red-100 text-red-800',
        };
        return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${badges[status]}`}>{status.toUpperCase()}</span>;
    };

    const totalPaid = invoice.receipts?.reduce((sum, r) => sum + parseFloat(r.amount_paid), 0) || 0;
    const balanceDue = invoice.total_amount - totalPaid;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Invoice: {invoice.invoice_number}
                    </h2>
                    <a
                        href={route('invoices.pdf', invoice.id)}
                        target="_blank"
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Download PDF
                    </a>
                </div>
            }
        >
            <Head title={`Invoice: ${invoice.invoice_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Invoice Info */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between"><span className="text-gray-500">Invoice Date:</span> <span>{new Date(invoice.created_at).toLocaleDateString()}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Due Date:</span> <span className="font-semibold text-red-600">{new Date(invoice.due_date).toLocaleDateString()}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Status:</span> {getStatusBadge(invoice.payment_status)}</div>
                                        <div className="flex justify-between"><span className="text-gray-500">Total Amount:</span> <span className="font-bold">RM {parseFloat(invoice.total_amount).toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Balance Due:</span> <span className="font-bold text-red-600">RM {balanceDue.toFixed(2)}</span></div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Customer</h3>
                                    <p className="font-semibold">{invoice.customer?.name}</p>
                                    <p className="text-gray-600">{invoice.customer?.company_name}</p>
                                    <p className="text-gray-600">{invoice.customer?.email}</p>
                                </div>
                            </div>
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
                                    {invoice.items?.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{item.sku?.name}</div>
                                                <div className="text-xs text-gray-500">{item.description}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm">{item.quantity}</td>
                                            <td className="px-6 py-4 text-right text-sm">RM {parseFloat(item.unit_price).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right text-sm font-semibold">RM {parseFloat(item.total_price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Payment Form */}
                    {invoice.payment_status !== 'paid' && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Record Payment</h3>
                                <form onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.amount_paid}
                                            onChange={(e) => setData('amount_paid', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            max={balanceDue}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Method</label>
                                        <select
                                            value={data.payment_method}
                                            onChange={(e) => setData('payment_method', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="cash">Cash</option>
                                            <option value="card">Card</option>
                                            <option value="transfer">Bank Transfer</option>
                                            <option value="qr">QR Payment</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Date</label>
                                        <input
                                            type="date"
                                            value={data.payment_date}
                                            onChange={(e) => setData('payment_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                    >
                                        Record Payment
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Payment History */}
                    {invoice.receipts?.length > 0 && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                                <ul className="divide-y divide-gray-200">
                                    {invoice.receipts.map((receipt) => (
                                        <li key={receipt.id} className="py-2 flex justify-between">
                                            <div>
                                                <span className="font-medium text-gray-900">RM {parseFloat(receipt.amount_paid).toFixed(2)}</span>
                                                <span className="ml-2 text-gray-500">via {receipt.payment_method}</span>
                                            </div>
                                            <span className="text-gray-500">{new Date(receipt.payment_date).toLocaleDateString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
