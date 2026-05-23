"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import { useLang } from "@/context/LangContext";

const products = [
    { name: 'SwiftTaska', href: 'https://taska.swiftapps.my' },
    { name: 'SwiftFleet', href: '#contact' },
    { name: 'SwiftSchool', href: 'https://sritialfattah.swiftapps.my' },
    { name: 'SwiftSalon', href: '#contact' },
    { name: 'SwiftMoney', href: 'https://money.swiftapps.my' },
    { name: 'SwiftLogis', href: '#contact' },
];

export default function FooterSection() {
    const { lang } = useLang();

    return (
        <footer className="border-t border-white/5 bg-slate-900/60">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Layers size={16} className="text-primary" />
                            </div>
                            <span className="font-outfit font-bold text-white">Swift<span className="text-primary">Apps</span></span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {lang === 'en'
                                ? 'Digital systems for Malaysian SMEs.'
                                : 'Sistem digital untuk SME Malaysia.'}
                        </p>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="font-semibold text-white text-sm mb-3">
                            {lang === 'en' ? 'Products' : 'Produk'}
                        </h4>
                        <ul className="flex flex-col gap-2">
                            {products.map(p => (
                                <li key={p.name}>
                                    <Link
                                        href={p.href}
                                        className="text-sm text-slate-400 hover:text-primary transition-colors"
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-white text-sm mb-3">
                            {lang === 'en' ? 'Company' : 'Syarikat'}
                        </h4>
                        <ul className="flex flex-col gap-2">
                            {[
                                { en: 'About Us', bm: 'Tentang Kami', href: '#why-us' },
                                { en: 'How It Works', bm: 'Cara Kerja', href: '#how-it-works' },
                                { en: 'Pricing', bm: 'Harga', href: '#pricing' },
                                { en: 'Contact', bm: 'Hubungi', href: '#contact' },
                            ].map(item => (
                                <li key={item.en}>
                                    <Link href={item.href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                                        {lang === 'en' ? item.en : item.bm}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white text-sm mb-3">
                            {lang === 'en' ? 'Contact' : 'Hubungi'}
                        </h4>
                        <ul className="flex flex-col gap-2">
                            <li className="text-sm text-slate-400">📞 +60 13-209 4577</li>
                            <li>
                                <a href="mailto:admin@swiftapps.my" className="text-sm text-slate-400 hover:text-primary transition-colors">
                                    ✉ admin@swiftapps.my
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/60132094577" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-primary transition-colors">
                                    💬 WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                    <span>
                        © {new Date().getFullYear()} SwiftApps.{' '}
                        {lang === 'en' ? 'Built with ♥ in Malaysia.' : 'Dibina dengan ♥ di Malaysia.'}
                    </span>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-slate-300 transition-colors">Facebook</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
