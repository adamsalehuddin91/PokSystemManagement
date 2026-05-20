import Link from 'next/link'

const guests = [
  { id: '1', nama: 'Ahmad Zainal', phone: '011-2345678', lawatan: 3, repeat: true },
  { id: '2', nama: 'Siti Rahimah', phone: '012-5678901', lawatan: 1, repeat: false },
  { id: '3', nama: 'Rajan Muthu',  phone: '016-8901234', lawatan: 1, repeat: false },
  { id: '4', nama: 'Lim Kok Wei',  phone: '017-1234567', lawatan: 2, repeat: true },
  { id: '5', nama: 'Farah Nadia',  phone: '019-3456789', lawatan: 1, repeat: false },
]

export default function GuestsPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Senarai Tetamu</h1>
        <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-full text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20">+ Tetamu Baru</button>
      </div>

      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-2 mb-5">
        <input placeholder="🔍  Cari nama, IC, telefon..." className="w-full px-4 py-3 text-sm font-medium focus:outline-none bg-transparent text-slate-700 placeholder:text-slate-300" />
      </div>

      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-left">Nama</th>
              <th className="px-6 py-4 text-left">Telefon</th>
              <th className="px-6 py-4 text-left">Bil Lawatan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {guests.map(g => (
              <tr key={g.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <Link href={`/admin/guests/${g.id}`} className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                    {g.nama}
                    {g.repeat && <span className="text-[10px] bg-indigo-100 text-indigo-600 font-bold px-2 py-0.5 rounded-full">🔁 Berulang</span>}
                  </Link>
                </td>
                <td className="px-6 py-4 text-slate-500">{g.phone}</td>
                <td className="px-6 py-4 font-semibold text-slate-700">{g.lawatan} kali</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
