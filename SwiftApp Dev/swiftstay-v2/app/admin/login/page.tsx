'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !password) { setError('Sila isi email dan kata laluan.'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError('Email atau kata laluan tidak sah.'); setLoading(false); return }
    router.push('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-3xl">🏠</span>
          <h1 className="text-xl font-black text-slate-900 mt-2 tracking-tight">SwiftStay</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Owner Portal</p>
        </div>
        <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm">
          <h2 className="font-black text-slate-900 mb-6">Log Masuk</h2>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="owner@mail.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Kata Laluan</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleLogin()} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-400 bg-slate-50/50 transition-colors" />
            </div>
            {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
            <button onClick={handleLogin} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-full font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-md shadow-indigo-500/20">
              {loading ? 'Masuk...' : 'Log Masuk'}
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-4 font-medium">Lupa kata laluan? Hubungi admin SwiftStay.</p>
        </div>
      </div>
    </div>
  )
}
