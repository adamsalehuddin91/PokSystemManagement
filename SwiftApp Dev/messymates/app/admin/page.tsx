import Image from 'next/image'

export const dynamic = 'force-dynamic'

const programImgs: Record<string, string> = {
  'Messy Play': '/images/messymates/program-sensory-play.png',
  'Art Class': '/images/messymates/program-art-class.png',
  'Junior Chef': '/images/messymates/program-slime-lab.png',
  'Little Hero Series': '/images/messymates/hero-banner.png',
}

const productImgs: Record<string, string> = {
  'Sensa Tuff Tray': '/images/messymates/product-sensory-kit.png',
  'Sensory Play Set': '/images/messymates/product-art-set.png',
  'Custom Goodies': '/images/messymates/product-diy-pack.png',
}

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500 font-medium">
            Date Range: <span className="text-gray-900">1 - 14 May 2025</span>
          </div>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <button className="bg-[#0d9488] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-700 transition-colors flex items-center gap-2">
            + New Booking
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Total Parents</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900">1,248</span>
              <span className="text-[10px] text-green-600 font-medium pb-1 flex items-center">↑ 12% from last month</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Active Children</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900">1,436</span>
              <span className="text-[10px] text-green-600 font-medium pb-1 flex items-center">↑ 15% from last month</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Upcoming Bookings</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900">28</span>
              <span className="text-xs text-gray-500 pb-0.5">Tomorrow: 10</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center">
            <span className="font-bold">RM</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Revenue (This Month)</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900">RM 8,620</span>
              <span className="text-[10px] text-green-600 font-medium pb-1 flex items-center">↑ 18% from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid 1: Bookings, Checkins, Inquiries */}
      <div className="grid grid-cols-[2fr_1.5fr_1.5fr] gap-6 mb-6">
        {/* Upcoming Bookings */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 text-sm">Upcoming Bookings</h3>
          <div className="flex flex-col gap-4">
            {[
              { name: 'Messy Play', time: '10 May, 9:30 AM', child: 'Aisyah Amir' },
              { name: 'Art Class', time: '10 May, 10:00 AM', child: 'Zayn Malik' },
              { name: 'Junior Chef', time: '10 May, 1:00 PM', child: 'Alisha Sofea' },
              { name: 'Little Hero Series', time: '10 May, 1:30 PM', child: 'Harith Danial' },
            ].map((b) => (
              <div key={b.child} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                    <Image src={programImgs[b.name] ?? ''} width={32} height={32} alt={b.name} className="object-cover w-full h-full" />
                  </div>
                  <div><div className="font-semibold text-gray-900">{b.name}</div><div className="text-[10px] text-gray-500">{b.time}</div></div>
                </div>
                <div className="text-gray-600">{b.child}</div>
              </div>
            ))}
          </div>
          <button className="text-teal-600 text-xs font-medium hover:underline mt-6">View all bookings &rarr;</button>
        </div>

        {/* Check-ins Today */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6 text-sm">Check-ins Today</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-32 h-32 rounded-full border-[12px] border-teal-500 border-r-yellow-400 border-b-rose-400"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">36</span>
              <span className="text-[10px] text-gray-500">Checked In</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
             <div className="flex justify-between items-center text-[11px]"><div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-500"></div><span className="text-gray-600">Checked In</span></div><span className="font-bold">36 (72%)</span></div>
             <div className="flex justify-between items-center text-[11px]"><div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-400"></div><span className="text-gray-600">No-show</span></div><span className="font-bold">3 (6%)</span></div>
             <div className="flex justify-between items-center text-[11px]"><div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-yellow-400"></div><span className="text-gray-600">Pending</span></div><span className="font-bold">11 (22%)</span></div>
          </div>
          <button className="text-teal-600 text-xs font-medium hover:underline mt-4 text-center">View attendance &rarr;</button>
        </div>

        {/* Birthday Package Inquiries */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 text-sm">Birthday Package Inquiries</h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600"><span className="text-xs font-bold">N</span></div>
                <div className="font-medium text-gray-900">Nurul & Firdaus</div>
              </div>
              <span className="text-xs text-gray-500">Today</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><span className="text-xs font-bold">W</span></div>
                <div className="font-medium text-gray-900">Walin Wong</div>
              </div>
              <span className="text-xs text-gray-500">9 May</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600"><span className="text-xs font-bold">L</span></div>
                <div className="font-medium text-gray-900">Linda & Raj</div>
              </div>
              <span className="text-xs text-gray-500">8 May</span>
            </div>
          </div>
          <button className="text-teal-600 text-xs font-medium hover:underline mt-12 block">View all inquiries &rarr;</button>
        </div>
      </div>

      {/* Grid 2: Products, Payments, Repeat, Quick Actions */}
      <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr] gap-6">
        
        {/* Product Sales */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 text-sm">Product Sales (This Month)</h3>
          <div className="flex flex-col gap-4">
            {[
              { name: 'Sensa Tuff Tray', revenue: 'RM 2,180' },
              { name: 'Sensory Play Set', revenue: 'RM 1,290' },
              { name: 'Custom Goodies', revenue: 'RM 1,170' },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={productImgs[p.name] ?? ''} width={32} height={32} alt={p.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="font-medium text-gray-900">{p.name}</div>
                </div>
                <div className="font-bold text-gray-900">{p.revenue}</div>
              </div>
            ))}
          </div>
          <button className="text-teal-600 text-xs font-medium hover:underline mt-6">View all sales &rarr;</button>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 text-sm">Recent Payments</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-[10px] font-bold">A</div>
                <div className="text-gray-600 text-xs">Aisyah Amir</div>
              </div>
              <div className="font-bold text-gray-900 text-xs">RM 85.00</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">W</div>
                <div className="text-gray-600 text-xs">Walin Wong</div>
              </div>
              <div className="font-bold text-gray-900 text-xs">RM 210.00</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-[10px] font-bold">A</div>
                <div className="text-gray-600 text-xs">Adam Hakim</div>
              </div>
              <div className="font-bold text-gray-900 text-xs">RM 129.00</div>
            </div>
          </div>
          <button className="text-teal-600 text-xs font-medium hover:underline mt-8 block">View all payments &rarr;</button>
        </div>

        {/* Repeat Customer Rate */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center">
          <h3 className="font-bold text-gray-900 mb-4 text-sm w-full">Repeat Customer Rate</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full border-[8px] border-teal-500 border-t-gray-100 flex flex-col items-center justify-center mb-4">
              <span className="text-2xl font-bold text-gray-900">68%</span>
            </div>
            <div className="text-[10px] text-green-600 font-medium pb-1 flex items-center">↑ 14% vs last month</div>
            <div className="text-[10px] text-gray-400">Based on bookings</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-2 h-[140px]">
            <button className="flex flex-col items-center justify-center gap-1.5 bg-gray-50 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-colors group">
              <div className="text-gray-400 group-hover:text-teal-500"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M12 14v6m-3-3h6"/></svg></div>
              <span className="text-[9px] font-medium text-gray-600 text-center leading-tight">Add Booking</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 bg-gray-50 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-colors group">
              <div className="text-gray-400 group-hover:text-teal-500"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="m16 11 2 2-2 2"/></svg></div>
              <span className="text-[9px] font-medium text-gray-600 text-center leading-tight">Walk-in Check-in</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 bg-gray-50 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-colors group">
              <div className="text-gray-400 group-hover:text-teal-500"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
              <span className="text-[9px] font-medium text-gray-600 text-center leading-tight">Send WhatsApp</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 bg-gray-50 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-colors group">
              <div className="text-gray-400 group-hover:text-teal-500"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg></div>
              <span className="text-[9px] font-medium text-gray-600 text-center leading-tight">Add Inquiry</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 bg-gray-50 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-colors group">
              <div className="text-gray-400 group-hover:text-teal-500"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg></div>
              <span className="text-[9px] font-medium text-gray-600 text-center leading-tight">View Reports</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 bg-gray-50 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-colors group">
              <div className="text-gray-400 group-hover:text-teal-500"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div>
              <span className="text-[9px] font-medium text-gray-600 text-center leading-tight">Manage Products</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
