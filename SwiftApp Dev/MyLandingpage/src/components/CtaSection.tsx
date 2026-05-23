"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLang } from "@/context/LangContext";

export function CtaSection() {
    const { lang } = useLang();

    return (
        <section className="py-24 relative z-10 overflow-hidden">
            {/* Glow bg */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,150,105,0.08)_0%,transparent_65%)]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-slate-800/50 border border-white/10 p-10 md:p-14 text-center shadow-2xl"
                >
                    <h2 className="font-outfit font-bold text-3xl md:text-5xl text-white mb-4 leading-tight">
                        {lang === 'en' ? 'Ready to Digitise Your Business?' : 'Bersedia nak Digitalkan Bisnes Anda?'}
                    </h2>
                    <p className="text-slate-300 text-lg mb-2 max-w-xl mx-auto">
                        {lang === 'en'
                            ? 'Try any system free for 30 days. No credit card. No long contracts.'
                            : 'Cuba mana-mana sistem percuma selama 30 hari. Tiada kredit kad. Tiada kontrak panjang.'}
                    </p>
                    <p className="text-slate-500 text-sm mb-10">
                        {lang === 'en'
                            ? 'We reply within 1 hour during business hours.'
                            : 'Kami balas dalam masa 1 jam semasa waktu pejabat.'}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="#contact"
                            className="group inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all box-glow text-base"
                        >
                            {lang === 'en' ? 'Start Free Demo' : 'Cuba Demo Percuma'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="https://wa.me/60132094577"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-slate-300 rounded-xl border border-white/15 hover:border-white/30 hover:text-white transition-all text-base"
                        >
                            <MessageCircle className="w-5 h-5" />
                            {lang === 'en' ? 'WhatsApp Us' : 'WhatsApp Kami'}
                        </a>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500">
                        <span>📞 +60 13-209 4577</span>
                        <span className="hidden sm:block">·</span>
                        <span>✉ admin@swiftapps.my</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
