"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const stats = [
    { value: "8+", en: "Systems Delivered", bm: "Sistem Dihantar" },
    { value: "100%", en: "In-House Built", bm: "Dibina Sendiri" },
    { value: "RM 0", en: "Platform Fee", bm: "Platform Fee" },
    { value: "24/7", en: "WA Support", bm: "Sokongan WA" },
];

export function StatsBar() {
    const { lang } = useLang();

    return (
        <div className="border-y border-white/5 bg-white/[0.02] py-8">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/5">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.value}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center px-6"
                        >
                            <div className="font-outfit font-bold text-3xl text-primary mb-1">{stat.value}</div>
                            <div className="text-slate-400 text-sm">{lang === 'en' ? stat.en : stat.bm}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
