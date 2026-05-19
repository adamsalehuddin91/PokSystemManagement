'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, X } from 'lucide-react'

type Program = {
  id: string
  title: string
  category: string
  description: string
  suitable_age: string
  date: string
  time: string
  location: string
  price: number
  slot_limit: number
  status: string
}

const empty = { title: '', category: 'Sensory', description: '', suitable_age: '', date: '', time: '', location: '', price: 0, slot_limit: 10, status: 'draft' }

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Partial<Program> | null>(null)
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchPrograms() }, [])

  const fetchPrograms = async () => {
    setLoading(true)
    const { data } = await supabase.from('programs').select('*').order('created_at', { ascending: false })
    setPrograms((data as Program[]) || [])
    setLoading(false)
  }

  const openAdd = () => { setEditing(null); setForm(empty); setModal(true) }
  const openEdit = (p: Program) => { setEditing(p); setForm(p); setModal(true) }

  const handleSave = async (status: string) => {
    const payload = { ...form, status }
    if (editing?.id) {
      await supabase.from('programs').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('programs').insert(payload)
    }
    setModal(false)
    fetchPrograms()
  }

  const toggleStatus = async (p: Program) => {
    const newStatus = p.status === 'published' ? 'draft' : 'published'
    await supabase.from('programs').update({ status: newStatus }).eq('id', p.id)
    fetchPrograms()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Padam program ini?')) return
    await supabase.from('programs').delete().eq('id', id)
    fetchPrograms()
  }

  const up = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Programs</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          <Plus size={14} /> Tambah
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : programs.length === 0 ? (
        <div className="text-center py-10 text-gray-400">Tiada program lagi. Tambah program pertama!</div>
      ) : (
        <div className="flex flex-col gap-4">
          {programs.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-2xl">🎭</div>
                <div>
                  <div className="font-semibold text-gray-900">{p.title}</div>
                  <div className="text-sm text-gray-500">Umur: {p.suitable_age} • RM {p.price}/sesi</div>
                  {p.date && <div className="text-xs text-gray-400">{p.date} {p.time && `@ ${p.time}`}</div>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {p.status === 'published' ? '🟢 Published' : '⚪ Draft'}
                </span>
                <button onClick={() => openEdit(p)} className="text-xs border border-gray-200 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors">Edit ✏</button>
                <button onClick={() => toggleStatus(p)} className="text-xs border border-gray-200 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                  {p.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => handleDelete(p.id)} className="text-xs text-red-400 border border-red-100 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">{editing ? 'Edit Program' : 'Tambah Program'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <label className="text-gray-600 mb-1 block">Tajuk</label>
                <input value={form.title} onChange={e => up('title', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400" />
              </div>
              <div>
                <label className="text-gray-600 mb-1 block">Kategori</label>
                <select value={form.category} onChange={e => up('category', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400">
                  <option>Sensory</option>
                  <option>Art</option>
                  <option>Birthday</option>
                  <option>Lain-lain</option>
                </select>
              </div>
              <div>
                <label className="text-gray-600 mb-1 block">Penerangan</label>
                <textarea value={form.description} onChange={e => up('description', e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-1 block">Umur Sesuai</label>
                  <input value={form.suitable_age} onChange={e => up('suitable_age', e.target.value)} placeholder="1–4 tahun" className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="text-gray-600 mb-1 block">Lokasi</label>
                  <input value={form.location} onChange={e => up('location', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="text-gray-600 mb-1 block">Tarikh</label>
                  <input type="date" value={form.date} onChange={e => up('date', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="text-gray-600 mb-1 block">Masa</label>
                  <input type="time" value={form.time} onChange={e => up('time', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="text-gray-600 mb-1 block">Harga (RM)</label>
                  <input type="number" value={form.price} onChange={e => up('price', Number(e.target.value))} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="text-gray-600 mb-1 block">Had Slot</label>
                  <input type="number" value={form.slot_limit} onChange={e => up('slot_limit', Number(e.target.value))} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-full hover:bg-gray-50 transition-colors text-sm">Batal</button>
              <button onClick={() => handleSave('draft')} className="flex-1 border border-teal-300 text-teal-600 py-2 rounded-full hover:bg-teal-50 transition-colors text-sm">Simpan Draft</button>
              <button onClick={() => handleSave('published')} className="flex-1 bg-teal-600 text-white py-2 rounded-full hover:bg-teal-700 transition-colors text-sm">Publish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
