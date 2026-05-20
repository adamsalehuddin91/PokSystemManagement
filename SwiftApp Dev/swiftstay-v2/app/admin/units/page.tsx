'use client'
import { useState } from 'react'

const initUnits = [
  { id: 1, nama: 'Bilik A', pax: 6, weekday: 350, weekend: 450, peak: 550, active: true },
  { id: 2, nama: 'Bilik B', pax: 4, weekday: 280, weekend: 380, peak: 450, active: true },
]

export default function UnitsPage() {
  const [units, setUnits] = useState(initUnits)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<typeof initUnits[0] | null>(null)
  const [form, setForm] = useState({ nama: '', pax: 4, weekday: 0, weekend: 0, peak: 0 })

  const openNew = () => { setEditing(null); setForm({ nama: '', pax: 4, weekday: 0, weekend: 0, peak: 0 }); setShowModal(true) }
  const openEdit = (u: typeof initUnits[0]) => { setEditing(u); setForm({ nama: u.nama, pax: u.pax, weekday: u.weekday, weekend: u.weekend, peak: u.peak }); setShowModal(true) }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Urus Unit</h1>
        <button onClick={openNew} className="bg-indigo-600 text-white px-4 py-2.5 rounded-full text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20">+ Unit Baru</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {units.map(u => (
          <div key={u.id} className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-black text-slate-900">🛏 {u.nama}</h2>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${u.active ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>{u.active ? 'Aktif' : 'Tidak Aktif'}</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Max {u.pax} pax</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(u)} className="text-xs font-bold text-slate-500 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-all">✏️ Edit</button>
                <button className="text-xs font-bold text-red-400 border border-red-100 px-3 py-1.5 rounded-full hover:bg-red-50 transition-all">🗑</button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600"><span>Isnin – Khamis</span><span className="font-bold text-slate-900">RM {u.weekday} / malam</span></div>
              <div className="flex justify-between text-slate-600"><span>Jumaat – Ahad</span><span className="font-bold text-slate-900">RM {u.weekend} / malam</span></div>
              <div className="flex justify-between text-slate-600"><span>Cuti Umum / Peak</span><span className="font-bold text-slate-900">RM {u.peak} / malam</span></div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[24px] p-6 w-full max-w-sm shadow-xl border border-slate-100">
            <h3 className="font-black text-slate-900 mb-5">{editing ? 'Edit Unit' : 'Tambah Unit Baru'}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nama Unit</label>
                <input value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} placeholder="e.g. Bilik C / Villa" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Max Pax</label>
                <input type="number" value={form.pax} onChange={e => setForm({...form, pax: +e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50" />
              </div>
              {[['Isnin–Khamis (RM)', 'weekday'], ['Jumaat–Ahad (RM)', 'weekend'], ['Cuti Umum / Peak (RM)', 'peak']].map(([label, key]) => (
                <div key={key}>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{label}</label>
                  <input type="number" value={(form as any)[key]} onChange={e => setForm({...form, [key]: +e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-slate-200 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-full text-xs font-bold hover:bg-indigo-700">Simpan Unit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
