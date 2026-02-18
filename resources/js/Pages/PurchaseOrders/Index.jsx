import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, purchaseOrders, suppliers, filters, summary }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('purchase-orders.index'), { search });
    };

    const getStatusBadge = (status) => {
        const badges = {
            draft: 'bg-gray-100 text-gray-800',
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            received: 'bg-blue-100 text-blue-800',
            cancelled: 'bg-red-100 text-red-800',
        };

        return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${badges[status]}`}>
            {status.toUpperCase()}
        </span>;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Purchase Orders</h2>}
        >
            <Head title="Purchase Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Total POs</div>
                            <div className="text-3xl font-bold text-gray-900">{summary.total_pos}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Pending Approval</div>
                            <div className="text-3xl font-bold text-yellow-600">{summary.pending_count}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Approved</div>
                            <div className="text-3xl font-bold text-green-600">{summary.approved_count}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Total Value</div>
                            <div className="text-3xl font-bold text-gray-900">RM {parseFloat(summary.total_value || 0).toFixed(2)}</div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Actions */}
                            <div className="flex justify-between items-center mb-6">
                                <form onSubmit={handleSearch} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search PO number..."
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                    >
                                        Search
                                    </button>
                                </form>

                                <Link
                                    href={route('purchase-orders.create')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    + Create Purchase Order
                                </Link>
                            </div>

                            {/* PO Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                PO Number
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Supplier
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Items
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Total Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {purchaseOrders.data.map((po) => (
                                            <tr key={po.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {po.po_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {po.supplier?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {po.items?.length || 0} items
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                    RM {parseFloat(po.total_amount).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {getStatusBadge(po.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(po.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('purchase-orders.show', po.id)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        View
                                                    </Link>
                                                    {['draft', 'pending'].includes(po.status) && (
                                                        <Link
                                                            href={route('purchase-orders.edit', po.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {purchaseOrders.links && (
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Showing {purchaseOrders.from} to {purchaseOrders.to} of {purchaseOrders.total} results
                                    </div>
                                    <div className="flex gap-1">
                                        {purchaseOrders.links.map((link) => (
                                            <Link
                                                key={link.label}
                                                href={link.url || '#'}
                                                className={`px-3 py-1 rounded ${link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
