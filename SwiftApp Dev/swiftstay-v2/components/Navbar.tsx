'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-slate-900 text-lg tracking-tight">
          🏠 SwiftStay
        </Link>
        <Link
          href="/admin/login"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded-full hover:border-slate-400 transition-all"
        >
          Owner Login
        </Link>
      </div>
    </nav>
  )
}
