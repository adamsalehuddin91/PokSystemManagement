'use client'
import { useState } from 'react'

const days = ['Isn', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Ahad']

type DayStatus = 'free' | 'A' | 'B' | 'AB' | 'blocked'

const june: DayStatus[] = [
  'A','A','free','free','B','AB','AB',
  'free','free','A','A','A','AB','AB',
  'blocked','blocked','A','A','B','AB','AB',
  'free','free','free','free','free','AB','AB',
  'free','free',
]

const statusStyle: Record<DayStatus, string> = {
  free:    'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 cursor-pointer font-bold',
  A:       'bg-amber-100 text-amber-700 font-bold',
  B:       'bg-pink-100 text-pink-700 font-bold',
  AB:      'bg-slate-200 text-slate-500 font-bold',
  blocked: 'bg-red-50 text-red-400 font-bold line-through cursor-not-allowed',
}

const statusLabel: Record<DayStatus, string> = {
  free: '✓',
  A: 'A',
  B: 'B',
  AB: 'AB',
  blocked: '✗',
}

export default function CalendarPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Kalendar Ketersediaan</h1>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2.5 rounded-full text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20">+ Sekat Tarikh</button>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2">
          <select className="border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-400 bg-white transition-colors">
            <option>Semua Unit</option><option>Bilik A</option><option>Bilik B</option>
          </select>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
          <button className="hover:text-indigo-600">◄</button>
          <span>Jun 2026</span>
          <button className="hover:text-indigo-600">►</button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 mb-5">
        <div className="grid grid-cols-7 gap-2 mb-3">
          {days.map(d => <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {june.map((status, i) => (
            <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center text-[10px] gap-0.5 transition-all ${statusStyle[status]}`}>
              <span className="text-xs font-black">{i + 1}</span>
              <span className="text-[8px] opacity-70">{statusLabel[status]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-indigo-50 inline-block border border-indigo-100"></span> Tersedia</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-amber-100 inline-block"></span> Bilik A ditempah</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-pink-100 inline-block"></span> Bilik B ditempah</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-slate-200 inline-block"></span> Semua unit penuh</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-red-50 inline-block"></span> Disekat</span>
      </div>

      {/* Block modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[24px] p-6 w-full max-w-sm shadow-xl border border-slate-100">
            <h3 className="font-black text-slate-900 mb-5">Sekat Tarikh</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Unit</label>
                <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-400 bg-slate-50/50">
                  <option>Semua Unit</option><option>Bilik A</option><option>Bilik B</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Dari</label>
                  <input type="date" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Hingga</label>
                  <input type="date" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sebab</label>
                <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:border-indigo-400 bg-slate-50/50">
                  <option>Selenggara</option><option>Guna Sendiri</option><option>Lain-lain</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-slate-200 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-full text-xs font-bold hover:bg-indigo-700">Sekat Tarikh</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
