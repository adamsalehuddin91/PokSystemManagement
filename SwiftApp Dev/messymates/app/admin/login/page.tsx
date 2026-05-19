'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email atau kata laluan tidak betul.')
      setLoading(false)
    } else {
      router.push('/admin/inquiries')
    }
  }

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center px-4" style={{ marginLeft: '-224px' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎨</div>
          <h1 className="text-2xl font-bold text-teal-700">MessyMates</h1>
          <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg">{error}</div>
          )}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@messymates.my"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Kata Laluan</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Log masuk...' : 'Log Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
