'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

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

  const selected = programs.find(p => p.id === selectedId)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Steps */}
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -z-10 -translate-y-1/2"></div>
          
          <div className="flex items-center gap-2 bg-slate-50 px-2">
            <div className="w-8 h-8 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold text-sm">1</div>
            <span className="font-semibold text-gray-900 text-sm">Choose Session</span>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 px-2">
            <div className="w-8 h-8 rounded-full bg-white text-gray-400 border-2 border-gray-200 flex items-center justify-center font-bold text-sm">2</div>
            <span className="font-medium text-gray-400 text-sm">Child & Time</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-2">
            <div className="w-8 h-8 rounded-full bg-white text-gray-400 border-2 border-gray-200 flex items-center justify-center font-bold text-sm">3</div>
            <span className="font-medium text-gray-400 text-sm">Add-ons</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-2">
            <div className="w-8 h-8 rounded-full bg-white text-gray-400 border-2 border-gray-200 flex items-center justify-center font-bold text-sm">4</div>
            <span className="font-medium text-gray-400 text-sm">Review</span>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_380px] gap-8">
          
          {/* Left Column */}
          <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="bg-[#0d9488] text-white px-5 py-2 rounded-full text-sm font-medium">All Sessions</button>
              <button className="bg-gray-50 text-gray-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">Studio</button>
              <button className="bg-gray-50 text-gray-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">Agro</button>
              <button className="bg-gray-50 text-gray-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">Special</button>
              <button className="bg-gray-50 text-gray-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">Parties</button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-4">
              {programs.map(p => (
                <div key={p.id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:border-teal-100 transition-colors cursor-pointer" onClick={() => setSelectedId(p.id)}>
                  <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
                    <Image src={p.img} alt={p.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{p.name}</h3>
                        {p.tag && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{p.tag}</span>}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{p.spots}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{p.age}</p>
                    <div className="flex gap-2">
                      {p.times.map(t => (
                        <button 
                          key={t}
                          onClick={(e) => { e.stopPropagation(); setSelectedId(p.id); setSelectedTime(t); }}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${selectedId === p.id && selectedTime === t ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl mt-2 bg-rose-50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">🎂</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Birthday Packages</h3>
                    <p className="text-xs text-gray-600">Custom celebration</p>
                  </div>
                </div>
                <button className="border border-teal-200 text-teal-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-white bg-white/50">View Packages</button>
              </div>
            </div>

            {/* Need Help */}
            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Need help choosing? </span>
                <a href="#" className="text-teal-600 font-medium">Chat with us on WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Right Column - Cart */}
          <div>
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-6 text-lg">Your Booking</h2>
              
              {/* Profile */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-xl overflow-hidden">
                     <Image src="/images/messymates/child-avatar.png" alt="Child" width={40} height={40} className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Aisyah Binti Amir</h4>
                    <p className="text-xs text-gray-500">Age 4 yrs</p>
                  </div>
                </div>
                <button className="text-teal-600 text-xs font-medium hover:underline">Change</button>
              </div>

              {/* Selected Session */}
              {selected && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Selected</p>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{selected.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">Sat, 10 May 2025</p>
                  <p className="text-sm text-gray-700 mb-4">{selectedTime} - {selectedTime === '9:30 AM' ? '10:30 AM' : '1 Hour Later'}</p>
                  <div className="text-xs text-gray-500 flex items-start gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Pusat TJC, Desaru
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="flex justify-between items-center text-sm mb-3 text-gray-600">
                <span>Spots</span>
                <span>12 / 15</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-4 text-gray-600">
                <span>Price</span>
                <span>RM {selected?.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-gray-900 text-lg mb-6 pt-4 border-t border-gray-100">
                <span>Subtotal</span>
                <span>RM {selected?.price.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => router.push('/booking/checkout')}
                className="w-full bg-[#0d9488] text-white py-3.5 rounded-full font-semibold hover:bg-teal-700 transition-colors"
              >
                Continue to Child & Time
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
