"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { useLang } from "@/context/LangContext";

type BillingCycle = 'monthly' | 'annual';

interface Tier {
    name: string;
    setup: number;
    monthly: number;
    popular?: boolean;
    features: { en: string; bm: string }[];
}

interface System {
    id: string;
    name: string;
    en: string;
    bm: string;
    tiers: Tier[];
}

const systems: System[] = [
    {
        id: 'swifttaska', name: 'SwiftTaska',
        en: 'Childcare', bm: 'Taska',
        tiers: [
            {
                name: 'Basic', setup: 2500, monthly: 150,
                features: [
                    { en: '≤ 3 staff', bm: '≤ 3 staf' },
                    { en: '1 branch', bm: '1 cawangan' },
                    { en: 'Attendance + fees', bm: 'Kehadiran + yuran' },
                    { en: 'Parent portal', bm: 'Portal ibu bapa' },
                ],
            },
            {
                name: 'Standard', setup: 3500, monthly: 200, popular: true,
                features: [
                    { en: '≤ 8 staff', bm: '≤ 8 staf' },
                    { en: '3 branches', bm: '3 cawangan' },
                    { en: 'WA fee reminders', bm: 'Peringatan yuran WA' },
                    { en: 'PDF reports (JKM)', bm: 'Laporan PDF (JKM)' },
                    { en: 'Activity log', bm: 'Log aktiviti' },
                ],
            },
            {
                name: 'Premium', setup: 5500, monthly: 280,
                features: [
                    { en: 'Unlimited staff', bm: 'Staf tanpa had' },
                    { en: 'Unlimited branches', bm: 'Cawangan tanpa had' },
                    { en: 'Custom domain', bm: 'Domain sendiri' },
                    { en: 'Telegram bot', bm: 'Bot Telegram' },
                    { en: 'Priority support', bm: 'Sokongan prioriti' },
                ],
            },
        ],
    },
    {
        id: 'swiftfleet', name: 'SwiftFleet',
        en: 'Car Rental', bm: 'Kereta Sewa',
        tiers: [
            {
                name: 'Basic', setup: 2500, monthly: 150,
                features: [
                    { en: '≤ 5 vehicles', bm: '≤ 5 kereta' },
                    { en: 'Booking management', bm: 'Pengurusan booking' },
                    { en: 'Deposit tracking', bm: 'Jejak deposit' },
                    { en: 'Customer blacklist', bm: 'Blacklist pelanggan' },
                ],
            },
            {
                name: 'Standard', setup: 3500, monthly: 220, popular: true,
                features: [
                    { en: '≤ 15 vehicles', bm: '≤ 15 kereta' },
                    { en: 'WA booking confirm', bm: 'Konfirmasi booking WA' },
                    { en: 'Damage reports', bm: 'Laporan kerosakan' },
                    { en: 'Return calculation', bm: 'Kiraan pulangan' },
                    { en: 'Fleet reports', bm: 'Laporan fleet' },
                ],
            },
            {
                name: 'Premium', setup: 5500, monthly: 350,
                features: [
                    { en: 'Unlimited vehicles', bm: 'Kereta tanpa had' },
                    { en: 'Multi-operator', bm: 'Multi-operator' },
                    { en: 'Road tax reminder', bm: 'Peringatan cukai jalan' },
                    { en: 'Custom domain', bm: 'Domain sendiri' },
                    { en: 'Priority support', bm: 'Sokongan prioriti' },
                ],
            },
        ],
    },
    {
        id: 'swiftschool', name: 'SwiftSchool',
        en: 'School', bm: 'Sekolah',
        tiers: [
            {
                name: 'Basic', setup: 2500, monthly: 250,
                features: [
                    { en: '≤ 100 students', bm: '≤ 100 pelajar' },
                    { en: 'Attendance + marks', bm: 'Kehadiran + markah' },
                    { en: 'Fee collection', bm: 'Kutipan yuran' },
                    { en: 'Teacher access', bm: 'Akses guru' },
                ],
            },
            {
                name: 'Standard', setup: 3500, monthly: 320, popular: true,
                features: [
                    { en: '≤ 400 students', bm: '≤ 400 pelajar' },
                    { en: 'Results & report cards', bm: 'Keputusan & kad laporan' },
                    { en: 'WA fee reminders', bm: 'Peringatan yuran WA' },
                    { en: 'PDF reports', bm: 'Laporan PDF' },
                    { en: 'Parent portal', bm: 'Portal ibu bapa' },
                ],
            },
            {
                name: 'Premium', setup: 5500, monthly: 450,
                features: [
                    { en: 'Unlimited students', bm: 'Pelajar tanpa had' },
                    { en: 'Multi-class / stream', bm: 'Multi-kelas / aliran' },
                    { en: 'Custom domain', bm: 'Domain sendiri' },
                    { en: 'Exam analytics', bm: 'Analitik peperiksaan' },
                    { en: 'Priority support', bm: 'Sokongan prioriti' },
                ],
            },
        ],
    },
    {
        id: 'swiftsalon', name: 'SwiftSalon',
        en: 'Salon & Spa', bm: 'Salon & Spa',
        tiers: [
            {
                name: 'Basic', setup: 2500, monthly: 150,
                features: [
                    { en: '≤ 3 staff', bm: '≤ 3 staf' },
                    { en: 'Appointment booking', bm: 'Tempahan temujanji' },
                    { en: 'Basic POS', bm: 'POS asas' },
                    { en: 'Receipt generation', bm: 'Jana resit' },
                ],
            },
            {
                name: 'Standard', setup: 3500, monthly: 200, popular: true,
                features: [
                    { en: '≤ 8 staff', bm: '≤ 8 staf' },
                    { en: 'Staff commission', bm: 'Komisen staf' },
                    { en: 'Customer history', bm: 'Sejarah pelanggan' },
                    { en: 'WA appointment reminder', bm: 'Peringatan temujanji WA' },
                    { en: 'Sales reports', bm: 'Laporan jualan' },
                ],
            },
            {
                name: 'Premium', setup: 5500, monthly: 280,
                features: [
                    { en: 'Unlimited staff', bm: 'Staf tanpa had' },
                    { en: 'Loyalty points system', bm: 'Sistem mata kesetiaan' },
                    { en: 'Online booking portal', bm: 'Portal tempahan online' },
                    { en: 'Custom domain', bm: 'Domain sendiri' },
                    { en: 'Priority support', bm: 'Sokongan prioriti' },
                ],
            },
        ],
    },
    {
        id: 'swiftmoney', name: 'SwiftMoney',
        en: 'Accounting', bm: 'Perakaunan',
        tiers: [
            {
                name: 'Basic', setup: 2000, monthly: 120,
                features: [
                    { en: '1 user', bm: '1 pengguna' },
                    { en: 'Invoice + receipt', bm: 'Invois + resit' },
                    { en: 'Expense tracking', bm: 'Jejak perbelanjaan' },
                    { en: 'Monthly report', bm: 'Laporan bulanan' },
                ],
            },
            {
                name: 'Standard', setup: 3000, monthly: 180, popular: true,
                features: [
                    { en: '≤ 5 users', bm: '≤ 5 pengguna' },
                    { en: 'PDF invoice + email', bm: 'Invois PDF + email' },
                    { en: 'Tax summary', bm: 'Ringkasan cukai' },
                    { en: 'Client management', bm: 'Pengurusan klien' },
                    { en: 'P&L report', bm: 'Laporan P&L' },
                ],
            },
            {
                name: 'Premium', setup: 4500, monthly: 250,
                features: [
                    { en: 'Unlimited users', bm: 'Pengguna tanpa had' },
                    { en: 'Multi-company', bm: 'Multi-syarikat' },
                    { en: 'Custom domain', bm: 'Domain sendiri' },
                    { en: 'Accountant access', bm: 'Akses akauntan' },
                    { en: 'Priority support', bm: 'Sokongan prioriti' },
                ],
            },
        ],
    },
];

