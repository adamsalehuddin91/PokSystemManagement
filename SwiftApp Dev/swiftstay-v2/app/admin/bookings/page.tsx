import Link from 'next/link'

const bookings = [
  { id: '1026', tetamu: 'Ahmad Zainal', unit: 'Bilik A', ci: '21 Mei', co: '23 Mei', status: 'Confirm',   bayar: 'Deposit' },
  { id: '1025', tetamu: 'Rajan Muthu',  unit: 'Bilik A', ci: '25 Mei', co: '27 Mei', status: 'Pending',   bayar: 'Deposit' },
  { id: '1024', tetamu: 'Siti Rahimah', unit: 'Bilik B', ci: '22 Mei', co: '24 Mei', status: 'Confirm',   bayar: 'Penuh' },
  { id: '1023', tetamu: 'Lim Kok Wei',  unit: 'Bilik C', ci: '18 Mei', co: '20 Mei', status: 'Selesai',   bayar: 'Penuh' },
  { id: '1022', tetamu: 'Farah Nadia',  unit: 'Bilik A', ci: '15 Mei', co: '17 Mei', status: 'Selesai',   bayar: 'Penuh' },
]

const statusColor: Record<string, string> = {
  Pending:  'bg-slate-100 text-slate-500',
  Confirm:  'bg-yellow-100 text-yellow-700',
  'Check-in': 'bg-blue-100 text-blue-700',
  Selesai:  'bg-green-100 text-green-700',
  Batal:    'bg-red-100 text-red-500',
}

const bayarColor: Record<string, string> = {
  Deposit: 'bg-amber-50 text-amber-600',
  Penuh:   'bg-green-50 text-green-600',
}

export default function BookingsPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Senarai Tempahan</h1>
        <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-full text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20">
          + Tempahan Baru
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['Semua', 'Pending', 'Confirm', 'Check-in', 'Selesai', 'Batal'].map(f => (
          <button key={f} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${f === 'Semua' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600'}`}>{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left">No.</th>
                <th className="px-6 py-4 text-left">Tetamu</th>
                <th className="px-6 py-4 text-left">Unit</th>
                <th className="px-6 py-4 text-left">Check-in</th>
                <th className="px-6 py-4 text-left">Check-out</th>
                <th className="px-6 py-4 text-left">Bayaran</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-400 text-xs">#{b.id}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/bookings/${b.id}`} className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{b.tetamu}</Link>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{b.unit}</td>
                  <td className="px-6 py-4 text-slate-600">{b.ci}</td>
                  <td className="px-6 py-4 text-slate-600">{b.co}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${bayarColor[b.bayar]}`}>{b.bayar}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusColor[b.status]}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
