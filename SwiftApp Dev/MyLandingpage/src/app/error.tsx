"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
            <div className="text-center">
                <h2 className="text-2xl font-outfit font-bold text-white mb-4">Something went wrong</h2>
                <p className="text-slate-400 mb-6">An unexpected error occurred. Please try again.</p>
                <button
                    onClick={reset}
                    className="px-6 py-3 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary/60 text-white font-medium transition-all"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
