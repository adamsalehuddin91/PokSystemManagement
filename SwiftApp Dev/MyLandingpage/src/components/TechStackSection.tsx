"use client";

import { motion } from "framer-motion";
import { Server, Layout, Database, Cloud } from "lucide-react";

export function TechStackSection() {
    const stackItems = [
        {
            category: "Core Engineering",
            icon: <Server className="w-5 h-5" />,
            title: "Laravel 12 & Next.js 16",
            desc: "Modern Monolith & Decoupled Architecture. Bleeding-edge frameworks.",
        },
        {
            category: "Modern Frontend",
            icon: <Layout className="w-5 h-5" />,
            title: "React 19 & Inertia.js",
            desc: "Server Components and seamless SPA experiences.",
        },
        {
            category: "Data Orchestration",
            icon: <Database className="w-5 h-5" />,
            title: "PostgreSQL & Supabase",
            desc: "Transaction Mode/Pooling for SaaS & Multi-Tenancy.",
        },
        {
            category: "DevOps & Cloud",
            icon: <Cloud className="w-5 h-5" />,
            title: "Hetzner & Coolify (PaaS)",
            desc: "Self-hosted strategies for full infrastructure control.",
        },
    ];

    return (
        <section id="tech-stack" className="py-24 relative z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-6">
                            Solid Software Architecture
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed mb-10 font-light">
                            Your system doesn&apos;t just work; it is built with the latest industry standards. Designed for <span className="text-primary font-medium">zero technical debt</span>.
                        </p>

                        <div className="space-y-8">
                            {stackItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-800/50 border border-white/10 flex items-center justify-center text-primary">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                                        <p className="text-slate-400 mt-1 font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Visual Tech Stack Diagram */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full flex items-center justify-center"
                    >
                        {/* Center Glow */}
                        <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

                        {/* Diagram Container */}
                        <div className="relative w-full max-w-sm lg:max-w-md aspect-square flex items-center justify-center">

                            {/* Outer dashed ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 50, ease: "linear", repeat: Infinity }}
                                className="absolute inset-4 sm:inset-8 border border-white/5 rounded-full border-dashed"
                            />

                            {/* Inner solid ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                                className="absolute inset-16 sm:inset-20 border border-primary/20 rounded-full"
                            />

                            {/* Center Node */}
                            <div className="relative z-20 w-28 h-28 rounded-full bg-slate-900 border border-primary/50 shadow-[0_0_40px_rgba(56,189,248,0.4)] flex flex-col items-center justify-center">
                                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                                <Server className="w-8 h-8 text-white mb-2" />
                                <span className="font-mono text-xs font-bold text-primary tracking-widest">SYSTEM</span>
                            </div>

                            {/* Orbiting Tech Nodes */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                                className="absolute inset-0"
                            >
                                {/* Next.js Node */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                                        className="w-20 h-20 rounded-2xl glass-card flex flex-col items-center justify-center shadow-lg border-white/20 relative group"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]"></span>
                                        </div>
                                        <span className="text-xs font-medium text-white">Next.js</span>
                                    </motion.div>
                                </div>

                                {/* Postgres Node */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30">
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                                        className="w-20 h-20 rounded-2xl glass-card flex flex-col items-center justify-center shadow-lg border-blue-500/20 relative group hover:border-blue-500/50 transition-colors"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]"></span>
                                        </div>
                                        <span className="text-xs font-medium text-white">Postgres</span>
                                    </motion.div>
                                </div>

                                {/* Laravel Node */}
                                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                                        className="w-20 h-20 rounded-2xl glass-card flex flex-col items-center justify-center shadow-lg border-red-500/20 relative group hover:border-red-500/50 transition-colors"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
                                        </div>
                                        <span className="text-xs font-medium text-white">Laravel</span>
                                    </motion.div>
                                </div>

                                {/* React 19 Node */}
                                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-30">
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                                        className="w-20 h-20 rounded-2xl glass-card flex flex-col items-center justify-center shadow-lg border-sky-400/20 relative group hover:border-sky-400/50 transition-colors"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-sky-400/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]"></span>
                                        </div>
                                        <span className="text-xs font-medium text-white">React 19</span>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Additional floating particles */}
                            <motion.div
                                animate={{ rotate: -180 }}
                                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                                className="absolute inset-10 z-10 pointer-events-none"
                            >
                                <div className="absolute top-0 right-1/4 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"></div>
                                <div className="absolute bottom-1/4 left-0 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_#818cf8]"></div>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
