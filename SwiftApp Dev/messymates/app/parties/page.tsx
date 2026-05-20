'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const themes = [
  { name: 'Under the Sea', desc: 'Ocean sensory rice, sea creatures, shells & water play', color: 'text-blue-500 bg-blue-50' },
  { name: 'Dino Excavation', desc: 'Dino fossils, sand mud, volcanic rocks & foliage', color: 'text-green-600 bg-green-50' },
  { name: 'Unicorn Wonderland', desc: 'Pastel play dough, glitter, fairy wings & magic gems', color: 'text-pink-500 bg-pink-50' },
  { name: 'Outer Space Voyage', desc: 'Galaxy slime, glowing stars, rocket crafts & sensory rocks', color: 'text-purple-600 bg-purple-50' },
]

const getDefaultDate = () => {
  const d = new Date()
  d.setDate(d.getDate() + 14)
  return d.toISOString().split('T')[0]
}

const timeSlots = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM']

export default function BirthdayPartiesPage() {
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState<'birthday-basic' | 'birthday-premium'>('birthday-basic')
  const [selectedTheme, setSelectedTheme] = useState('Under the Sea')
  const [parentName, setParentName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [childName, setChildName] = useState('')
  const [childAge, setChildAge] = useState('')
  const [guestCount, setGuestCount] = useState('15')
  const [date, setDate] = useState(getDefaultDate())
  const [timeSlot, setTimeSlot] = useState('10:00 AM')
  const [venue, setVenue] = useState('')

  const isPremium = selectedPackage === 'birthday-premium'
  const basePrice = isPremium ? 850 : 450
  const depositAmount = isPremium ? 300 : 200
  const showGuestWarning = selectedPackage === 'birthday-basic' && parseInt(guestCount) > 15

  const handleBookNow = () => {
    // Validate inputs
    if (!parentName || !phone || !childName) {
      alert('Sila isi nama anda, nombor telefon, dan nama anak sebelum membuat tempahan.')
      return
    }

    const message = `Tema: ${selectedTheme}. Anggaran Tetamu: ${guestCount} kanak-kanak. Pakej: ${isPremium ? 'Premium' : 'Basic'}.`
    const url = `/booking/checkout?program=${selectedPackage}&date=${date}&time=${encodeURIComponent(timeSlot)}&childName=${encodeURIComponent(childName)}&childAge=${childAge}&allergies=None&parentName=${encodeURIComponent(parentName)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&venue=${encodeURIComponent(venue)}&message=${encodeURIComponent(message)}`
    
    router.push(url)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50/50 py-16 px-4 border-b border-pink-100/30 relative overflow-hidden">
        {/* Floating background shapes */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink-100/50 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-4 -left-12 w-48 h-48 bg-orange-100/40 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm">MessyMates Celebrations</span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            Magical Sensory <br className="hidden sm:inline" />
            <span className="text-pink-500">Birthday Parties</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            Let us bring the ultimate messy, creative, and stress-free sensory celebration to your home or private venue!
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <main className="max-w-6xl w-full mx-auto px-4 py-16 flex-1 grid lg:grid-cols-[1fr_400px] gap-12">
        
        {/* Left Side: Package Cards and Custom Themes */}
        <div className="space-y-12">
          
          {/* Package Selection Grid */}
          <div>
            <h2 className="font-black text-2xl text-gray-900 mb-6 tracking-tight">1. Choose a Party Package</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* Basic Package Card */}
              <div 
                onClick={() => setSelectedPackage('birthday-basic')}
                className={`bg-white rounded-[32px] p-6 border-2 transition-all duration-300 cursor-pointer relative group ${
                  selectedPackage === 'birthday-basic' 
                    ? 'border-pink-500 shadow-xl shadow-pink-500/5 scale-[1.02]' 
                    : 'border-slate-100 hover:border-pink-200 hover:shadow-lg'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase">Basic Pack</span>
                    <h3 className="font-black text-xl text-gray-900 mt-2">Sensa Play Setup</h3>
                  </div>
                  <span className="font-black text-2xl text-pink-500">RM 450</span>
                </div>
                
                <p className="text-xs text-gray-500 font-semibold mb-6">Perfect for up to 15 children for intimate home parties.</p>
                
                <ul className="space-y-2.5 text-xs text-gray-600 font-medium mb-6">
                  <li className="flex items-center gap-2">✓ 1.5 Hours of interactive sensory play</li>
                  <li className="flex items-center gap-2">✓ 2 Themed play stations (rice / sand / slime)</li>
                  <li className="flex items-center gap-2">✓ All safe, non-toxic materials provided</li>
                  <li className="flex items-center gap-2">✓ 1 Experienced MessyMates host</li>
                  <li className="flex items-center gap-2">✓ Full setup and stress-free cleanup</li>
                </ul>
              </div>

              {/* Premium Package Card */}
              <div 
                onClick={() => setSelectedPackage('birthday-premium')}
                className={`bg-white rounded-[32px] p-6 border-2 transition-all duration-300 cursor-pointer relative group ${
                  selectedPackage === 'birthday-premium' 
                    ? 'border-pink-500 shadow-xl shadow-pink-500/5 scale-[1.02]' 
                    : 'border-slate-100 hover:border-pink-200 hover:shadow-lg'
                }`}
              >
                <span className="absolute -top-3 right-6 bg-yellow-400 text-yellow-950 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">Popular</span>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold bg-pink-100 text-pink-700 px-3 py-1 rounded-full uppercase">Premium Deluxe</span>
                    <h3 className="font-black text-xl text-gray-900 mt-2">Sensa Mega Setup</h3>
                  </div>
                  <span className="font-black text-2xl text-pink-500">RM 850</span>
                </div>
                
                <p className="text-xs text-gray-500 font-semibold mb-6">Ultimate sensory experience for up to 30 children.</p>
                
                <ul className="space-y-2.5 text-xs text-gray-600 font-medium mb-6">
                  <li className="flex items-center gap-2">✓ 2.5 Hours of play + mini canvas art session</li>
                  <li className="flex items-center gap-2">✓ 4 Premium themed sensory stations</li>
                  <li className="flex items-center gap-2">✓ Personalized welcome sign for the birthday star</li>
                  <li className="flex items-center gap-2">✓ Take-home custom mini sensory jars for guests</li>
                  <li className="flex items-center gap-2">✓ 2 Experienced MessyMates hosts</li>
                  <li className="flex items-center gap-2">✓ Premium setup, tools, and complete cleanup</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <h2 className="font-black text-2xl text-gray-900 mb-2 tracking-tight">2. Select Your Party Theme</h2>
            <p className="text-xs text-gray-500 font-medium mb-6">Choose a themed sensory world that your child will fall in love with!</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {themes.map(t => (
                <div 
                  key={t.name}
                  onClick={() => setSelectedTheme(t.name)}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-start gap-3.5 ${
                    selectedTheme === t.name 
                      ? 'border-pink-400 bg-pink-50/20' 
                      : 'border-slate-100 bg-white hover:border-pink-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold ${t.color}`}>🎨</div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 mb-1">{t.name}</h4>
                    <p className="text-xs text-gray-500 font-semibold leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-inner">
            <h3 className="font-black text-xl text-gray-900 mb-6">How Our Birthday Booking Works</h3>
            <div className="grid sm:grid-cols-3 gap-6 relative">
              <div className="space-y-2">
                <span className="text-3xl">📅</span>
                <h4 className="font-bold text-sm text-gray-900">1. Submit Request</h4>
                <p className="text-xs text-gray-500 font-medium">Fill details & pick package. Proceed to checkout to book your deposit inquiry.</p>
              </div>
              <div className="space-y-2">
                <span className="text-3xl">📞</span>
                <h4 className="font-bold text-sm text-gray-900">2. Theme Customization</h4>
                <p className="text-xs text-gray-500 font-medium">Our coordinator will WhatsApp you to lock the date, venue details, and custom themes.</p>
              </div>
              <div className="space-y-2">
                <span className="text-3xl">🎈</span>
                <h4 className="font-bold text-sm text-gray-900">3. Party Time!</h4>
                <p className="text-xs text-gray-500 font-medium">We arrive 45 mins early to set up everything. Sit back and watch the little ones play!</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Sticky Booking Form */}
        <div>
          <div className="bg-white rounded-[32px] p-6 md:p-8 border border-slate-100 shadow-sm sticky top-24">
            <h3 className="font-black text-gray-900 text-lg mb-6 tracking-tight">Book Party Inquiry</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Parent Name *</label>
                <input 
                  type="text" 
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Amir Zainal"
                  className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-pink-400 bg-slate-50/50 transition-colors" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">WhatsApp No *</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0133456789"
                    className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-pink-400 bg-slate-50/50 transition-colors" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Email (Optional)</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amir@gmail.com"
                    className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-pink-400 bg-slate-50/50 transition-colors" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Child's Name *</label>
                  <input 
                    type="text" 
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="e.g. Aisyah"
                    className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-pink-400 bg-slate-50/50 transition-colors" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Age *</label>
                  <input 
                    type="number" 
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    placeholder="4"
                    className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-pink-400 bg-slate-50/50 transition-colors" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Estimated Kids</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-pink-400 bg-slate-50/50 transition-colors"
                  >
                    <option value="15">Up to 15 kids</option>
                    <option value="25">15 - 25 kids</option>
                    <option value="35">25 - 35 kids</option>
                    <option value="50">Over 35 kids</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-pink-400 bg-slate-50/50 transition-colors"
                  />
                </div>
              </div>

              {/* Guest count warning — Fix #4 */}
              {showGuestWarning && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-start gap-2.5">
                  <span className="text-amber-500 text-base shrink-0">⚠️</span>
                  <div>
                    <p className="text-xs font-bold text-amber-800">Basic Package covers up to 15 kids only.</p>
                    <p className="text-xs text-amber-600 font-medium mt-0.5">Consider upgrading to <button onClick={() => setSelectedPackage('birthday-premium')} className="underline font-bold">Premium (RM 850)</button> for up to 30 kids.</p>
                  </div>
                </div>
              )}

              {/* Time Slot — Fix #3 */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Preferred Start Time</label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTimeSlot(t)}
                      className={`text-xs px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                        timeSlot === t
                          ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                          : 'bg-slate-100 text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Venue — Fix #2 */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Party Venue / Address *</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. No 12, Jalan Teratai, Taman Desa, KL"
                  className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-pink-400 bg-slate-50/50 transition-colors"
                />
              </div>

              {/* Package Summary breakdown — Fix #6 deposit */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-2 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                  <span>Selected Theme:</span>
                  <span className="text-pink-600 font-semibold">{selectedTheme}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 font-semibold">
                  <span>Package Price:</span>
                  <span>RM {basePrice}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-900 pt-2 border-t border-slate-200">
                  <span>Deposit Required Now:</span>
                  <span className="text-pink-600">RM {depositAmount}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Remaining RM {basePrice - depositAmount} payable on party day.</p>
              </div>

              {/* Submit Button */}
              <button
                id="btn-book-party"
                onClick={handleBookNow}
                className="w-full bg-pink-500 text-white py-3.5 rounded-full font-bold hover:bg-pink-600 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-md shadow-pink-500/20 duration-300 animate-pulse-glow mt-2"
              >
                Pay Deposit (RM {depositAmount})
              </button>

              <p className="text-[10px] text-center text-gray-400 font-medium">Secure deposit to lock your party date. Balance payable on the day.</p>

            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
