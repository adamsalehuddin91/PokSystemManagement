'use client'
import { useState } from 'react'
import Link from 'next/link'

const statuses = ['Pending', 'Confirm', 'Check-in', 'Selesai', 'Batal']

export default function BookingDetail() {
  const [status, setStatus] = useState('Confirm')
  const [showPayModal, setShowPayModal] = useState(false)
  const [payType, setPayType] = useState<'Deposit' | 'Baki'>('Baki')
  const [payAmount, setPayAmount] = useState('')
  const [payMethod, setPayMethod] = useState('Bank')

  const payments = [
    { type: 'Deposit', amount: 'RM 450', method: 'Bank Transfer', date: '20/5/26', done: true },
    { type: 'Baki',    amount: 'RM 450', method: '—',             date: 'Belum',   done: false },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-7">
        <Link href="/admin/bookings" className="text-xs font-bold text-slate-400 hover:text-slate-700">← Senarai</Link>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tempahan #1026</h1>
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-6">
        <div className="space-y-5">
          {/* Booking details */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
            <h2 className="font-black text-slate-900 mb-4">Butiran Tempahan</h2>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              {[
                ['Unit', 'Bilik A'], ['Check-in', '21 Mei 2026'],
                ['Check-out', '23 Mei 2026'], ['Bil Malam', '2 malam'],
                ['Bil Tetamu', '4 orang'], ['Jumlah', 'RM 900'],
              ].map(([k, v]) => (
                <div key={k}><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{k}</p><p className="font-semibold text-slate-800 mt-0.5">{v}</p></div>
              ))}
            </div>
            {/* Notes */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Catatan</p>
              <p className="text-sm text-slate-600 font-medium">Ada bayi 8 bulan. Perlukan katil bayi jika ada.</p>
            </div>
          </div>

          {/* Guest info */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-slate-900">Maklumat Tetamu</h2>
              <Link href="/admin/guests/1" className="text-xs font-bold text-indigo-600 hover:underline">Lihat Profil ↗</Link>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-bold text-slate-900 text-base">Ahmad Zainal <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full ml-1">🔁 Kali ke-3</span></p>
              <p className="text-slate-600">📱 011-2345678</p>
              <p className="text-slate-600">📧 ahmad@gmail.com</p>
              <p className="text-slate-500 text-xs">IC: 850112-01-1234</p>
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-slate-900">Rekod Pembayaran</h2>
              <button onClick={() => setShowPayModal(true)} className="text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-full hover:bg-indigo-700 transition-all">+ Rekod</button>
            </div>
            <div className="space-y-3 mb-4">
              {payments.map(p => (
                <div key={p.type} className="flex items-center gap-3 text-sm">
                  <span className={`text-base ${p.done ? '' : 'opacity-30'}`}>{p.done ? '✅' : '⬜'}</span>
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">{p.type}</span>
                    <span className="text-slate-400 text-xs ml-2">{p.method} · {p.date}</span>
                  </div>
                  <span className={`font-black text-sm ${p.done ? 'text-green-600' : 'text-slate-300'}`}>{p.amount}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500">Jumlah Dibayar</span>
              <span className="font-black text-slate-900">RM 450 / RM 900</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
            <h2 className="font-black text-slate-900 mb-4">Tindakan</h2>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors">
                  {statuses.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <a href="https://wa.me/60112345678" target="_blank" className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-2.5 rounded-full text-xs font-bold hover:bg-green-600 transition-all">
                💬 WhatsApp Tetamu
              </a>
              <button className="w-full border border-slate-200 text-slate-600 py-2.5 rounded-full text-xs font-bold hover:bg-slate-50 transition-all">
                ✏️ Edit Tempahan
              </button>
              <button className="w-full border border-red-100 text-red-400 py-2.5 rounded-full text-xs font-bold hover:bg-red-50 transition-all">
                🗑 Batalkan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[24px] p-6 w-full max-w-sm shadow-xl border border-slate-100">
            <h3 className="font-black text-slate-900 mb-5">Rekod Bayaran Baru</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Jenis</label>
                <div className="flex gap-2">
                  {(['Deposit', 'Baki'] as const).map(t => (
                    <button key={t} onClick={() => setPayType(t)} className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${payType === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Amaun (RM)</label>
                <input type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} placeholder="450" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kaedah</label>
                <div className="flex gap-2">
                  {['Bank', 'TnG', 'Tunai'].map(m => (
                    <button key={m} onClick={() => setPayMethod(m)} className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${payMethod === m ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{m}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowPayModal(false)} className="flex-1 border border-slate-200 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">Batal</button>
              <button onClick={() => setShowPayModal(false)} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-full text-xs font-bold hover:bg-indigo-700 transition-all">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
