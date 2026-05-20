'use client'
export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

function ConfirmationContent() {
  const params = useSearchParams()
  const nama = params.get('nama') || 'Tetamu'
  const checkIn = params.get('checkIn') || '-'
  const checkOut = params.get('checkOut') || '-'
  const pax = params.get('pax') || '-'

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-[32px] shadow-xl shadow-slate-100/70 p-8 md:p-12 text-center max-w-md border border-slate-100">
          <div className="text-5xl mb-5">🎉</div>
          <h1 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Pertanyaan Berjaya Dihantar!</h1>
          <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
            Terima kasih, <span className="font-bold text-slate-900">{nama}</span>!<br />
            Owner akan menghubungi anda melalui WhatsApp dalam masa 24 jam untuk pengesahan.
          </p>
          <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs font-semibold text-slate-700 space-y-2 mb-7 border border-slate-100">
            <div className="flex justify-between"><span className="text-slate-400">Penginapan</span><span>Vila Bayu Desaru</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Check-in</span><span>{checkIn}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Check-out</span><span>{checkOut}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Tetamu</span><span>{pax} orang</span></div>
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://wa.me/60123456789" target="_blank" className="w-full bg-green-500 text-white py-3 rounded-full font-bold hover:bg-green-600 transition-all text-sm">
              💬 WhatsApp Owner Terus
            </a>
            <Link href="/" className="w-full border border-slate-200 text-slate-700 py-3 rounded-full font-bold hover:bg-slate-50 transition-all text-sm">
              ← Balik ke Laman Utama
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm font-bold text-slate-400">Memuatkan...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
