'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const programs = [
  { id: 'messy', name: 'Messy Play', age: 'Ages 1.5 - 6 yrs', times: ['9:30 AM', '10:00 AM', '2:00 PM'], spots: '12 / 15 spots', price: 85, img: '/images/messymates/program-sensory-play.png' },
  { id: 'art', name: 'Art Class', age: 'Ages 3 - 6 yrs', times: ['10:00 AM', '1:00 PM', '3:00 PM'], spots: '8 / 12 spots', price: 65, img: '/images/messymates/program-art-class.png' },
  { id: 'speaking', name: 'Public Speaking', age: 'Ages 5 - 10 yrs', times: ['11:30 AM', '2:30 PM'], spots: '6 / 10 spots', price: 90, img: '/images/messymates/program-public-speaking.png' },
  { id: 'hero', name: 'Little Hero Series', age: 'Ages 4 - 8 yrs', times: ['10:30 AM', '1:30 PM'], spots: '10 / 12 spots', price: 75, tag: 'New', img: '/images/messymates/program-little-hero.png' },
  { id: 'chef', name: 'Junior Chef', age: 'Ages 4 - 9 yrs', times: ['11:30 AM', '1:00 PM'], spots: '6 / 8 spots', price: 80, img: '/images/messymates/program-junior-chef.png' },
]