function TierCard({ tier, cycle, lang }: { tier: Tier; cycle: BillingCycle; lang: 'en' | 'bm' }) {
    const monthlyDisplay = cycle === 'annual' ? Math.round(tier.monthly * 10 / 12) : tier.monthly;
    const annualDisplay = tier.monthly * 10;

    return (
        <div className={`relative flex flex-col p-5 rounded-2xl border transition-all ${
            tier.popular
                ? 'bg-primary/10 border-primary/50 shadow-lg shadow-primary/10'
                : 'bg-slate-800/40 border-white/8 hover:border-white/15'
        }`}>
            {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary rounded-full text-white text-[11px] font-bold tracking-wide uppercase whitespace-nowrap">
                    {lang === 'en' ? 'Most Popular' : 'Paling Popular'}
                </div>
            )}

            <div className="mb-4">
                <h4 className="font-outfit font-bold text-white text-lg">{tier.name}</h4>
                <div className="mt-1 text-xs text-slate-400">
                    {lang === 'en' ? 'Setup fee' : 'Bayaran setup'}:{' '}
                    <span className="text-white font-semibold">RM {tier.setup.toLocaleString()}</span>
                </div>
            </div>

            <div className="mb-4 pb-4 border-b border-white/8">
                <div className="flex items-end gap-1">
                    <span className="font-outfit font-bold text-white text-3xl">RM {monthlyDisplay}</span>
                    <span className="text-slate-400 text-sm mb-1">/mo</span>
                </div>
                {cycle === 'annual' && (
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-slate-500 text-xs line-through">RM {tier.monthly * 12}/yr</span>
                        <span className="text-xs text-primary font-semibold">
                            {lang === 'en' ? `Save RM ${tier.monthly * 2}` : `Jimat RM ${tier.monthly * 2}`}
                        </span>
                    </div>
                )}
                {cycle === 'annual' && (
                    <div className="text-[11px] text-slate-500 mt-0.5">
                        {lang === 'en' ? `RM ${annualDisplay}/year billed annually` : `RM ${annualDisplay}/tahun bil tahunan`}
                    </div>
                )}
            </div>

            <ul className="flex flex-col gap-2 mb-6 flex-grow">
                {tier.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        {lang === 'en' ? f.en : f.bm}
                    </li>
                ))}
            </ul>

            <Link
                href="#contact"
                className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    tier.popular
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'border border-white/15 text-slate-300 hover:border-white/30 hover:text-white'
                }`}
            >
                {lang === 'en' ? 'Get Started' : 'Mulakan'}
            </Link>
        </div>
    );
}

export function PricingSection() {
    const { lang } = useLang();
    const [activeSystem, setActiveSystem] = useState('swifttaska');
    const [cycle, setCycle] = useState<BillingCycle>('monthly');

    const current = systems.find(s => s.id === activeSystem) ?? systems[0];

    return (
        <section id="pricing" className="py-24 relative z-10 bg-slate-900/20 border-y border-white/5">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">

                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4"
                    >
                        {lang === 'en' ? 'Simple, Transparent Pricing' : 'Harga Mudah & Telus'}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-lg mx-auto"
                    >
                        {lang === 'en'
                            ? 'Each system is priced for its complexity. Pick your system, pick your plan.'
                            : 'Setiap sistem dihargai mengikut kompleksitinya. Pilih sistem, pilih pakej.'}
                    </motion.p>
                </div>

                {/* Payment structure */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 p-5 rounded-2xl bg-slate-800/30 border border-white/5 max-w-2xl mx-auto">
                    <div className="text-center px-4">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{lang === 'en' ? 'Step 1' : 'Langkah 1'}</div>
                        <div className="text-white font-semibold text-sm">{lang === 'en' ? '50% Deposit' : '50% Deposit'}</div>
                        <div className="text-xs text-slate-400">{lang === 'en' ? 'Before we begin' : 'Sebelum mula'}</div>
                    </div>
                    <div className="text-slate-600 text-xl hidden sm:block">→</div>
                    <div className="text-center px-4">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{lang === 'en' ? 'Step 2' : 'Langkah 2'}</div>
                        <div className="text-white font-semibold text-sm">{lang === 'en' ? '30% on Handoff' : '30% Serah Sistem'}</div>
                        <div className="text-xs text-slate-400">{lang === 'en' ? 'Before UAT' : 'Sebelum UAT'}</div>
                    </div>
                    <div className="text-slate-600 text-xl hidden sm:block">→</div>
                    <div className="text-center px-4">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{lang === 'en' ? 'Step 3' : 'Langkah 3'}</div>
                        <div className="text-white font-semibold text-sm">{lang === 'en' ? '20% upon Live' : '20% Bila Live'}</div>
                        <div className="text-xs text-slate-400">{lang === 'en' ? 'After training' : 'Selepas training'}</div>
                    </div>
                </div>

                {/* System tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
                    {systems.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSystem(s.id)}
                            className={`relative shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                activeSystem === s.id
                                    ? 'bg-primary/15 text-primary border border-primary/30'
                                    : 'text-slate-400 border border-white/8 hover:text-white hover:border-white/15'
                            }`}
                        >
                            {s.name}
                            {activeSystem === s.id && (
                                <motion.div
                                    layoutId="tabUnderline"
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Billing toggle */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <span className={`text-sm font-medium ${cycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>
                        {lang === 'en' ? 'Monthly' : 'Bulanan'}
                    </span>
                    <button
                        onClick={() => setCycle(c => c === 'monthly' ? 'annual' : 'monthly')}
                        className={`relative w-12 h-6 rounded-full border transition-colors ${
                            cycle === 'annual' ? 'bg-primary border-primary' : 'bg-slate-700 border-slate-600'
                        }`}
                    >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            cycle === 'annual' ? 'translate-x-6' : ''
                        }`} />
                    </button>
                    <span className={`text-sm font-medium flex items-center gap-2 ${cycle === 'annual' ? 'text-white' : 'text-slate-500'}`}>
                        {lang === 'en' ? 'Annual' : 'Tahunan'}
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-[11px] font-bold rounded-full animate-pulse">
                            {lang === 'en' ? 'Save 2 months!' : 'Jimat 2 bulan!'}
                        </span>
                    </span>
                </div>

                {/* Tier cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSystem}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto"
                    >
                        {current.tiers.map(tier => (
                            <TierCard key={tier.name} tier={tier} cycle={cycle} lang={lang} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                <p className="text-center text-slate-500 text-xs mt-8">
                    {lang === 'en'
                        ? 'Prices are estimates. Exact quotation sent after project brief discussion.'
                        : 'Harga adalah anggaran. Quotation tepat dihantar selepas perbincangan brief projek.'}
                </p>
            </div>
        </section>
    );
}
