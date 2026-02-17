import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, summary, monthlyTrend }) {
    const formatCurrency = (amount) => {
        return `RM ${parseFloat(amount).toFixed(2)}`;
    };

    const formatPercentage = (value) => {
        return `${parseFloat(value).toFixed(2)}%`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Finance Dashboard</h2>}
        >
            <Head title="Finance" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Current Month Summary */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Current Month Performance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div className="text-gray-500 text-sm">Revenue</div>
                                <div className="text-3xl font-bold text-green-600">
                                    {formatCurrency(summary.current_month.revenue)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Margin: {formatPercentage(summary.current_month.gross_profit_margin)}
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div className="text-gray-500 text-sm">COGS</div>
                                <div className="text-3xl font-bold text-orange-600">
                                    {formatCurrency(summary.current_month.cogs)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Cost of Goods Sold</div>
                            </div>

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div className="text-gray-500 text-sm">Expenses</div>
                                <div className="text-3xl font-bold text-red-600">
                                    {formatCurrency(summary.current_month.expenses)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Operating Expenses</div>
                            </div>

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div className="text-gray-500 text-sm">Net Profit</div>
                                <div className={`text-3xl font-bold ${summary.current_month.net_profit >= 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {formatCurrency(summary.current_month.net_profit)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Margin: {formatPercentage(summary.current_month.net_profit_margin)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Year to Date */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Year to Date (YTD)</h3>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <div className="text-gray-500 text-sm">Total Revenue</div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {formatCurrency(summary.ytd.revenue)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm">Total COGS</div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {formatCurrency(summary.ytd.cogs)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm">Total Expenses</div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {formatCurrency(summary.ytd.expenses)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm">Net Profit</div>
                                    <div className={`text-2xl font-bold ${summary.ytd.net_profit >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {formatCurrency(summary.ytd.net_profit)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Trend */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">6-Month Trend</h3>
                            <Link
                                href={route('finance.profit-loss')}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                View Detailed P&L Report →
                            </Link>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Month
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                Revenue
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                Expenses
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                Profit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {monthlyTrend.map((month, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {month.month}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
                                                    {formatCurrency(month.revenue)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">
                                                    {formatCurrency(month.expenses)}
                                                </td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${month.profit >= 0 ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                    {formatCurrency(month.profit)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                                href={route('finance.profit-loss')}
                                className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 hover:bg-gray-50 transition"
                            >
                                <div className="text-lg font-semibold text-gray-900">P&L Report</div>
                                <div className="text-sm text-gray-500 mt-1">View detailed profit & loss statement</div>
                            </Link>

                            <Link
                                href={route('finance.transactions')}
                                className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 hover:bg-gray-50 transition"
                            >
                                <div className="text-lg font-semibold text-gray-900">Transactions</div>
                                <div className="text-sm text-gray-500 mt-1">
                                    View all transactions ({summary.total_transactions} total)
                                </div>
                            </Link>

                            <Link
                                href={route('inventory.index')}
                                className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 hover:bg-gray-50 transition"
                            >
                                <div className="text-lg font-semibold text-gray-900">Inventory</div>
                                <div className="text-sm text-gray-500 mt-1">Manage stock and SKUs</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
