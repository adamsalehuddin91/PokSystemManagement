'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-orange-100/60 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="font-black text-2xl tracking-tight transition-transform duration-300 group-hover:scale-105 active:scale-95">
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

        <div className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-gray-600">
          <Link href="/#about" className="hover:text-orange-500 hover:scale-105 active:scale-95 transition-all duration-200">About Us</Link>
          <Link href="/#programs" className="hover:text-orange-500 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1">Our Programs <span className="text-[10px]">▼</span></Link>
          <Link href="/parties" className="hover:text-orange-500 hover:scale-105 active:scale-95 transition-all duration-200">Parties</Link>
          <Link href="/#shop" className="hover:text-orange-500 hover:scale-105 active:scale-95 transition-all duration-200">Shop SENSA</Link>
          <Link href="/#blog" className="hover:text-orange-500 hover:scale-105 active:scale-95 transition-all duration-200">Blog</Link>
          <Link href="/#contact" className="hover:text-orange-500 hover:scale-105 active:scale-95 transition-all duration-200">Contact</Link>
          <Link
            href="/booking"
            className="bg-pink-500 text-white px-6 py-2.5 rounded-full hover:bg-pink-600 transition-all font-bold hover:scale-[1.04] active:scale-[0.97] shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/35 duration-300"
          >
            Book a Session
          </Link>
        </div>

        <button className="md:hidden p-2 rounded-full hover:bg-orange-50 transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-orange-100/60 px-4 py-4 flex flex-col gap-4 text-sm font-semibold shadow-inner">
          <Link href="/#about" onClick={() => setOpen(false)} className="text-gray-700 hover:text-orange-500 py-1 transition-colors">About Us</Link>
          <Link href="/#programs" onClick={() => setOpen(false)} className="text-gray-700 hover:text-orange-500 py-1 transition-colors">Our Programs</Link>
          <Link href="/parties" onClick={() => setOpen(false)} className="text-gray-700 hover:text-orange-500 py-1 transition-colors">Parties</Link>
          <Link href="/#shop" onClick={() => setOpen(false)} className="text-gray-700 hover:text-orange-500 py-1 transition-colors">Shop SENSA</Link>
          <Link href="/#blog" onClick={() => setOpen(false)} className="text-gray-700 hover:text-orange-500 py-1 transition-colors">Blog</Link>
          <Link href="/#contact" onClick={() => setOpen(false)} className="text-gray-700 hover:text-orange-500 py-1 transition-colors">Contact</Link>
          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="bg-pink-500 text-white px-4 py-2.5 rounded-full text-center font-bold shadow-md shadow-pink-500/10 active:scale-95 transition-transform"
          >
            Book a Session
          </Link>
        </div>
      )}
    </nav>
  )
}
