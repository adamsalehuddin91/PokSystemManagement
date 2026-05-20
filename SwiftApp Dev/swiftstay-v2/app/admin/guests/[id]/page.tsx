import Link from 'next/link'

const history = [
  { id: '1026', tarikh: '21–23 Mei 2026', unit: 'Bilik A', bayar: 'Deposit' },
  { id: '1018', tarikh: '10–12 Apr 2026', unit: 'Bilik B', bayar: 'Penuh' },
  { id: '1009', tarikh: '2–4 Mac 2026',   unit: 'Bilik A', bayar: 'Penuh' },
]

export default function GuestDetail() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-7">
        <Link href="/admin/guests" className="text-xs font-bold text-slate-400 hover:text-slate-700">← Senarai</Link>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Profil Tetamu</h1>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm mb-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-black text-slate-900">Ahmad Zainal</h2>
              <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full">🔁 Kali ke-3</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">IC: 850112-01-1234</p>
          </div>
          <button className="text-xs font-bold text-slate-500 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-all">✏️ Edit Profil</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp</p><p className="font-semibold text-slate-800 mt-0.5">011-2345678</p></div>
          <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</p><p className="font-semibold text-slate-800 mt-0.5">ahmad@gmail.com</p></div>
          <div className="sm:col-span-2"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alamat</p><p className="font-semibold text-slate-800 mt-0.5">Jalan Damai 5, Taman Harmoni, Johor Bahru</p></div>
          <div className="sm:col-span-2"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Catatan</p><p className="text-slate-600 mt-0.5">Suka bilik yang tenang. Ada bayi semasa lawatan terakhir.</p></div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <a href="https://wa.me/60112345678" target="_blank" className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-green-600 transition-all">
            💬 WhatsApp Tetamu
          </a>
        </div>
      </div>

      {/* Stay history */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
        <h2 className="font-black text-slate-900 mb-4">Sejarah Penginapan</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="pb-3 text-left">No.</th>
              <th className="pb-3 text-left">Tarikh</th>
              <th className="pb-3 text-left">Unit</th>
              <th className="pb-3 text-left">Bayaran</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {history.map(h => (
              <tr key={h.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3 text-slate-400 font-bold text-xs">#{h.id}</td>
                <td className="py-3 font-semibold text-slate-800">{h.tarikh}</td>
                <td className="py-3 text-slate-600">{h.unit}</td>
                <td className="py-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${h.bayar === 'Penuh' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{h.bayar}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
