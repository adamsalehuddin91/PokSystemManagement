'use client'
export const dynamic = 'force-dynamic'
import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const programNames: Record<string, string> = {
  sensory: 'Sensory Play',
  art: 'Art Class',
  slime: 'Slime Lab',
  speaking: 'Public Speaking',
  hero: 'Little Hero Series',
  chef: 'Junior Chef',
  'birthday-basic': 'Birthday Basic',
  'birthday-premium': 'Birthday Premium',
}

const programPrices: Record<string, number> = {
  sensory: 85,
  art: 65,
  slime: 50,
  speaking: 90,
  hero: 75,
  chef: 80,
  'birthday-basic': 450,
  'birthday-premium': 850,
}

function CheckoutContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('billplz')

  const program = params.get('program') || 'sensory'
  const date = params.get('date') || new Date().toISOString().split('T')[0]
  const time = params.get('time') || '9:30 AM'
  const childName = params.get('childName') || 'Aisyah Binti Amir'
  const childAge = params.get('childAge') || '4'
  const allergies = params.get('allergies') || 'Peanuts'
  const parentName = params.get('parentName') || 'Amir Zainal'
  const phone = params.get('phone') || '+60133456789'
  const email = params.get('email') || 'amir.zainal@gmail.com'
  const venue = params.get('venue') || ''
  const message = params.get('message') || ''

  const isBirthday = program === 'birthday-basic' || program === 'birthday-premium'
  const programLabel = programNames[program] || program
  const fullPrice = programPrices[program] || 85
  const depositAmount = program === 'birthday-premium' ? 300 : program === 'birthday-basic' ? 200 : 0
  const price = isBirthday ? depositAmount : fullPrice

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
          message: `Masa: ${time}.${venue ? ` Venue: ${venue}.` : ''} ${message}`,
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
      <div className="min-h-screen flex flex-col bg-slate-50/30">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-[32px] shadow-xl shadow-slate-100/70 p-8 md:p-12 text-center max-w-lg border border-slate-100 relative overflow-hidden group">
            {/* Playful background decorative shapes */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-100/40 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-100/40 rounded-full blur-2xl"></div>
            
            <div className="text-6xl mb-6 animate-float inline-block">🎉</div>
            
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight">
              Inquiry Berjaya Dihantar!
            </h1>
            <p className="text-gray-600 mb-8 text-[15px] font-medium leading-relaxed">
              Terima kasih <span className="font-bold text-gray-900">{parentName}</span>! Admin MessyMates akan menghubungi anda melalui WhatsApp/Emel dalam masa 24 jam untuk pengesahan slot.
            </p>
            
            <button
              onClick={() => router.push('/')}
              className="bg-orange-500 text-white px-8 py-3.5 rounded-full font-bold hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-md shadow-orange-500/25 duration-300"
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
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      <Navbar />
      
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Steps Progress */}
        <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -z-10 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-0 w-[60%] h-[2px] bg-teal-500 -z-10 -translate-y-1/2"></div>
          
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-teal-100 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">✓</div>
            <span className="font-bold text-gray-900 text-xs md:text-sm">Session</span>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-teal-100 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">2</div>
            <span className="font-bold text-gray-900 text-xs md:text-sm">Details</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-teal-100 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">3</div>
            <span className="font-bold text-gray-900 text-xs md:text-sm">Waiver</span>
          </div>

          <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full border border-slate-150 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-slate-100 text-gray-400 border border-slate-200 flex items-center justify-center font-bold text-xs">4</div>
            <span className="font-medium text-gray-400 text-xs md:text-sm">Pay</span>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_380px] gap-8">
          
          {/* Left Column: Form Sections */}
          <div className="flex flex-col gap-6">
            
            {/* Parent Details */}
            <div className="bg-white rounded-[32px] shadow-sm p-6 md:p-8 border border-slate-100">
              <h2 className="font-black text-gray-900 mb-6 text-lg tracking-tight">Parent / Guardian Details</h2>
              
              <div className="grid gap-5">
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={parentName} 
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 bg-slate-50/50 shadow-inner transition-colors" 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="tel" 
                      defaultValue={phone} 
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 bg-slate-50/50 shadow-inner transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={email} 
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 bg-slate-50/50 shadow-inner transition-colors" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Home Address</label>
                  <input 
                    type="text" 
                    defaultValue="Desaru, Bandar Penawar, Johor" 
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 bg-slate-50/50 shadow-inner transition-colors" 
                  />
                </div>
              </div>
            </div>

            {/* Child Details */}
            <div className="bg-white rounded-[32px] shadow-sm p-6 md:p-8 border border-slate-100">
              <h2 className="font-black text-gray-900 mb-6 text-lg tracking-tight">Child Details</h2>
              
              <div className="flex items-center justify-between mb-6 p-4 bg-rose-50/40 rounded-2xl border border-rose-100/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl overflow-hidden border border-rose-100 shadow-sm shrink-0">
                     <Image src="/images/messymates/child-avatar.png" alt="Child" width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{childName}</h4>
                    <p className="text-xs text-gray-500 font-medium">Age {childAge} yrs</p>
                  </div>
                </div>
                <button className="text-teal-600 text-xs font-bold hover:underline shrink-0">Change Child</button>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Allergies / Special Notes</label>
                <input 
                  type="text" 
                  defaultValue={allergies} 
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 bg-slate-50/50 shadow-inner text-gray-700 transition-colors" 
                />
              </div>
            </div>

            {/* Birthday-specific details — Fix #5 */}
            {isBirthday && (
              <div className="bg-white rounded-[32px] shadow-sm p-6 md:p-8 border border-slate-100">
                <h2 className="font-black text-gray-900 mb-6 text-lg tracking-tight">Party Details</h2>
                <div className="grid gap-5">
                  <div>
                    <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Party Venue / Address</label>
                    <input
                      type="text"
                      defaultValue={venue}
                      placeholder="e.g. No 12, Jalan Teratai, Taman Desa, KL"
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 bg-slate-50/50 shadow-inner transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Our team arrives at</label>
                    <div className="bg-amber-50/60 border border-amber-100 rounded-2xl px-4 py-3 text-sm font-semibold text-amber-800">
                      45 minutes before {time} for full setup
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-600 mb-2 block uppercase tracking-wider">Special Requests (Optional)</label>
                    <textarea
                      rows={3}
                      defaultValue={message}
                      placeholder="e.g. Birthday child has peanut allergy, extra table needed, etc."
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 bg-slate-50/50 shadow-inner transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Waiver */}
            <div className="bg-white rounded-[32px] shadow-sm p-6 md:p-8 border border-slate-100">
              <h2 className="font-black text-gray-900 mb-4 text-lg tracking-tight">Waiver & Disclosure</h2>
              
              <div className="flex items-start gap-3.5 p-4 bg-amber-50/30 rounded-2xl border border-amber-100/30">
                <div className="mt-1">
                  <div className="w-5 h-5 bg-teal-500 rounded-md flex items-center justify-center shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-bold mb-1">I have read and agree to the Terms & Conditions and Waiver.</p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">I understand that MessyMates is not liable for any minor injury, skin sensitivity, or damage to clothing during the sensory play session.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Payment Summary */}
          <div>
            <div className="bg-white rounded-[32px] shadow-sm p-6 md:p-8 border border-slate-100 sticky top-24">
              <h2 className="font-black text-gray-900 mb-6 text-lg tracking-tight">Payment Summary</h2>
              
              <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block mb-1">Session Info</span>
                <p className="text-xs font-bold text-gray-800 leading-snug">{programLabel}</p>
                <p className="text-xs text-gray-500 font-semibold mt-1">Date: Saturday, 10 May 2025</p>
                <p className="text-xs text-gray-500 font-semibold">Time: {time}</p>
              </div>

              <div className="space-y-3 mb-6">
                {isBirthday ? (
                  <>
                    <div className="flex justify-between items-center text-xs text-gray-600 font-semibold">
                      <span>Package Price</span>
                      <span>RM {fullPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-600 font-semibold pb-4 border-b border-slate-100">
                      <span>Balance (payable on party day)</span>
                      <span>RM {(fullPrice - depositAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-gray-900 text-base">
                      <span>Deposit Due Now</span>
                      <span className="text-pink-600">RM {depositAmount.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">Deposit locks your party date. Remainder collected on the day.</p>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-xs text-gray-600 font-semibold">
                      <span>Subtotal</span>
                      <span>RM {price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-600 font-semibold pb-4 border-b border-slate-100">
                      <span>Discounts / Fee</span>
                      <span>RM 0.00</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-gray-900 text-base">
                      <span>Total Amount</span>
                      <span>RM {price.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              <h3 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider text-slate-500">Payment Method</h3>
              <div className="grid grid-cols-3 gap-2 mb-8">
                <button 
                  onClick={() => setPaymentMethod('billplz')}
                  className={`border-2 rounded-2xl p-2.5 flex flex-col items-center justify-center gap-0.5 transition-all duration-300 ${
                    paymentMethod === 'billplz' 
                      ? 'border-teal-500 bg-teal-50/20 scale-[1.03]' 
                      : 'border-slate-150 hover:border-teal-200 bg-white'
                  }`}
                >
                  <span className={`font-black text-xs ${paymentMethod === 'billplz' ? 'text-teal-600' : 'text-slate-500'}`}>billplz</span>
                  <span className="text-[8px] text-gray-400 text-center leading-tight font-bold">e-Wallets</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('toyyibpay')}
                  className={`border-2 rounded-2xl p-2.5 flex flex-col items-center justify-center gap-0.5 transition-all duration-300 ${
                    paymentMethod === 'toyyibpay' 
                      ? 'border-pink-500 bg-pink-50/20 scale-[1.03]' 
                      : 'border-slate-150 hover:border-pink-200 bg-white'
                  }`}
                >
                  <span className={`font-black text-xs ${paymentMethod === 'toyyibpay' ? 'text-pink-600' : 'text-slate-500'}`}>toyyibPay</span>
                  <span className="text-[8px] text-gray-400 text-center leading-tight font-bold">FPX Bank</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('stripe')}
                  className={`border-2 rounded-2xl p-2.5 flex flex-col items-center justify-center gap-0.5 transition-all duration-300 ${
                    paymentMethod === 'stripe' 
                      ? 'border-blue-500 bg-blue-50/20 scale-[1.03]' 
                      : 'border-slate-150 hover:border-blue-200 bg-white'
                  }`}
                >
                  <span className={`font-black text-xs ${paymentMethod === 'stripe' ? 'text-blue-600' : 'text-slate-500'}`}>stripe</span>
                  <span className="text-[8px] text-gray-400 text-center leading-tight font-bold">Cards</span>
                </button>
              </div>

              {/* Submit / Pay Button with pulse-glow */}
              <button 
                id="btn-submit-payment"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-teal-500 text-white py-3.5 rounded-full font-bold hover:bg-teal-600 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 mb-3 disabled:opacity-50 duration-300 animate-pulse-glow"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                {loading ? 'Processing...' : isBirthday ? `Pay Deposit RM ${price.toFixed(2)}` : `Pay RM ${price.toFixed(2)} Now`}
              </button>
              
              <div className="flex justify-center items-center gap-1.5 text-[10px] font-bold text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Secure & Encrypted SSL Gateway
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50/30 text-sm font-bold text-gray-500">Loading checkout details...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
