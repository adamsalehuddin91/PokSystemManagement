'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const getMinDate = () => new Date().toISOString().split('T')[0]

export default function BookPage() {
  const router = useRouter()
  const [nama, setNama] = useState('')
  const [ic, setIc] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [pax, setPax] = useState('1-2')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 0

  const handleSubmit = async () => {
    if (!nama || !ic || !phone || !checkIn || !checkOut) {
      alert('Sila lengkapkan semua medan bertanda *')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    router.push(`/confirmation?nama=${encodeURIComponent(nama)}&checkIn=${checkIn}&checkOut=${checkOut}&pax=${encodeURIComponent(pax)}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      <Navbar />
      <div className="max-w-5xl mx-auto w-full px-4 py-10 flex-1">
        <a href="/" className="text-xs font-bold text-slate-500 hover:text-slate-800 mb-6 inline-block">← Balik ke Laman Utama</a>
        <h1 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Borang Tempahan</h1>

        <div className="grid md:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-6">
            {/* Maklumat Tetamu */}
            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
              <h2 className="font-black text-slate-900 mb-5">Maklumat Tetamu</h2>
              <div className="grid gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Nama Penuh *</label>
                  <input value={nama} onChange={e => setNama(e.target.value)} placeholder="e.g. Ahmad Zainal" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">No. IC / Passport *</label>
                  <input value={ic} onChange={e => setIc(e.target.value)} placeholder="e.g. 850112-01-1234" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">No. WhatsApp *</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="011-2345678" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email (Pilihan)</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="ahmad@mail.com" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tarikh & Tetamu */}
            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
              <h2 className="font-black text-slate-900 mb-5">Tarikh & Tetamu</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Check-in *</label>
                  <input type="date" value={checkIn} min={getMinDate()} onChange={e => setCheckIn(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Check-out *</label>
                  <input type="date" value={checkOut} min={checkIn || getMinDate()} onChange={e => setCheckOut(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Bil Tetamu *</label>
                <div className="flex flex-wrap gap-2">
                  {['1-2', '3-4', '5-6', '7-8'].map(p => (
                    <button key={p} onClick={() => setPax(p)} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${pax === p ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}>{p} orang</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Catatan */}
            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
              <h2 className="font-black text-slate-900 mb-5">Catatan Khas (Pilihan)</h2>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="e.g. Ada bayi, perlukan katil tambahan, ada alahan makanan..." className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors resize-none" />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm sticky top-24 h-fit">
            <h2 className="font-black text-slate-900 mb-5">Ringkasan</h2>
            <div className="space-y-3 mb-5 text-sm">
              <div className="font-bold text-slate-800">Vila Bayu Desaru</div>
              {checkIn && <div className="flex justify-between text-slate-600"><span>Check-in</span><span className="font-semibold">{checkIn}</span></div>}
              {checkOut && <div className="flex justify-between text-slate-600"><span>Check-out</span><span className="font-semibold">{checkOut}</span></div>}
              {nights > 0 && <div className="flex justify-between text-slate-600"><span>Bil Malam</span><span className="font-semibold">{nights} malam</span></div>}
              <div className="flex justify-between text-slate-600"><span>Tetamu</span><span className="font-semibold">{pax} orang</span></div>
              {nights > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Anggaran harga</span><span>RM 450 × {nights}</span></div>
                  <div className="flex justify-between font-black text-slate-900"><span>Anggaran Jumlah</span><span>RM {450 * nights}</span></div>
                  <p className="text-[10px] text-slate-400 mt-1">* Harga mungkin berbeza. Owner akan confirm.</p>
                </div>
              )}
            </div>
            <button onClick={handleSubmit} disabled={loading} className="w-full bg-indigo-600 text-white py-3.5 rounded-full font-bold hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50">
              {loading ? 'Menghantar...' : 'Hantar Pertanyaan'}
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">🔒 Maklumat anda selamat & sulit</p>
          </div>
        </div>
      </div>
      <footer className="border-t border-slate-100 py-5 text-center text-xs text-slate-400 font-medium">
        © 2026 SwiftStay · Powered by SwiftApps
      </footer>
    </div>
  )
}
