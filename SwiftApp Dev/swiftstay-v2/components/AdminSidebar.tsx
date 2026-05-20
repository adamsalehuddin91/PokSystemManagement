'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { label: 'Dashboard',  href: '/admin' },
  { label: 'Tempahan',   href: '/admin/bookings' },
  { label: 'Tetamu',     href: '/admin/guests' },
  { label: 'Kalendar',   href: '/admin/calendar' },
  { label: 'Unit',       href: '/admin/units' },
]

export default function AdminSidebar() {
  const path = usePathname()

  return (
    <aside className="w-52 shrink-0 border-r border-slate-100 min-h-screen bg-slate-50/50">
      <div className="p-4 border-b border-slate-100">
        <Link href="/" className="font-black text-slate-900 text-base">🏠 SwiftStay</Link>
        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Vila Bayu Desaru</p>
      </div>
      <nav className="p-3 flex flex-col gap-1">
        {nav.map(n => (
          <Link
            key={n.href}
            href={n.href}
            className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              path === n.href || (n.href !== '/admin' && path.startsWith(n.href))
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {n.label}
          </Link>
        ))}
        <div className="mt-auto pt-4 border-t border-slate-100 mt-4">
          <button className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all w-full text-left">
            Log Keluar
          </button>
        </div>
      </nav>
    </aside>
  )
}
