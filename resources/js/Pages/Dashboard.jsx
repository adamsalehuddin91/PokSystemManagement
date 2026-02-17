import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, finance, inventory, actions }) {
    const colorMap = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        red: 'bg-red-500',
        yellow: 'bg-yellow-500',
        orange: 'bg-orange-500',
    };

    const StatCard = ({ title, value, subtext, color = "blue", link, linkText }) => (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className={`h-12 w-1 rounded-md ${colorMap[color] || 'bg-blue-500'}`}></div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
                            <dd>
                                <div className="text-lg font-medium text-gray-900">{value}</div>
                            </dd>
                            {subtext && <dd className="text-xs text-gray-400">{subtext}</dd>}
                        </dl>
                    </div>
                </div>
            </div>
            {link && (
                <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                        <Link href={link} className="font-medium text-cyan-700 hover:text-cyan-900">
                            {linkText || 'View all'}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Finance Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Financial Overview (This Month)</h3>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <StatCard
                                title="Net Profit"
                                value={`RM ${finance.net_profit.toLocaleString()}`}
                                color={finance.net_profit >= 0 ? 'green' : 'red'}
                                link={route('finance.profit-loss')}
                                linkText="View P&L Report"
                            />
                            <StatCard
                                title="Total Revenue"
                                value={`RM ${finance.revenue.toLocaleString()}`}
                                color="green"
                            />
                            <StatCard
                                title="Total Expenses"
                                value={`RM ${finance.expenses.toLocaleString()}`}
                                color="red"
                                link={route('finance.transactions')}
                                linkText="View Transactions"
                            />
                        </div>
                    </div>

                    {/* Action Needed Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Action Needed</h3>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <StatCard
                                title="Pending Purchase Orders"
                                value={actions.pending_pos}
                                subtext="Waiting for approval"
                                color="yellow"
                                link={route('purchase-orders.index')}
                            />
                            <StatCard
                                title="Unpaid Invoices"
                                value={actions.unpaid_invoices}
                                subtext="Partially or fully unpaid"
                                color="orange"
                                link={route('invoices.index')}
                            />
                            <StatCard
                                title="Low Stock Items"
                                value={inventory.low_stock}
                                subtext="Below reorder point"
                                color="red"
                                link={route('inventory.index')}
                            />
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <Link href={route('purchase-orders.create')} className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 text-center">
                                <span className="text-sm font-medium text-gray-700">New Purchase Order</span>
                            </Link>
                            <Link href={route('delivery-orders.create')} className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 text-center">
                                <span className="text-sm font-medium text-gray-700">New Delivery Order</span>
                            </Link>
                            <Link href={route('invoices.create')} className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 text-center">
                                <span className="text-sm font-medium text-gray-700">New Invoice</span>
                            </Link>
                            <Link href={route('inventory.create')} className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 text-center">
                                <span className="text-sm font-medium text-gray-700">Add New SKU</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
