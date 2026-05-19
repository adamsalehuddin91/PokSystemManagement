'use client'
export const dynamic = 'force-dynamic'
import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const programNames: Record<string, string> = {
  sensory: 'Sensory Play',
  art: 'Art Class',
  slime: 'Slime Lab',
  'birthday-basic': 'Birthday Basic',
  'birthday-premium': 'Birthday Premium',
}

const programPrices: Record<string, number> = {
  sensory: 80,
  art: 65,
  slime: 50,
  'birthday-basic': 450,
  'birthday-premium': 850,
}

function CheckoutContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const program = params.get('program') || ''
  const date = params.get('date') || ''
  const time = params.get('time') || ''
  const childName = params.get('childName') || ''
  const childAge = params.get('childAge') || ''
  const allergies = params.get('allergies') || ''
  const parentName = params.get('parentName') || ''
  const phone = params.get('phone') || ''
  const email = params.get('email') || ''
  const message = params.get('message') || ''

  const programLabel = programNames[program] || program
  const price = programPrices[program] || 0

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { error: parentError, data: parentData } = await supabase
        .from('parents')
        .insert({ full_name: parentName, phone, email })
        .select()
        .single()

      if (parentError) throw parentError

      const { error: childError, data: childData } = await supabase
        .from('children')
        .insert({ parent_id: parentData.id, child_name: childName, age: childAge, allergies })
        .select()
        .single()

      if (childError) throw childError

      const { error: inquiryError } = await supabase
        .from('inquiries')
        .insert({
          parent_id: parentData.id,
          child_id: childData.id,
          inquiry_type: 'program',
          activity_name: programLabel,
          preferred_date: date,
          message: `Masa: ${time}. ${message}`,
          status: 'new',
          payment_status: 'pending',
        })

      if (inquiryError) throw inquiryError

      setDone(true)
    } catch (err) {
      console.error(err)
      alert('Ralat berlaku. Sila cuba lagi.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-teal-50 px-4">
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Berjaya Dihantar!</h2>
            <p className="text-gray-500 mb-6">
              Terima kasih {parentName}! Admin MessyMates akan hubungi anda dalam masa 24 jam.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-teal-600 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors"
            >
              Balik ke Halaman Utama
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Steps */}
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -z-10 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-0 w-[40%] h-[2px] bg-[#0d9488] -z-10 -translate-y-1/2"></div>
          
          <div className="flex items-center gap-2 bg-slate-50 px-2">
            <div className="w-8 h-8 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold text-sm">✓</div>
            <span className="font-semibold text-gray-900 text-sm">Details</span>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 px-2">
            <div className="w-8 h-8 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold text-sm">2</div>
            <span className="font-semibold text-gray-900 text-sm">Waiver</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-2">
            <div className="w-8 h-8 rounded-full bg-white text-gray-400 border-2 border-gray-200 flex items-center justify-center font-bold text-sm">3</div>
            <span className="font-medium text-gray-400 text-sm">Payment</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-2">
            <div className="w-8 h-8 rounded-full bg-white text-gray-400 border-2 border-gray-200 flex items-center justify-center font-bold text-sm">4</div>
            <span className="font-medium text-gray-400 text-sm">Confirmation</span>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_380px] gap-8">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            
            {/* Parent Details */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-6 text-lg">Parent / Guardian Details</h2>
              <div className="grid gap-5">
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">Full Name</label>
                  <input type="text" defaultValue="Amir Zainal" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 bg-gray-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1.5 block">Phone</label>
                    <input type="tel" defaultValue="+60 13-345 6789" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 bg-gray-50" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1.5 block">Email</label>
                    <input type="email" defaultValue="amir.zainal@gmail.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">Address</label>
                  <input type="text" defaultValue="Desaru, Bandar Penawar, Johor" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 bg-gray-50" />
                </div>
              </div>
            </div>

            {/* Child Details */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-6 text-lg">Child Details</h2>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-xl overflow-hidden">
                     <img src="/images/messymates/child-avatar.png" alt="Child" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Aisyah Binti Amir</h4>
                    <p className="text-xs text-gray-500">Age 4 yrs</p>
                  </div>
                </div>
                <button className="text-teal-600 text-xs font-medium hover:underline">Change Child</button>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1.5 block">Allergies / Notes*</label>
                <input type="text" defaultValue="e.g. Peanut allergy, sensitive skin" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 bg-gray-50 text-gray-400" />
              </div>
            </div>

            {/* Waiver */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">Waiver & Disclosure</h2>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-5 h-5 bg-[#0d9488] rounded flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-1">I have read and agree to the Terms & Conditions and Waiver.</p>
                  <p className="text-xs text-gray-500">I understand that MessyMates is not liable for any injury or loss during the session.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Payment Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-6 text-lg">Payment Summary</h2>
              
              <div className="mb-6">
                <p className="text-sm text-gray-700 font-medium">Messy Play / 10 May 2025, 9:30 AM</p>
              </div>

              <div className="flex justify-between items-center text-sm mb-3 text-gray-600">
                <span>Subtotal</span>
                <span>RM 85.00</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-6 text-gray-600 pb-6 border-b border-gray-100">
                <span>Discounts / Fee</span>
                <span>RM 0.00</span>
              </div>
              <div className="flex justify-between items-center font-bold text-gray-900 text-lg mb-8">
                <span>Total</span>
                <span>RM 85.00</span>
              </div>

              <h3 className="font-bold text-gray-900 mb-4 text-sm">Choose Payment Method</h3>
              <div className="grid grid-cols-3 gap-2 mb-8">
                <button className="border-2 border-[#0d9488] bg-teal-50 rounded-xl p-3 flex flex-col items-center justify-center gap-1">
                  <span className="font-bold text-[#0d9488] text-sm">billplz</span>
                  <span className="text-[9px] text-gray-500 text-center leading-tight">Local e-Wallets</span>
                </button>
                <button className="border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center gap-1 hover:border-teal-200 transition-colors">
                  <span className="font-bold text-purple-600 text-sm">toyyibPay</span>
                  <span className="text-[9px] text-gray-500 text-center leading-tight">Online Banking</span>
                </button>
                <button className="border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center gap-1 hover:border-teal-200 transition-colors">
                  <span className="font-bold text-blue-500 text-sm">stripe</span>
                  <span className="text-[9px] text-gray-500 text-center leading-tight">Card Payment</span>
                </button>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#0d9488] text-white py-3.5 rounded-full font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                {loading ? 'Processing...' : 'Pay RM 85.00 Now'}
              </button>
              
              <div className="flex justify-center items-center gap-1.5 text-xs text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Your payment is secure and encrypted.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
