import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ProfitLoss({ auth, report, filters }) {
    const [startDate, setStartDate] = useState(filters.start_date);
    const [endDate, setEndDate] = useState(filters.end_date);

    const formatCurrency = (amount) => {
        return `RM ${parseFloat(amount).toFixed(2)}`;
    };

    const formatPercentage = (value) => {
        return `${parseFloat(value).toFixed(2)}%`;
    };

    const handleFilter = () => {
        window.location.href = route('finance.profit-loss', { start_date: startDate, end_date: endDate });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profit & Loss Report</h2>}
        >
            <Head title="P&L Report" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Date Filter */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                onClick={handleFilter}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Generate Report
                            </button>
                        </div>
                    </div>

                    {/* P&L Statement */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Profit & Loss Statement</h3>
                                <p className="text-gray-500">
                                    Period: {new Date(report.period.start).toLocaleDateString()} - {new Date(report.period.end).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* Revenue */}
                                <div className="border-b pb-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">Revenue</span>
                                        <span className="text-lg font-bold text-green-600">
                                            {formatCurrency(report.revenue)}
                                        </span>
                                    </div>
                                </div>

                                {/* COGS */}
                                <div className="border-b pb-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">Cost of Goods Sold (COGS)</span>
                                        <span className="text-lg font-bold text-red-600">
                                            ({formatCurrency(report.cogs)})
                                        </span>
                                    </div>
                                </div>

                                {/* Gross Profit */}
                                <div className="bg-blue-50 p-4 rounded-md">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="text-xl font-bold">Gross Profit</span>
                                            <p className="text-sm text-gray-600">
                                                Margin: {formatPercentage(report.gross_profit_margin)}
                                            </p>
                                        </div>
                                        <span className={`text-2xl font-bold ${report.gross_profit >= 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {formatCurrency(report.gross_profit)}
                                        </span>
                                    </div>
                                </div>

                                {/* Expenses */}
                                <div className="mt-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-lg font-semibold">Operating Expenses</span>
                                        <span className="text-lg font-bold text-red-600">
                                            ({formatCurrency(report.expenses)})
                                        </span>
                                    </div>

                                    {Object.keys(report.expenses_by_category).length > 0 && (
                                        <div className="ml-6 space-y-2">
                                            {Object.entries(report.expenses_by_category).map(([category, amount]) => (
                                                <div key={category} className="flex justify-between text-sm">
                                                    <span className="text-gray-600 capitalize">{category.replace('_', ' ')}</span>
                                                    <span className="text-gray-900">{formatCurrency(amount)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Net Profit */}
                                <div className="bg-green-50 p-4 rounded-md border-2 border-green-200 mt-6">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="text-2xl font-bold">Net Profit</span>
                                            <p className="text-sm text-gray-600">
                                                Margin: {formatPercentage(report.net_profit_margin)}
                                            </p>
                                        </div>
                                        <span className={`text-3xl font-bold ${report.net_profit >= 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {formatCurrency(report.net_profit)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-3">
                                <Link
                                    href={route('finance.index')}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    Back to Dashboard
                                </Link>
                                <a
                                    href={route('finance.profit-loss.pdf', { start_date: startDate, end_date: endDate })}
                                    target="_blank"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Download PDF
                                </a>
                                <button
                                    onClick={() => window.print()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Print View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
