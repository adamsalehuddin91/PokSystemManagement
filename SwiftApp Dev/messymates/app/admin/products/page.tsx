'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, X } from 'lucide-react'

type Product = {
  id: string
  product_name: string
  category: string
  description: string
  price: number
  availability_status: string
  image_url: string
  whatsapp_inquiry_text: string
  status: string
}

const empty = { product_name: '', category: 'Kit', description: '', price: 0, availability_status: 'Ada', image_url: '', whatsapp_inquiry_text: '', status: 'published' }

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts((data as Product[]) || [])
    setLoading(false)
  }

  const openAdd = () => { setEditing(null); setForm(empty); setModal(true) }
  const openEdit = (p: Product) => { setEditing(p); setForm(p); setModal(true) }

  const handleSave = async () => {
    if (editing?.id) {
      await supabase.from('products').update(form).eq('id', editing.id)
    } else {
      await supabase.from('products').insert(form)
    }
    setModal(false)
    fetchProducts()
  }

  const toggleStatus = async (p: Product) => {
    const newStatus = p.status === 'published' ? 'draft' : 'published'
    await supabase.from('products').update({ status: newStatus }).eq('id', p.id)
    fetchProducts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Padam produk ini?')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const up = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  const productEmoji: Record<string, string> = { Kit: '🎁', Set: '🖌️', DIY: '✂️', 'Lain-lain': '📦' }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">SENSA Products</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          <Plus size={14} /> Tambah
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-400">Tiada produk lagi. Tambah produk SENSA pertama!</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm p-4 flex flex-col">
              <div className="w-full aspect-square bg-yellow-50 rounded-xl flex items-center justify-center text-4xl mb-3">
                {productEmoji[p.category] || '📦'}
              </div>
              <div className="font-semibold text-sm text-gray-900 mb-1">{p.product_name}</div>
              <div className="text-teal-600 font-bold text-sm mb-1">RM {p.price}</div>
              <div className="text-xs text-gray-500 mb-3">{p.availability_status}</div>
              <span className={`text-xs px-2 py-0.5 rounded-full self-start mb-3 ${
                p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {p.status === 'published' ? '🟢 Live' : '⚪ Off'}
              </span>
              <div className="flex gap-1 mt-auto">
                <button onClick={() => openEdit(p)} className="flex-1 text-xs border border-gray-200 py-1 rounded-lg hover:bg-gray-50 transition-colors">Edit</button>
                <button onClick={() => toggleStatus(p)} className="flex-1 text-xs border border-gray-200 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                  {p.status === 'published' ? 'Off' : 'Live'}
                </button>
                <button onClick={() => handleDelete(p.id)} className="text-xs text-red-400 border border-red-100 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">{editing ? 'Edit Produk' : 'Tambah Produk'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <label className="text-gray-600 mb-1 block">Nama Produk</label>
                <input value={form.product_name} onChange={e => up('product_name', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400" />
              </div>
              <div>
                <label className="text-gray-600 mb-1 block">Kategori</label>
                <select value={form.category} onChange={e => up('category', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400">
                  <option>Kit</option>
                  <option>Set</option>
                  <option>DIY</option>
                  <option>Lain-lain</option>
                </select>
              </div>
              <div>
                <label className="text-gray-600 mb-1 block">Penerangan</label>
                <textarea value={form.description} onChange={e => up('description', e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-1 block">Harga (RM)</label>
                  <input type="number" value={form.price} onChange={e => up('price', Number(e.target.value))} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="text-gray-600 mb-1 block">Stok</label>
                  <select value={form.availability_status} onChange={e => up('availability_status', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400">
                    <option>Ada</option>
                    <option>Preorder</option>
                    <option>Habis</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-600 mb-1 block">WA Order Text</label>
                <input value={form.whatsapp_inquiry_text} onChange={e => up('whatsapp_inquiry_text', e.target.value)} placeholder="Salam, saya nak order..." className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400" />
                <p className="text-xs text-gray-400 mt-1">Auto-fill bila customer klik order via WA</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-full hover:bg-gray-50 transition-colors text-sm">Batal</button>
              <button onClick={handleSave} className="flex-1 bg-teal-600 text-white py-2 rounded-full hover:bg-teal-700 transition-colors text-sm">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
