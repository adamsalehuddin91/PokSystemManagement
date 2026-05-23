"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Baby, Car, GraduationCap, Scissors, Wallet, Truck, ShoppingCart, LayoutDashboard } from "lucide-react";
import { useLang } from "@/context/LangContext";

type ProductStatus = 'live' | 'beta' | 'soon';

interface Product {
    id: string;
    name: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    borderHover: string;
    shadowHover: string;
    status: ProductStatus;
    demoUrl: string;
    priceFrom: string;
    en: { type: string; desc: string; features: string[] };
    bm: { type: string; desc: string; features: string[] };
}

const products: Product[] = [
    {
        id: 'swifttaska',
        name: 'SwiftTaska',
        icon: Baby,
        iconBg: 'bg-emerald-500/15',
        iconColor: 'text-emerald-400',
        borderHover: 'hover:border-emerald-500/40',
        shadowHover: 'hover:shadow-emerald-950/50',
        status: 'live',
        demoUrl: 'https://taska.swiftapps.my',
        priceFrom: 'RM 150/mo',
        en: {
            type: 'Childcare Management',
            desc: 'Complete childcare system — attendance, fee collection, parent portal, and Telegram bot check-in.',
            features: ['Attendance + parent app', 'Fee & receipt management', 'PDF reports for JKM'],
        },
        bm: {
            type: 'Pengurusan Taska',
            desc: 'Sistem taska lengkap — kehadiran, kutipan yuran, portal ibu bapa dan bot Telegram daftar masuk.',
            features: ['Kehadiran + app ibu bapa', 'Yuran & resit digital', 'Laporan PDF untuk JKM'],
        },
    },
    {
        id: 'swiftfleet',
        name: 'SwiftFleet',
        icon: Car,
        iconBg: 'bg-amber-500/15',
        iconColor: 'text-amber-400',
        borderHover: 'hover:border-amber-500/40',
        shadowHover: 'hover:shadow-amber-950/50',
        status: 'beta',
        demoUrl: '#contact',
        priceFrom: 'RM 150/mo',
        en: {
            type: 'Car Rental Management',
            desc: 'Fleet management for SME car rental operators. Real-time availability, deposits, blacklist by IC.',
            features: ['Booking + deposit tracking', 'Customer blacklist (IC)', 'Return & damage calculation'],
        },
        bm: {
            type: 'Pengurusan Kereta Sewa',
            desc: 'Sistem fleet untuk operator kereta sewa SME. Availability real-time, deposit dan blacklist mengikut IC.',
            features: ['Booking + jejak deposit', 'Blacklist pelanggan (IC)', 'Kiraan pulang & kerosakan'],
        },
    },
    {
        id: 'swiftschool',
        name: 'SwiftSchool',
        icon: GraduationCap,
        iconBg: 'bg-blue-500/15',
        iconColor: 'text-blue-400',
        borderHover: 'hover:border-blue-500/40',
        shadowHover: 'hover:shadow-blue-950/50',
        status: 'live',
        demoUrl: 'https://sritialfattah.swiftapps.my',
        priceFrom: 'RM 250/mo',
        en: {
            type: 'School Management',
            desc: 'School system for religious and private institutions — marks, attendance, fees and student records.',
            features: ['Student marks & attendance', 'Fee collection + receipts', 'Teacher & admin access'],
        },
        bm: {
            type: 'Sistem Sekolah',
            desc: 'Sistem sekolah untuk institusi agama & swasta — markah, kehadiran, yuran dan rekod pelajar.',
            features: ['Markah & kehadiran pelajar', 'Kutipan yuran + resit', 'Akses guru & pentadbir'],
        },
    },
    {
        id: 'swiftsalon',
        name: 'SwiftSalon',
        icon: Scissors,
        iconBg: 'bg-pink-500/15',
        iconColor: 'text-pink-400',
        borderHover: 'hover:border-pink-500/40',
        shadowHover: 'hover:shadow-pink-950/50',
        status: 'live',
        demoUrl: '#contact',
        priceFrom: 'RM 150/mo',
        en: {
            type: 'Salon & Spa Management',
            desc: 'Appointment booking, POS, staff commissions and customer loyalty — all in one system.',
            features: ['Online appointment booking', 'POS + staff commission', 'Customer loyalty tracking'],
        },
        bm: {
            type: 'Pengurusan Salon & Spa',
            desc: 'Tempahan temujanji, POS, komisen staf dan kesetiaan pelanggan — semua dalam satu sistem.',
            features: ['Tempahan temujanji online', 'POS + komisen staf', 'Jejak kesetiaan pelanggan'],
        },
    },
    {
        id: 'swiftmoney',
        name: 'SwiftMoney',
        icon: Wallet,
        iconBg: 'bg-teal-500/15',
        iconColor: 'text-teal-400',
        borderHover: 'hover:border-teal-500/40',
        shadowHover: 'hover:shadow-teal-950/50',
        status: 'live',
        demoUrl: 'https://money.swiftapps.my',
        priceFrom: 'RM 120/mo',
        en: {
            type: 'Accounting & Invoicing',
            desc: 'Simplified accounting for SMEs — invoices, receipts, expense tracking and financial reports.',
            features: ['PDF invoice + email receipt', 'Expense & income tracking', 'Monthly financial report'],
        },
        bm: {
            type: 'Perakaunan & Invois',
            desc: 'Perakaunan mudah untuk SME — invois, resit, jejak perbelanjaan dan laporan kewangan.',
            features: ['Invois PDF + resit email', 'Jejak pendapatan & belanja', 'Laporan kewangan bulanan'],
        },
    },
    {
        id: 'swiftlogis',
        name: 'SwiftLogis',
        icon: Truck,
        iconBg: 'bg-orange-500/15',
        iconColor: 'text-orange-400',
        borderHover: 'hover:border-orange-500/40',
        shadowHover: 'hover:shadow-orange-950/50',
        status: 'live',
        demoUrl: '#contact',
        priceFrom: 'RM 200/mo',
        en: {
            type: 'Lorry & Contractor Ops',
            desc: 'Fleet management for lorry operators and contractors — trips, revenue, maintenance and P&L.',
            features: ['Trip log + revenue tracking', 'Maintenance schedule', 'Driver & P&L reports'],
        },
        bm: {
            type: 'Operasi Lori & Kontraktor',
            desc: 'Pengurusan fleet untuk operator lori dan kontraktor — trip, pendapatan, penyelenggaraan dan P&L.',
            features: ['Log trip + jejak pendapatan', 'Jadual penyelenggaraan', 'Laporan pemandu & P&L'],
        },
    },
    {
        id: 'swiftdesk',
        name: 'SwiftDesk',
        icon: ShoppingCart,
        iconBg: 'bg-violet-500/15',
        iconColor: 'text-violet-400',
        borderHover: 'hover:border-violet-500/40',
        shadowHover: 'hover:shadow-violet-950/50',
        status: 'soon',
        demoUrl: '#contact',
        priceFrom: 'RM 150/mo',
        en: {
            type: 'POS & Stock',
            desc: 'Point-of-sale and inventory management for retail shops, mini markets and F&B businesses.',
            features: ['POS + digital receipt', 'Stock & inventory control', 'Daily sales reports'],
        },
        bm: {
            type: 'POS & Stok',
            desc: 'POS dan pengurusan stok untuk kedai runcit, mini market dan perniagaan F&B.',
            features: ['POS + resit digital', 'Kawalan stok & inventori', 'Laporan jualan harian'],
        },
    },
    {
        id: 'swiftappos',
        name: 'SwiftApp OS',
        icon: LayoutDashboard,
        iconBg: 'bg-slate-500/15',
        iconColor: 'text-slate-400',
        borderHover: 'hover:border-slate-500/40',
        shadowHover: 'hover:shadow-slate-800/50',
        status: 'live',
        demoUrl: '#contact',
        priceFrom: 'Internal',
        en: {
            type: 'Builder Dashboard',
            desc: "SwiftApps' own internal OS — project tracking, client management and billing in one place.",
            features: ['Project & client tracking', 'Invoice + payment log', 'Live portfolio management'],
        },
        bm: {
            type: 'Dashboard Pembina',
            desc: 'OS dalaman SwiftApps sendiri — jejak projek, pengurusan klien dan bil dalam satu tempat.',
            features: ['Jejak projek & klien', 'Invois + log pembayaran', 'Pengurusan portfolio live'],
        },
    },
];

