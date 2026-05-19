'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

type Inquiry = {
  id: string
  activity_name: string
  preferred_date: string
  status: string
  payment_status: string
  parents: { full_name: string; phone: string } | null
}

const STATUS_COLORS: Record<string, string> = {
  new: '#fbbf24',
  followed_up: '#60a5fa',
  confirmed: '#34d399',
  cancelled: '#f87171',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  followed_up: 'Followed Up',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
}

const PAYMENT_LABELS: Record<string, string> = {
  pending: '⏳ Pending',
  paid: '✅ Paid',
  cancelled: '❌ Cancelled',
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchInquiries() }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('inquiries')
      .select('id, activity_name, preferred_date, status, payment_status, parents(full_name, phone)')
      .order('created_at', { ascending: false })
    setInquiries((data as unknown as Inquiry[]) || [])
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('inquiries').update({ status }).eq('id', id)
    fetchInquiries()
  }

  const updatePayment = async (id: string, payment_status: string) => {
    await supabase.from('inquiries').update({ payment_status }).eq('id', id)
    fetchInquiries()
  }

  const filtered = inquiries.filter(i => {
    const matchFilter = filter === 'all' || i.status === filter
    const matchSearch = i.parents?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      i.activity_name?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter(i => i.status === 'new' || i.status === 'followed_up').length,
    confirmed: inquiries.filter(i => i.status === 'confirmed').length,
  }

  const pieData = Object.entries(STATUS_LABELS).map(([key, label]) => ({
    name: label,
    value: inquiries.filter(i => i.status === key).length,
    color: STATUS_COLORS[key],
  })).filter(d => d.value > 0)

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Dashboard / Inquiry CRM</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Inquiry', value: stats.total, color: 'bg-teal-50 text-teal-700' },
          { label: 'Pending / Follow Up', value: stats.pending, color: 'bg-yellow-50 text-yellow-700' },
          { label: 'Confirmed', value: stats.confirmed, color: 'bg-green-50 text-green-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart + table side by side */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-sm text-gray-700 mb-3">Status Chart</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-400 text-sm">Tiada data</div>
          )}
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-sm text-gray-700 mb-3">Terkini</h3>
          <div className="flex flex-col gap-2">
            {inquiries.slice(0, 4).map(i => (
              <div key={i.id} className="flex items-center justify-between text-sm py-1 border-b border-gray-50">
                <span className="font-medium text-gray-800">{i.parents?.full_name || '—'}</span>
                <span className="text-gray-500 text-xs">{i.activity_name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: STATUS_COLORS[i.status] + '20', color: STATUS_COLORS[i.status] }}
                >
                  {STATUS_LABELS[i.status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full table */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            placeholder="Cari nama / aktiviti..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm flex-1 min-w-48 focus:outline-none focus:border-teal-400"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
          >
            <option value="all">Semua Status</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-400">Tiada inquiry ditemui</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium">Nama</th>
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium">Aktiviti</th>
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium">Tarikh</th>
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium">Status</th>
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium">Bayaran</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(i => (
                  <tr key={i.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 pr-4">
                      <Link href={`/admin/customers/${i.id}`} className="font-medium text-teal-600 hover:underline">
                        {i.parents?.full_name || '—'}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{i.activity_name}</td>
                    <td className="py-3 pr-4 text-gray-500">{i.preferred_date}</td>
                    <td className="py-3 pr-4">
                      <select
                        value={i.status}
                        onChange={e => updateStatus(i.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-teal-400"
                      >
                        {Object.entries(STATUS_LABELS).map(([k, v]) => (
                          <option key={k} value={k}>{v}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 pr-4">
                      <select
                        value={i.payment_status}
                        onChange={e => updatePayment(i.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-teal-400"
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="paid">✅ Paid</option>
                        <option value="cancelled">❌ Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3">
                      <a
                        href={`https://wa.me/${i.parents?.phone?.replace(/\D/g, '')}?text=Salam%20${i.parents?.full_name}%2C%20terima%20kasih%20kerana%20menghubungi%20MessyMates!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        WA 💬
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
