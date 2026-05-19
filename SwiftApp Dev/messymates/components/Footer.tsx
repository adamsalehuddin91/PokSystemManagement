import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-teal-800 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎨</span>
            <span className="font-bold text-lg">MessyMates</span>
          </div>
          <p className="text-teal-200 text-sm">Boutique sensory play & creative arts for little ones.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Pautan</h4>
          <div className="flex flex-col gap-2 text-sm text-teal-200">
            <Link href="/#programs" className="hover:text-white transition-colors">Programs</Link>
            <Link href="/#about" className="hover:text-white transition-colors">About</Link>
            <Link href="/#shop" className="hover:text-white transition-colors">Shop</Link>
            <Link href="/booking" className="hover:text-white transition-colors">Book Now</Link>
          </div>
        </div>

        <div id="contact">
          <h4 className="font-semibold mb-3">Hubungi Kami</h4>
          <div className="flex flex-col gap-2 text-sm text-teal-200">
            <span>📍 Malaysia</span>
            <span>📞 +60 — — —</span>
            <span>✉ hello@messymates.my</span>
            <div className="flex gap-3 mt-2">
              <span className="cursor-pointer hover:text-white">FB</span>
              <span className="cursor-pointer hover:text-white">IG</span>
              <span className="cursor-pointer hover:text-white">TikTok</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-teal-700 text-center py-4 text-xs text-teal-300">
        © 2026 MessyMates. All rights reserved.
      </div>
    </footer>
  )
}
