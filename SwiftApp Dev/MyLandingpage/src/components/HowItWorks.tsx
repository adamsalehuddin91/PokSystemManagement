"use client";

import { motion } from "framer-motion";
import { MessageSquare, Paintbrush, Code2, Rocket } from "lucide-react";
import { useLang } from "@/context/LangContext";

const steps = [
    {
        icon: MessageSquare,
        iconBg: 'bg-blue-500/15',
        iconColor: 'text-blue-400',
        duration: { en: '1–3 days', bm: '1–3 hari' },
        en: { title: 'Brief', body: 'WhatsApp or meeting. We understand your business workflow before writing a single line of code.' },
        bm: { title: 'Brief', body: 'WhatsApp atau mesyuarat. Kami faham workflow bisnes anda sebelum mula bina apa-apa.' },
    },
    {
        icon: Paintbrush,
        iconBg: 'bg-violet-500/15',
        iconColor: 'text-violet-400',
        duration: { en: '3–5 days', bm: '3–5 hari' },
        en: { title: 'Design', body: 'Wireframes and mockups sent for your approval. 2 rounds of revision included.' },
        bm: { title: 'Reka Bentuk', body: 'Wireframe dan mockup dihantar untuk kelulusan anda. 2 pusingan semakan disertakan.' },
    },
    {
        icon: Code2,
        iconBg: 'bg-emerald-500/15',
        iconColor: 'text-emerald-400',
        duration: { en: '1–2 weeks', bm: '1–2 minggu' },
        en: { title: 'Build & Test', body: 'Full development + UAT walkthrough together. We fix issues before you go live.' },
        bm: { title: 'Bina & Uji', body: 'Pembangunan penuh + walkthrough UAT bersama. Kami betulkan isu sebelum anda live.' },
    },
    {
        icon: Rocket,
        iconBg: 'bg-amber-500/15',
        iconColor: 'text-amber-400',
        duration: { en: '1 day + 30-day support', bm: '1 hari + sokongan 30 hari' },
        en: { title: 'Launch', body: 'Deploy to your server, 1-on-1 training session, and 30 days free support via WhatsApp.' },
        bm: { title: 'Lancar', body: 'Deploy ke server anda, sesi latihan 1-on-1, dan 30 hari sokongan percuma melalui WhatsApp.' },
    },
];

export function HowItWorks() {
    const { lang } = useLang();

    return (
        <section id="how-it-works" className="py-24 relative z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center mb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4"
                    >
                        {lang === 'en' ? 'From Idea to Live — 4 Steps' : 'Dari Idea Ke Live — 4 Langkah'}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-lg mx-auto"
                    >
                        {lang === 'en'
                            ? 'No surprises. No delays. Most systems go live in 2–4 weeks.'
                            : 'Tiada kejutan. Tiada kelewatan. Kebanyakan sistem live dalam 2–4 minggu.'}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 relative">
                    {/* Connector line desktop */}
                    <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        const content = step[lang];
                        return (
                            <motion.div
                                key={step.en.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                className="relative flex flex-col items-center text-center gap-4"
                            >
                                {/* Step number + icon */}
                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-white/8 ${step.iconBg} shadow-lg`}>
                                        <Icon className={`w-7 h-7 ${step.iconColor}`} />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                        {i + 1}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                                        {lang === 'en' ? step.duration.en : step.duration.bm}
                                    </div>
                                    <h3 className="font-outfit font-bold text-white mb-2">{content.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{content.body}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Total timeline badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-10"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 text-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {lang === 'en' ? 'Total: 2–4 Weeks to Go Live' : 'Jumlah: 2–4 Minggu Hingga Live'}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
