"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Globe, Smartphone, MessageCircle, Settings } from "lucide-react";
import { useLang } from "@/context/LangContext";

const pillars = [
    {
        icon: Zap,
        iconBg: 'bg-amber-500/15',
        iconColor: 'text-amber-400',
        en: { title: '2–4 Week Delivery', body: 'From brief to live in 2–4 weeks. No months-long waiting or endless revisions.' },
        bm: { title: 'Siap 2–4 Minggu', body: 'Dari brief hingga live dalam 2–4 minggu. Tiada tunggu berbulan-bulan.' },
    },
    {
        icon: Shield,
        iconBg: 'bg-emerald-500/15',
        iconColor: 'text-emerald-400',
        en: { title: 'Secure Hosting', body: 'Hetzner EU datacenter, 99.9% uptime, daily backup and free SSL certificate.' },
        bm: { title: 'Hosting Selamat', body: 'Hetzner EU datacenter, 99.9% uptime, backup harian dan SSL percuma.' },
    },
    {
        icon: Globe,
        iconBg: 'bg-blue-500/15',
        iconColor: 'text-blue-400',
        en: { title: 'Full EN + BM', body: 'UI, support and documentation available in both English and Bahasa Malaysia.' },
        bm: { title: 'Penuh EN + BM', body: 'UI, sokongan dan dokumentasi tersedia dalam Bahasa Malaysia dan Inggeris.' },
    },
    {
        icon: Smartphone,
        iconBg: 'bg-violet-500/15',
        iconColor: 'text-violet-400',
        en: { title: 'Mobile Ready', body: 'PWA — install on phone without App Store. Works offline for core features.' },
        bm: { title: 'Mesra Mobile', body: 'PWA — install kat telefon tanpa App Store. Fungsi utama boleh guna offline.' },
    },
    {
        icon: MessageCircle,
        iconBg: 'bg-teal-500/15',
        iconColor: 'text-teal-400',
        en: { title: 'Direct WA Support', body: 'WhatsApp the developer directly. No ticket systems, no bots, no waiting queue.' },
        bm: { title: 'Sokongan WA Terus', body: 'WhatsApp terus dengan developer. Tiada sistem tiket, tiada bot, tiada giliran.' },
    },
    {
        icon: Settings,
        iconBg: 'bg-orange-500/15',
        iconColor: 'text-orange-400',
        en: { title: 'Fully Customisable', body: 'Your logo, your colours, your domain. Features tailored to your business workflow.' },
        bm: { title: 'Sepenuhnya Disesuaikan', body: 'Logo anda, warna anda, domain anda. Fitur mengikut keperluan bisnes anda.' },
    },
];

export function WhySwiftApps() {
    const { lang } = useLang();

    return (
        <section id="why-us" className="py-24 relative z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center mb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4"
                    >
                        {lang === 'en' ? 'Why Choose SwiftApps?' : 'Kenapa Pilih SwiftApps?'}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-xl mx-auto"
                    >
                        {lang === 'en'
                            ? "Not just software. Your technical partner."
                            : "Bukan sekadar software. Partner teknikal anda."}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pillars.map((pillar, i) => {
                        const Icon = pillar.icon;
                        const content = pillar[lang];
                        return (
                            <motion.div
                                key={pillar.en.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="flex flex-col gap-3 p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-colors"
                            >
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${pillar.iconBg}`}>
                                    <Icon className={`w-5 h-5 ${pillar.iconColor}`} />
                                </div>
                                <div>
                                    <h3 className="font-outfit font-bold text-white mb-1">{content.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{content.body}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
