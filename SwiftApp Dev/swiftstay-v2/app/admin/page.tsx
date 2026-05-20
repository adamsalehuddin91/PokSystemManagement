export default function AdminDashboard() {
  const kpis = [
    { label: 'Tempahan Bulan Ini', value: '12', color: 'bg-indigo-50 text-indigo-700' },
    { label: 'Pendapatan Bulan Ini', value: 'RM 4,800', color: 'bg-green-50 text-green-700' },
    { label: 'Baki Belum Dibayar', value: 'RM 900', color: 'bg-amber-50 text-amber-700' },
    { label: 'Sedang Menginap', value: '3 Unit', color: 'bg-sky-50 text-sky-700' },
  ]

  const upcoming = [
    { id: '#1026', tetamu: 'Ahmad Zainal', unit: 'Bilik A', ci: '21 Mei', co: '23 Mei', status: 'Confirm' },
    { id: '#1025', tetamu: 'Siti Rahimah', unit: 'Bilik B', ci: '22 Mei', co: '24 Mei', status: 'Confirm' },
    { id: '#1024', tetamu: 'Rajan Muthu',  unit: 'Bilik A', ci: '25 Mei', co: '27 Mei', status: 'Pending' },
  ]

  const pending = [
    { tetamu: 'Ahmad Zainal', id: '#1026', baki: 'RM 450' },
    { tetamu: 'Rajan Muthu',  id: '#1025', baki: 'RM 350' },
  ]

  const statusColor: Record<string, string> = {
    Confirm: 'bg-yellow-100 text-yellow-700',
    Pending: 'bg-slate-100 text-slate-500',
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-black text-slate-900 mb-7 tracking-tight">Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map(k => (
          <div key={k.label} className={`rounded-2xl p-5 ${k.color}`}>
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">{k.label}</p>
            <p className="text-2xl font-black">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming check-ins */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 mb-6">
        <h2 className="font-black text-slate-900 mb-4">Check-in Akan Datang</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-3 text-left">No.</th>
                <th className="pb-3 text-left">Tetamu</th>
                <th className="pb-3 text-left">Unit</th>
                <th className="pb-3 text-left">Check-in</th>
                <th className="pb-3 text-left">Check-out</th>
                <th className="pb-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {upcoming.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-bold text-slate-500 text-xs">{u.id}</td>
                  <td className="py-3 font-semibold text-slate-900">{u.tetamu}</td>
                  <td className="py-3 text-slate-600">{u.unit}</td>
                  <td className="py-3 text-slate-600">{u.ci}</td>
                  <td className="py-3 text-slate-600">{u.co}</td>
                  <td className="py-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusColor[u.status]}`}>{u.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending payments */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6">
        <h2 className="font-black text-slate-900 mb-4">Baki Belum Dibayar</h2>
        <div className="divide-y divide-slate-50">
          {pending.map(p => (
            <div key={p.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-slate-900 text-sm">{p.tetamu}</p>
                <p className="text-xs text-slate-400 font-medium">{p.id}</p>
              </div>
              <span className="font-black text-amber-600 text-sm">{p.baki}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
