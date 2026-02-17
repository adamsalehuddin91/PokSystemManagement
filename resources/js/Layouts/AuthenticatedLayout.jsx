import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [showSalesDropdown, setShowSalesDropdown] = useState(false);
    const [showPurchasingDropdown, setShowPurchasingDropdown] = useState(false);
    const [showMobileSales, setShowMobileSales] = useState(false);
    const [showMobilePurchasing, setShowMobilePurchasing] = useState(false);
    const salesRef = useRef(null);
    const purchasingRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (salesRef.current && !salesRef.current.contains(e.target)) {
                setShowSalesDropdown(false);
            }
            if (purchasingRef.current && !purchasingRef.current.contains(e.target)) {
                setShowPurchasingDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isSalesActive = route().current('quotations.*') || route().current('invoices.*');
    const isPurchasingActive = route().current('purchase-orders.*') || route().current('supplier-invoices.*');

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('inventory.index')}
                                    active={route().current('inventory.*')}
                                >
                                    Inventory
                                </NavLink>
                                <div className="relative" ref={purchasingRef}>
                                    <button
                                        type="button"
                                        onClick={() => setShowPurchasingDropdown(!showPurchasingDropdown)}
                                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
                                            isPurchasingActive
                                                ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'
                                        }`}
                                    >
                                        Purchasing
                                        <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {showPurchasingDropdown && (
                                        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                            <div className="py-1">
                                                <Link
                                                    href={route('purchase-orders.index')}
                                                    className={`block px-4 py-2 text-sm ${route().current('purchase-orders.*') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                    onClick={() => setShowPurchasingDropdown(false)}
                                                >
                                                    Purchase Orders
                                                </Link>
                                                <Link
                                                    href={route('supplier-invoices.index')}
                                                    className={`block px-4 py-2 text-sm ${route().current('supplier-invoices.*') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                    onClick={() => setShowPurchasingDropdown(false)}
                                                >
                                                    Supplier Invoices
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <NavLink
                                    href={route('delivery-orders.index')}
                                    active={route().current('delivery-orders.*')}
                                >
                                    Delivery Orders
                                </NavLink>
                                <div className="relative" ref={salesRef}>
                                    <button
                                        type="button"
                                        onClick={() => setShowSalesDropdown(!showSalesDropdown)}
                                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
                                            isSalesActive
                                                ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'
                                        }`}
                                    >
                                        Sales
                                        <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {showSalesDropdown && (
                                        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                            <div className="py-1">
                                                <Link
                                                    href={route('quotations.index')}
                                                    className={`block px-4 py-2 text-sm ${route().current('quotations.*') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                    onClick={() => setShowSalesDropdown(false)}
                                                >
                                                    Quotations
                                                </Link>
                                                <Link
                                                    href={route('invoices.index')}
                                                    className={`block px-4 py-2 text-sm ${route().current('invoices.*') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                    onClick={() => setShowSalesDropdown(false)}
                                                >
                                                    Invoices
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <NavLink
                                    href={route('suppliers.index')}
                                    active={route().current('suppliers.*')}
                                >
                                    Suppliers
                                </NavLink>
                                <NavLink
                                    href={route('customers.index')}
                                    active={route().current('customers.*')}
                                >
                                    Customers
                                </NavLink>
                                <NavLink
                                    href={route('categories.index')}
                                    active={route().current('categories.*')}
                                >
                                    Categories
                                </NavLink>
                                <NavLink
                                    href={route('finance.index')}
                                    active={route().current('finance.*')}
                                >
                                    Finance
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('inventory.index')}
                            active={route().current('inventory.*')}
                        >
                            Inventory
                        </ResponsiveNavLink>
                        <button
                            onClick={() => setShowMobilePurchasing(!showMobilePurchasing)}
                            className={`w-full flex items-center justify-between ps-3 pe-4 py-2 border-l-4 text-start text-base font-medium transition duration-150 ease-in-out ${
                                isPurchasingActive
                                    ? 'border-indigo-400 text-indigo-700 bg-indigo-50'
                                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            Purchasing
                            <svg className={`h-4 w-4 transition-transform ${showMobilePurchasing ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {showMobilePurchasing && (
                            <div className="pl-4">
                                <ResponsiveNavLink
                                    href={route('purchase-orders.index')}
                                    active={route().current('purchase-orders.*')}
                                >
                                    Purchase Orders
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('supplier-invoices.index')}
                                    active={route().current('supplier-invoices.*')}
                                >
                                    Supplier Invoices
                                </ResponsiveNavLink>
                            </div>
                        )}
                        <ResponsiveNavLink
                            href={route('delivery-orders.index')}
                            active={route().current('delivery-orders.*')}
                        >
                            Delivery Orders
                        </ResponsiveNavLink>
                        <button
                            onClick={() => setShowMobileSales(!showMobileSales)}
                            className={`w-full flex items-center justify-between ps-3 pe-4 py-2 border-l-4 text-start text-base font-medium transition duration-150 ease-in-out ${
                                isSalesActive
                                    ? 'border-indigo-400 text-indigo-700 bg-indigo-50'
                                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            Sales
                            <svg className={`h-4 w-4 transition-transform ${showMobileSales ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {showMobileSales && (
                            <div className="pl-4">
                                <ResponsiveNavLink
                                    href={route('quotations.index')}
                                    active={route().current('quotations.*')}
                                >
                                    Quotations
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('invoices.index')}
                                    active={route().current('invoices.*')}
                                >
                                    Invoices
                                </ResponsiveNavLink>
                            </div>
                        )}
                        <ResponsiveNavLink
                            href={route('suppliers.index')}
                            active={route().current('suppliers.*')}
                        >
                            Suppliers
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('customers.index')}
                            active={route().current('customers.*')}
                        >
                            Customers
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('categories.index')}
                            active={route().current('categories.*')}
                        >
                            Categories
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('finance.index')}
                            active={route().current('finance.*')}
                        >
                            Finance
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