export default function BookingPage() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState('messy')
  const [selectedTime, setSelectedTime] = useState('9:30 AM')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const selected = programs.find(p => p.id === selectedId)

  // Filter based on category tabs
  const filteredPrograms = programs.filter(p => {
    if (selectedCategory === 'All') return true
    if (selectedCategory === 'Special') return p.id === 'hero' || p.id === 'chef'
    if (selectedCategory === 'Studio') return p.id === 'messy' || p.id === 'art'
    return true
  })

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      <Navbar />
      
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Steps */}
        <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -z-10 -translate-y-1/2"></div>
          
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-teal-100 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">1</div>
            <span className="font-bold text-gray-900 text-xs md:text-sm">Session</span>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-150 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-slate-100 text-gray-400 border border-slate-200 flex items-center justify-center font-bold text-xs">2</div>
            <span className="font-medium text-gray-400 text-xs md:text-sm">Details</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-150 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-slate-100 text-gray-400 border border-slate-200 flex items-center justify-center font-bold text-xs">3</div>
            <span className="font-medium text-gray-400 text-xs md:text-sm">Waiver</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-150 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-slate-100 text-gray-400 border border-slate-200 flex items-center justify-center font-bold text-xs">4</div>
            <span className="font-medium text-gray-400 text-xs md:text-sm">Pay</span>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_380px] gap-8">
          
          {/* Left Column */}
          <div className="bg-white rounded-[32px] shadow-sm p-6 md:p-8 border border-slate-100">
            {/* Filters */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {['All', 'Studio', 'Special', 'Parties'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-[1.03]'
                      : 'bg-slate-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-transparent'
                  }`}
                >
                  {cat === 'All' ? 'All Sessions' : cat}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex flex-col gap-4">
              {filteredPrograms.map(p => (
                <div 
                  key={p.id} 
                  className={`flex flex-col sm:flex-row gap-4 p-5 rounded-3xl border transition-all duration-300 group cursor-pointer ${
                    selectedId === p.id 
                      ? 'border-teal-200 bg-teal-50/20 shadow-md shadow-teal-50/50' 
                      : 'border-slate-100 bg-slate-50/30 hover:border-teal-100 hover:bg-white hover:shadow-lg'
                  }`} 
                  onClick={() => {
                    setSelectedId(p.id);
                    setSelectedTime(p.times[0]);
                  }}
                >
                  {/* Program Image */}
                  <div className="w-full sm:w-24 h-24 rounded-2xl overflow-hidden relative shrink-0 border border-slate-100 shadow-inner">
                    <Image src={p.img} alt={p.name} fill sizes="96px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  {/* Program Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-black text-gray-900 text-base md:text-lg tracking-tight">{p.name}</h3>
                        {p.tag && <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">New</span>}
                      </div>
                      <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded-md shrink-0">{p.spots}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 font-semibold">{p.age}</p>
                    
                    {/* Time Selectors */}
                    <div className="flex flex-wrap gap-2">
                      {p.times.map(t => (
                        <button 
                          key={t}
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setSelectedId(p.id); 
                            setSelectedTime(t); 
                          }}
                          className={`text-xs px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                            selectedId === p.id && selectedTime === t 
                              ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20 scale-[1.03]' 
                              : 'bg-white text-gray-600 border border-slate-200 hover:border-teal-200 hover:text-teal-500'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Birthday Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-[28px] mt-4 bg-gradient-to-r from-pink-50/70 to-orange-50/70 border border-pink-100/30 shadow-sm relative overflow-hidden group">
                <div className="flex items-center gap-4 relative z-10 text-center sm:text-left flex-col sm:flex-row mb-4 sm:mb-0">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0 animate-float">🎂</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Birthday Celebration Packages</h3>
                    <p className="text-xs text-gray-500 font-medium">Host a memorable, sensory-rich private party for your child.</p>
                  </div>
                </div>
                <Link
                  href="/parties"
                  className="bg-pink-500 text-white px-5 py-3 rounded-full text-xs font-bold hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 shadow-md shadow-pink-500/10 shrink-0 relative z-10 duration-300"
                >
                  View Packages
                </Link>
              </div>
            </div>

            {/* Need Help WhatsApp */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-inner border border-green-100/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </div>
              <div className="text-xs font-bold">
                <span className="text-gray-500 font-semibold">Need help choosing a slot? </span>
                <a href="https://wa.me/60123456789" target="_blank" className="text-green-600 hover:underline">Chat with us on WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary Card */}
          <div>
            <div className="bg-white rounded-[32px] shadow-sm p-6 border border-slate-100 sticky top-24">
              <h2 className="font-black text-gray-900 mb-6 text-lg tracking-tight">Booking Summary</h2>
              
              {/* Active Child Profile */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-xl overflow-hidden border border-rose-200">
                     <Image src="/images/messymates/child-avatar.png" alt="Child" width={40} height={40} className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs">Aisyah Binti Amir</h4>
                    <p className="text-[10px] text-gray-500 font-medium">Age 4 yrs</p>
                  </div>
                </div>
                <button className="text-teal-600 text-xs font-bold hover:underline">Change</button>
              </div>

              {/* Selected Session summary */}
              {selected && (
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block mb-1">Selected Session</span>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{selected.name}</h3>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      Saturday, 10 May 2025
                    </p>
                    <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {selectedTime} - {selectedTime === '9:30 AM' ? '10:30 AM' : '1 Hour Later'}
                    </p>
                    <p className="text-xs font-medium text-gray-500 flex items-start gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Pusat TJC, Desaru
                    </p>
                  </div>
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs text-gray-600 font-semibold">
                  <span>Slot availability</span>
                  <span className="text-gray-900 font-bold">{selected?.spots.split(' ')[0]} available</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600 font-semibold">
                  <span>Standard Admission</span>
                  <span>RM {selected?.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-gray-900 text-sm mb-6 pt-4 border-t border-slate-100">
                  <span>Subtotal</span>
                  <span>RM {selected?.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Continue button with pulse-glow */}
              <button 
                id="btn-continue-checkout"
                onClick={() => router.push(`/booking/checkout?program=${selectedId === 'messy' ? 'sensory' : selectedId}&date=2025-05-10&time=${encodeURIComponent(selectedTime)}&childName=Aisyah%20Binti%20Amir&childAge=4&allergies=Peanuts&parentName=Amir%20Zainal&phone=%2B60133456789&email=amir.zainal%40gmail.com`)}
                className="w-full bg-teal-500 text-white py-3.5 rounded-full font-bold hover:bg-teal-600 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-md shadow-teal-500/20 duration-300 animate-pulse-glow"
              >
                Continue to Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
