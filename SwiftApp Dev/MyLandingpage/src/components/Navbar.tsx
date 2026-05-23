"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Layers, X, Menu } from "lucide-react";
import { useLang } from "@/context/LangContext";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { lang, setLang } = useLang();

    const navLinks = [
        { href: "#products", en: "Products", bm: "Produk" },
        { href: "#pricing", en: "Pricing", bm: "Harga" },
        { href: "#why-us", en: "Why Us", bm: "Kenapa Kami" },
        { href: "#how-it-works", en: "How It Works", bm: "Cara Kerja" },
        { href: "#contact", en: "Contact", bm: "Hubungi" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-slate-950/80 backdrop-blur-md border-b border-white/5"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-300">
                            <Layers className="text-primary w-4.5 h-4.5" size={18} />
                        </div>
                        <span className="font-outfit font-bold text-xl tracking-wide text-white">
                            Swift<span className="text-primary">Apps</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="hover:text-white transition-colors hover:text-primary"
                            >
                                {lang === 'en' ? link.en : link.bm}
                            </Link>
                        ))}
                    </nav>

                    {/* Right: Lang toggle + CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Language Toggle */}
                        <div className="flex items-center rounded-lg border border-white/10 overflow-hidden text-xs font-semibold">
                            <button
                                onClick={() => setLang('en')}
                                className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-primary/20 text-primary' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLang('bm')}
                                className={`px-3 py-1.5 transition-colors ${lang === 'bm' ? 'bg-primary/20 text-primary' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                BM
                            </button>
                        </div>
                        {/* CTA */}
                        <Link
                            href="#contact"
                            className="px-4 py-2 bg-primary rounded-lg text-white text-sm font-semibold hover:bg-primary/90 transition-all box-glow"
                        >
                            {lang === 'en' ? 'Talk to Us' : 'Hubungi Kami'}
                        </Link>
                    </div>

                    {/* Mobile: lang + hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        <div className="flex items-center rounded-lg border border-white/10 overflow-hidden text-xs font-semibold">
                            <button
                                onClick={() => setLang('en')}
                                className={`px-2.5 py-1.5 transition-colors ${lang === 'en' ? 'bg-primary/20 text-primary' : 'text-slate-500'}`}
                            >EN</button>
                            <button
                                onClick={() => setLang('bm')}
                                className={`px-2.5 py-1.5 transition-colors ${lang === 'bm' ? 'bg-primary/20 text-primary' : 'text-slate-500'}`}
                            >BM</button>
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-4 h-4 text-white/80" /> : <Menu className="w-4 h-4 text-white/80" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-[69px] left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-white/5 md:hidden"
                    >
                        <nav className="flex flex-col px-6 py-4 gap-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-300 hover:text-primary hover:bg-white/5 px-4 py-3 rounded-lg transition-colors text-sm font-medium"
                                >
                                    {lang === 'en' ? link.en : link.bm}
                                </Link>
                            ))}
                            <Link
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-2 px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm font-semibold text-center"
                            >
                                {lang === 'en' ? 'Talk to Us' : 'Hubungi Kami'}
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