const statusConfig: Record<ProductStatus, { en: string; bm: string; className: string }> = {
    live:  { en: 'Live',         bm: 'Live',         className: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' },
    beta:  { en: 'Beta',         bm: 'Beta',         className: 'bg-amber-400/10 text-amber-400 border-amber-400/20' },
    soon:  { en: 'Coming Soon',  bm: 'Akan Datang',  className: 'bg-slate-400/10 text-slate-400 border-slate-400/20' },
};

export function EcosystemSection() {
    const { lang } = useLang();

    const heading = lang === 'en'
        ? { title: 'Everything Your Business Needs', sub: 'One ecosystem. Built for Malaysian SMEs.' }
        : { title: 'Semua yang Bisnes Anda Perlukan', sub: 'Satu ekosistem. Dibina untuk SME Malaysia.' };

    return (
        <section id="products" className="py-24 relative z-10 bg-slate-900/20 border-y border-white/5">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">

                <div className="text-center mb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4"
                    >
                        {heading.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-xl mx-auto"
                    >
                        {heading.sub}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {products.map((product, index) => {
                        const Icon = product.icon;
                        const content = product[lang];
                        const badge = statusConfig[product.status];
                        const isAvailable = product.status !== 'soon';

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.07 }}
                                className={`group relative flex flex-col h-full p-5 rounded-2xl bg-slate-800/40 border border-white/8 transition-all duration-300 ${product.borderHover} hover:shadow-lg ${product.shadowHover} hover:scale-[1.02]`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${product.iconBg}`}>
                                        <Icon className={`w-5 h-5 ${product.iconColor}`} />
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${badge.className}`}>
                                        {lang === 'en' ? badge.en : badge.bm}
                                    </span>
                                </div>

                                {/* Title */}
                                <div className="mb-1">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-0.5">
                                        {content.type}
                                    </span>
                                    <h3 className="font-outfit font-bold text-white text-lg">{product.name}</h3>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">
                                    {content.desc}
                                </p>

                                {/* Features */}
                                <ul className="flex flex-col gap-1.5 mb-4">
                                    {content.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${product.iconColor.replace('text-', 'bg-')}`} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {/* Footer */}
                                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs text-slate-400">
                                        {product.priceFrom !== 'Internal'
                                            ? `${lang === 'en' ? 'From' : 'Dari'} ${product.priceFrom}`
                                            : product.priceFrom}
                                    </span>
                                    {isAvailable ? (
                                        <Link
                                            href={product.demoUrl}
                                            target={product.demoUrl.startsWith('http') ? '_blank' : undefined}
                                            rel={product.demoUrl.startsWith('http') ? 'noreferrer' : undefined}
                                            className={`text-xs font-semibold ${product.iconColor} hover:underline`}
                                        >
                                            {lang === 'en' ? 'View Demo →' : 'Lihat Demo →'}
                                        </Link>
                                    ) : (
                                        <Link href="#contact" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                                            {lang === 'en' ? 'Notify Me' : 'Maklumkan Saya'}
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
