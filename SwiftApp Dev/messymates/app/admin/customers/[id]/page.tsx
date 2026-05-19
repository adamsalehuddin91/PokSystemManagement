import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default function CustomerDetailPage() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-gray-900">Customer Profile</h1>
        <button className="text-sm text-gray-500 hover:text-teal-600 flex items-center gap-1.5 font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit
        </button>
      </div>

      <div className="grid grid-cols-[1fr_350px] gap-8 mb-8">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Main Profile Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 bg-rose-100 rounded-full overflow-hidden shrink-0">
                <Image src="/images/messymates/child-avatar.png" width={80} height={80} alt="Child Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">Aisyah Binti Amir</h2>
                  <span className="text-yellow-400"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Active Member</span>
                  <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Taska</span>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                  <div>Parent: <span className="font-medium text-gray-900">Amir Zainal</span></div>
                  <div>Phone: <span className="font-medium text-gray-900">+60 13-345 6789</span></div>
                  <div>Email: <span className="font-medium text-gray-900">amir.zainal@gmail.com</span></div>
                  <div>Address: <span className="font-medium text-gray-900">Desaru, Bandar Penawar, Johor</span></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4 mb-8">
              <button className="flex flex-col items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                <span className="text-xs font-medium">Message</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg></div>
                <span className="text-xs font-medium">Add Booking</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
                <span className="text-xs font-medium">Send Waiver</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-yellow-500 hover:text-yellow-600 transition-colors">
                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                <span className="text-xs font-medium">Follow-up</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-gray-100 mb-6">
              <button className="text-sm font-bold text-teal-600 border-b-2 border-teal-600 pb-2">Children</button>
              <button className="text-sm font-medium text-gray-400 pb-2 hover:text-gray-600">Activity History</button>
              <button className="text-sm font-medium text-gray-400 pb-2 hover:text-gray-600">Payments</button>
              <button className="text-sm font-medium text-gray-400 pb-2 hover:text-gray-600">Notes</button>
            </div>

            {/* Tab Content (Children) */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full overflow-hidden shrink-0">
                    <Image src="/images/messymates/child-avatar.png" width={48} height={48} alt="Child" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Aisyah Binti Amir</h4>
                    <p className="text-xs text-gray-500">Age: 4 yrs</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Allergies: Peanut</p>
                  </div>
                </div>
                <button className="text-teal-600 text-xs font-medium hover:underline">Edit</button>
              </div>
            </div>
            
            <button className="text-teal-600 text-sm font-medium flex items-center justify-center w-full py-3 border border-dashed border-teal-200 rounded-2xl hover:bg-teal-50 transition-colors">
              + Add Another Child
            </button>
          </div>

          {/* Activity History */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 text-sm">Recent Activities</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-[100px_1fr_80px] gap-4 items-center text-sm border-b border-gray-50 pb-3">
                <span className="text-gray-500 text-xs">10 May 2025</span>
                <span className="font-medium text-gray-900">Messy Play</span>
                <span className="text-green-600 text-xs text-right">Attended</span>
              </div>
              <div className="grid grid-cols-[100px_1fr_80px] gap-4 items-center text-sm border-b border-gray-50 pb-3">
                <span className="text-gray-500 text-xs">16 May 2025</span>
                <span className="font-medium text-gray-900">Art Class</span>
                <span className="text-green-600 text-xs text-right">Attended</span>
              </div>
              <div className="grid grid-cols-[100px_1fr_80px] gap-4 items-center text-sm border-b border-gray-50 pb-3">
                <span className="text-gray-500 text-xs">24 Apr 2025</span>
                <span className="font-medium text-gray-900">Junior Chef</span>
                <span className="text-green-600 text-xs text-right">Attended</span>
              </div>
              <div className="grid grid-cols-[100px_1fr_80px] gap-4 items-center text-sm border-b border-gray-50 pb-3">
                <span className="text-gray-500 text-xs">19 Apr 2025</span>
                <span className="font-medium text-gray-900">Little Hero Series</span>
                <span className="text-green-600 text-xs text-right">Attended</span>
              </div>
            </div>
            <button className="text-teal-600 text-xs font-medium hover:underline mt-4">View all activity &rarr;</button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Birthday / Packages Interest */}
          <div className="bg-teal-50 rounded-3xl p-6 border border-teal-100 relative shadow-sm">
             <button className="absolute top-6 right-6 text-teal-600 hover:text-teal-800">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
             </button>
             <h3 className="font-bold text-teal-900 text-sm mb-4">Birthday / Packages Interest</h3>
             <div className="flex flex-col gap-2 text-sm text-teal-800">
               <div>Interested In: <span className="font-medium">Party Package</span></div>
               <div>Preferred Month: <span className="font-medium">June</span></div>
               <div>Theme: <span className="font-medium">Ocean / Little Mermaid</span></div>
               <div>Follow-up: <span className="font-medium">20 May 2025</span></div>
             </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Payment History</h3>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-[90px_1fr_40px] items-center text-xs">
                <span className="text-gray-500">10 May 2025</span>
                <span className="font-medium text-gray-900 text-right pr-4">RM 85.00</span>
                <span className="text-green-600 text-right">Paid</span>
              </div>
              <div className="grid grid-cols-[90px_1fr_40px] items-center text-xs">
                <span className="text-gray-500">16 May 2025</span>
                <span className="font-medium text-gray-900 text-right pr-4">RM 65.00</span>
                <span className="text-green-600 text-right">Paid</span>
              </div>
              <div className="grid grid-cols-[90px_1fr_40px] items-center text-xs">
                <span className="text-gray-500">24 Apr 2025</span>
                <span className="font-medium text-gray-900 text-right pr-4">RM 130.00</span>
                <span className="text-green-600 text-right">Paid</span>
              </div>
            </div>
            <button className="text-teal-600 text-xs font-medium hover:underline mt-4">View all payments &rarr;</button>
          </div>

          {/* Notes & Allergies */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Notes & Allergies</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Peanut allergy, Sensitive skin.<br/>
              Avoid strong scents.
            </p>
          </div>

          {/* Internal Notes */}
          <div className="bg-yellow-50 rounded-3xl p-6 border border-yellow-100 shadow-sm">
            <h3 className="font-bold text-yellow-900 text-sm mb-2">Internal Notes (Staff)</h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Very active and friendly.<br/>
              Loves ocean theme activities!
            </p>
          </div>
        </div>
      </div>

      {/* Footer Stats Bar */}
      <div className="flex items-center justify-end gap-8 border-t border-gray-200 pt-6 mt-4">
        <div className="text-sm">
          <span className="text-gray-500 mr-2">Total Bookings:</span>
          <span className="font-bold text-gray-900">12</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500 mr-2">Total Spent:</span>
          <span className="font-bold text-gray-900">RM 1,040.00</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500 mr-2">Member Since:</span>
          <span className="font-medium text-gray-900">Jan 2025</span>
        </div>
      </div>
    </div>
  )
}
