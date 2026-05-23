import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
            <div className="text-center">
                <h1 className="text-7xl font-outfit font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl font-outfit font-bold text-white mb-4">Page Not Found</h2>
                <p className="text-slate-400 mb-8">The page you are looking for does not exist.</p>
                <Link
                    href="/"
                    className="px-6 py-3 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary/60 text-white font-medium transition-all"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
