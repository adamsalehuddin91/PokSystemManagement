"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Car, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useLang } from "@/context/LangContext";

function ProgressBar({ label, value, color = "emerald" }: { label: string; value: number; color?: string }) {
    const colorMap: Record<string, string> = {
        emerald: "bg-emerald-500",
        amber: "bg-amber-500",
        blue: "bg-blue-500",
    };
    return (
        <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>{label}</span>
                <span className="text-white font-medium">{value}%</span>
            </div>
            <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colorMap[color] ?? colorMap.emerald} rounded-full`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

export function HeroSection() {
    const { lang } = useLang();

    const t = {
        badge: lang === 'en' ? '8 Systems · 1 Team · 100% Local Support' : '8 Sistem · 1 Pasukan · Sokongan Tempatan',
        h1a: lang === 'en' ? 'Digital Systems' : 'Sistem Digital',
        h1b: lang === 'en' ? 'Built for Malaysian' : 'Untuk Bisnes',
        h1c: lang === 'en' ? 'Business' : 'Malaysia',
        sub: lang === 'en'
            ? 'From childcare to car rentals — we build it in 2–4 weeks, then support it directly via WhatsApp.'
            : 'Dari taska hingga kereta sewa — kami bina dalam 2–4 minggu, kemudian kami support terus melalui WhatsApp.',
        cta1: lang === 'en' ? 'Start Free Demo' : 'Cuba Demo Percuma',
        cta2: lang === 'en' ? 'View Products' : 'Lihat Produk',
        liveLabel: 'Live',
        demoLabel: 'Demo ↗',
        statsKids: lang === 'en' ? 'Active Kids' : 'Murid Aktif',
        statsFees: lang === 'en' ? 'Fees Collected' : 'Yuran Kutip',
        attendance: lang === 'en' ? "Today's Attendance" : 'Kehadiran Hari Ini',
        activities: lang === 'en' ? 'Activities Done' : 'Aktiviti Selesai',
        vehicleLabel: lang === 'en' ? '12 Vehicles · 3 Rented' : '12 Kereta · 3 Disewa',
        studentLabel: lang === 'en' ? '340 Students · Term 2' : '340 Pelajar · Term 2',
    };

    return (
        <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* LEFT — Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-6"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium w-fit"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            {t.badge}
                        </motion.div>

                        {/* Headline */}
                        <h1 className="font-outfit text-5xl md:text-6xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
                            <span className="block text-glow text-primary">{t.h1a}</span>
                            <span className="block">{t.h1b}</span>
                            <span className="block">{t.h1c}</span>
                        </h1>

                        <p className="text-lg text-slate-300 max-w-lg leading-relaxed font-light">
                            {t.sub}
                        </p>

                        {/* Trust points */}
                        <div className="flex flex-col gap-2">
                            {[
                                lang === 'en' ? '2–4 week delivery' : 'Siap dalam 2–4 minggu',
                                lang === 'en' ? 'No platform fee — you own your data' : 'Tiada platform fee — data milik anda',
                                lang === 'en' ? 'WhatsApp support direct with developer' : 'WA support terus dengan developer',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link
                                href="#contact"
                                className="group inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all box-glow"
                            >
                                {t.cta1}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#products"
                                className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-slate-300 rounded-xl border border-white/10 hover:border-white/25 hover:text-white transition-all"
                            >
                                {t.cta2}
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT — Dashboard Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="relative flex flex-col gap-4 lg:pl-4"
                    >
                        {/* Main card */}
                        <motion.div
                            className="animate-float bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl"
                        >
                            {/* Card header */}
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <Users className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <span className="font-semibold text-white text-sm font-outfit">SwiftTaska</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        {t.liveLabel}
                                    </span>
                                    <a
                                        href="https://taska.swiftapps.my"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[11px] text-slate-400 hover:text-primary transition-colors"
                                    >
                                        {t.demoLabel}
                                    </a>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-slate-900/60 rounded-xl p-3">
                                    <div className="text-[11px] text-slate-400 mb-1">{t.statsKids}</div>
                                    <div className="text-2xl font-bold text-white font-outfit">247</div>
                                </div>
                                <div className="bg-slate-900/60 rounded-xl p-3">
                                    <div className="text-[11px] text-slate-400 mb-1">{t.statsFees}</div>
                                    <div className="text-2xl font-bold text-white font-outfit">RM 14,200</div>
                                </div>
                            </div>

                            {/* Progress bars */}
                            <div className="flex flex-col gap-3">
                                <ProgressBar label={t.attendance} value={78} color="emerald" />
                                <ProgressBar label={t.activities} value={83} color="amber" />
                            </div>
                        </motion.div>

                        {/* Two smaller cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                className="animate-float-delayed bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                        <Car className="w-3 h-3 text-amber-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-white font-outfit">SwiftFleet</span>
                                </div>
                                <div className="text-[11px] text-slate-400">{t.vehicleLabel}</div>
                                <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full w-1/4 bg-amber-500 rounded-full" />
                                </div>
                            </motion.div>

                            <motion.div
                                className="animate-float bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl"
                                style={{ animationDelay: '0.8s' }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <TrendingUp className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-white font-outfit">SwiftSchool</span>
                                </div>
                                <div className="text-[11px] text-slate-400">{t.studentLabel}</div>
                                <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full w-4/5 bg-blue-500 rounded-full" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Subtle glow behind cards */}
                        <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl -z-10 pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
