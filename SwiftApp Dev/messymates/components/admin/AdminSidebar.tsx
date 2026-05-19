'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { LayoutDashboard, Users, CalendarDays, Layers, ShoppingBag, CreditCard, BarChart3, MessageSquare, Settings, LogOut } from 'lucide-react'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/admin/programs', label: 'Programs', icon: Layers },
  { href: '/admin/products', label: 'Products', icon: ShoppingBag },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col min-h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="font-extrabold text-xl tracking-tight">
            <span className="text-[#ef4444]">M</span>
            <span className="text-[#3b82f6]">e</span>
            <span className="text-[#ef4444]">s</span>
            <span className="text-[#eab308]">s</span>
            <span className="text-[#ef4444]">y</span>
            <span className="text-[#3b82f6]">M</span>
            <span className="text-[#ef4444]">a</span>
            <span className="text-[#eab308]">t</span>
            <span className="text-[#ef4444]">e</span>
            <span className="text-[#3b82f6]">s</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-2 flex flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                active
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={16} className={active ? "text-teal-600" : "text-gray-400"} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-gray-500 hover:bg-gray-50 w-full transition-colors"
        >
          <LogOut size={16} className="text-gray-400" />
          Logout
        </button>
      </div>
    </aside>
  )
}
