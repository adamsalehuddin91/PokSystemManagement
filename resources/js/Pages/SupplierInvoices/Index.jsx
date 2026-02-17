import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, supplierInvoices, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('supplier-invoices.index'), { search, status: statusFilter }, { preserveState: true });
    };

    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
        router.get(route('supplier-invoices.index'), { search, status: e.target.value }, { preserveState: true });
    };

    const getStatusBadge = (status) => {
        const badges = {
            draft: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-green-100 text-green-800',
        };
        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${badges[status] || 'bg-gray-100'}`}>
                {status.toUpperCase()}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Supplier Invoices</h2>}
        >
            <Head title="Supplier Invoices" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                                <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search SI number, supplier ref, supplier..."
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
                                    />
                                    <select
                                        value={statusFilter}
                                        onChange={handleFilterChange}
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All Status</option>
                                        <option value="draft">Draft</option>
                                        <option value="confirmed">Confirmed</option>
                                    </select>
                                    <button type="submit" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                                        Search
                                    </button>
                                </form>

                                <Link
                                    href={route('supplier-invoices.create')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full md:w-auto text-center"
                                >
                                    + New Supplier Invoice
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SI Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier Ref</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO Ref</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {supplierInvoices.data?.length > 0 ? (
                                            supplierInvoices.data.map((si) => (
                                                <tr key={si.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {si.supplier_invoice_number}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {si.supplier_ref_number || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {si.supplier?.company_name || si.supplier?.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {si.purchase_order ? (
                                                            <Link href={route('purchase-orders.show', si.purchase_order.id)} className="text-blue-600 hover:text-blue-900">
                                                                {si.purchase_order.po_number}
                                                            </Link>
                                                        ) : <span className="text-gray-400">-</span>}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                        RM {parseFloat(si.total_amount).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(si.invoice_date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {getStatusBadge(si.status)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route('supplier-invoices.show', si.id)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                                    No supplier invoices found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {supplierInvoices.links && (
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Showing {supplierInvoices.from} to {supplierInvoices.to} of {supplierInvoices.total} results
                                    </div>
                                    <div className="flex gap-1">
                                        {supplierInvoices.links.map((link) => (
                                            <Link
                                                key={link.label}
                                                href={link.url || '#'}
                                                className={`px-3 py-1 rounded text-sm ${link.active
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
