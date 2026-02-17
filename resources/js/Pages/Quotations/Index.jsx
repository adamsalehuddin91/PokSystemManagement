import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, quotations, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('quotations.index'), { search, status: statusFilter }, { preserveState: true });
    };

    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
        router.get(route('quotations.index'), { search, status: e.target.value }, { preserveState: true });
    };

    const getStatusBadge = (status) => {
        const badges = {
            draft: 'bg-gray-100 text-gray-800',
            sent: 'bg-blue-100 text-blue-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            converted: 'bg-purple-100 text-purple-800',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quotations</h2>}
        >
            <Head title="Quotations" />

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
                                        placeholder="Search QUO number or customer..."
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
                                    />
                                    <select
                                        value={statusFilter}
                                        onChange={handleFilterChange}
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All Status</option>
                                        <option value="draft">Draft</option>
                                        <option value="sent">Sent</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="converted">Converted</option>
                                    </select>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                    >
                                        Search
                                    </button>
                                </form>

                                <Link
                                    href={route('quotations.create')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full md:w-auto text-center"
                                >
                                    + Create Quotation
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">QUO Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {quotations.data?.length > 0 ? (
                                            quotations.data.map((quo) => (
                                                <tr key={quo.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {quo.quotation_number}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div>{quo.customer?.name}</div>
                                                        {quo.customer?.company_name && (
                                                            <div className="text-xs text-gray-500">{quo.customer.company_name}</div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                        RM {parseFloat(quo.total_amount).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {quo.valid_until ? new Date(quo.valid_until).toLocaleDateString() : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {getStatusBadge(quo.status)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route('quotations.show', quo.id)}
                                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                                        >
                                                            View
                                                        </Link>
                                                        {['draft', 'sent'].includes(quo.status) && (
                                                            <Link
                                                                href={route('quotations.edit', quo.id)}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                            >
                                                                Edit
                                                            </Link>
                                                        )}
                                                        <a href={route('quotations.pdf', quo.id)} target="_blank" className="text-gray-600 hover:text-gray-900">
                                                            PDF
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                    No quotations found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {quotations.links && (
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Showing {quotations.from} to {quotations.to} of {quotations.total} results
                                    </div>
                                    <div className="flex gap-1">
                                        {quotations.links.map((link) => (
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
