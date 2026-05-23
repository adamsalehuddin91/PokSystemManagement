"use client";

import { motion } from "framer-motion";
import { User, Cpu } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
    return (
        <section id="about" className="py-24 relative z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Profile Card (Glassmorphism) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center"
                    >
                        <div className="relative group perspective-1000">
                            {/* Decorative glow behind card */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-indigo-500/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                            <div className="relative w-full max-w-80 h-[400px] glass-card rounded-2xl p-6 flex flex-col justify-end overflow-hidden transform transition-all duration-500 hover:rotate-y-6 hover:-translate-y-2">
                                {/* Photo */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/profile.jpg"
                                        alt="Sahdan - Full-Stack Developer & Software Architect"
                                        fill
                                        className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                        sizes="(max-width: 768px) 100vw, 320px"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>

                                {/* Abstract tech details on card */}
                                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[10px] text-primary font-mono flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                    Architect Mode
                                </div>

                                <div className="relative z-20">
                                    <h3 className="text-2xl font-outfit font-bold text-white mb-1">Sahdan</h3>
                                    <p className="text-primary text-sm font-medium tracking-wide">Full-Stack Developer & Architect</p>

                                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                                        <span>Experience: 2+ Years</span>
                                        <Cpu className="w-4 h-4 text-slate-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/20 text-primary w-fit text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            The Architect
                        </div>

                        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white">
                            About Me
                        </h2>

                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light">
                            <p>
                                I am a <strong className="text-white font-medium">Full-Stack Developer</strong> & <strong className="text-white font-medium">Software Architect</strong>. My focus is on building result-oriented systems without unnecessary long preambles.
                            </p>

                            <p>
                                As an <strong>Architect</strong>, I am not just a &apos;coder&apos;. I prioritize <em>scalability</em>, <span className="text-primary">clean code</span>, and <em>long-term maintenance</em> to ensure your software empire is ready for the future.
                            </p>
                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}
