import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "SwiftApps | Digital Systems for Malaysian Business",
    description: "Custom digital systems for Malaysian SMEs — childcare, car rental, school, salon, accounting and more. Built fast, supported direct.",
    keywords: ["sistem digital malaysia", "software SME malaysia", "SwiftTaska", "SwiftFleet", "SwiftSchool", "taska system", "kereta sewa system", "SwiftApps"],
    authors: [{ name: "SwiftApps", url: "https://swiftapps.my" }],
    metadataBase: new URL("https://swiftapps.my"),
    openGraph: {
        title: "SwiftApps | Digital Systems for Malaysian Business",
        description: "Custom digital systems for Malaysian SMEs. From childcare to car rentals — we build it, we support it.",
        url: "https://swiftapps.my",
        siteName: "SwiftApps",
        locale: "en_MY",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SwiftApps | Digital Systems for Malaysian Business",
        description: "Custom digital systems for Malaysian SMEs. From childcare to car rentals — we build it, we support it.",
    },
    robots: { index: true, follow: true },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen antialiased bg-[#020617] text-slate-200 selection:bg-primary/30 selection:text-primary-foreground`}>
                {/* Background Ambient Glows */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/15 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob"></div>
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-600/15 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob" style={{ animationDelay: "2s" }}></div>
                    <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-800/10 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob" style={{ animationDelay: "4s" }}></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-100"></div>
                </div>

                <LangProvider>
                    <main className="relative flex min-h-screen flex-col">
                        {children}
                    </main>
                </LangProvider>
            </body>
        </html>
    );
}
