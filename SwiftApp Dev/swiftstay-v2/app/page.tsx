import Link from 'next/link'
import Navbar from '@/components/Navbar'

const highlights = [
  { icon: '📶', label: 'WiFi Percuma' },
  { icon: '🚗', label: 'Parking Percuma' },
  { icon: '🏊', label: 'Kolam Renang' },
  { icon: '👨‍👩‍👧', label: 'Max 8 Pax' },
]

const pricing = [
  { label: 'Isnin – Khamis', price: 350 },
  { label: 'Jumaat – Ahad', price: 450 },
  { label: 'Cuti Umum / Peak', price: 550 },
]

const calendar = [
  true, true, false, false, true, false, false,
  true, true, true, true, true, false, false,
  true, true, true, true, false, false, true,
  true, true, true, true, false, false, true,
  true, true,
]

const days = ['Isn', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Ahad']

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-sky-50">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Homestay & Rumah Sewa
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
              Vila Bayu<br />
              <span className="text-indigo-600">Desaru</span>
            </h1>
            <p className="text-slate-500 text-base font-medium mb-8 leading-relaxed">
              Penginapan selesa untuk keluarga anda. Book terus, tanpa komisyen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/book" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-lg shadow-indigo-500/25">
                📅 Book Sekarang
              </Link>
              <a href="https://wa.me/60123456789" target="_blank" className="bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-all hover:scale-[1.03] shadow-lg shadow-green-500/20">
                💬 WhatsApp Kami
              </a>
            </div>
          </div>
          <div className="rounded-[28px] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-exterior.jpg"
              alt="Vila Bayu Desaru"
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map(h => (
            <div key={h.label} className="bg-slate-50 rounded-2xl p-5 flex flex-col items-center gap-2 border border-slate-100 text-center">
              <span className="text-3xl">{h.icon}</span>
              <p className="font-bold text-sm text-slate-700">{h.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-8 w-full">
        <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Galeri</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="col-span-2 md:col-span-2 rounded-2xl overflow-hidden h-64 md:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/interior-living.jpg" alt="Ruang Tamu" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pool.jpg" alt="Kolam Renang" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-2xl overflow-hidden h-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/room-bilik-a.jpg" alt="Bilik A" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-2xl overflow-hidden h-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/room-bilik-b.jpg" alt="Bilik B" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-2xl overflow-hidden h-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/kitchen.jpg" alt="Dapur" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
        <div className="mt-3 rounded-2xl overflow-hidden h-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/surroundings.jpg" alt="Kawasan Sekitar" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 py-8 w-full">
        <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Harga Penginapan</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {pricing.map((p, i) => (
            <div key={p.label} className={`rounded-2xl p-6 border-2 ${i === 1 ? 'border-indigo-500 bg-indigo-50/40' : 'border-slate-100 bg-white'}`}>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{p.label}</p>
              <p className="text-3xl font-black text-slate-900">RM {p.price}</p>
              <p className="text-xs text-slate-400 font-medium mt-1">/ malam</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar */}
      <section className="max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Ketersediaan</h2>
          <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">Jun 2026</span>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {days.map(d => <div key={d} className="text-center text-[9px] font-bold text-slate-400 uppercase">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendar.map((avail, i) => (
              <div key={i} className={`h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                avail ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-300 line-through'
              }`}>
                {i + 1}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] font-semibold text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-indigo-100 inline-block"></span> Tersedia</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-100 inline-block"></span> Ditempah</span>
            <Link href="/book" className="ml-auto text-indigo-600 font-bold hover:underline">Semak tarikh →</Link>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="max-w-6xl mx-auto px-4 py-8 w-full">
        <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Peraturan Rumah</h2>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 grid sm:grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
          <span>✓ Check-in: 3:00 PM</span>
          <span>✓ Check-out: 12:00 PM</span>
          <span>✓ Tiada haiwan peliharaan</span>
          <span>✓ Tiada majlis bising selepas 11PM</span>
          <span>✓ Deposit diperlukan untuk pengesahan</span>
          <span>✓ Bayaran penuh sebelum check-in</span>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-[28px] p-10 text-center text-white shadow-xl shadow-indigo-500/20">
          <h2 className="text-2xl font-black mb-2 tracking-tight">Sedia Untuk Menginap?</h2>
          <p className="text-indigo-100 text-sm font-medium mb-6">Hantar pertanyaan sekarang. Owner akan confirm dalam 24 jam.</p>
          <Link href="/book" className="inline-block bg-white text-indigo-700 px-8 py-3.5 rounded-full font-bold hover:scale-[1.03] transition-all shadow-lg">
            📅 Book Sekarang
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-400 font-medium">
        © 2026 SwiftStay · Powered by SwiftApps
      </footer>
    </div>
  )
}
