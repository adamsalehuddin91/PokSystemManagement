import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const programs = [
  { name: 'Sensory Play', age: '1–4 tahun', price: 'RM 80/sesi', img: '/images/messymates/program-sensory-play.png', desc: 'Penerokaan deria melalui tekstur, warna & bunyi.' },
  { name: 'Art Class', age: '3–7 tahun', price: 'RM 65/sesi', img: '/images/messymates/program-art-class.png', desc: 'Melukis, mewarna & kraftangan kreatif.' },
  { name: 'Slime Lab', age: '4–8 tahun', price: 'RM 50/sesi', img: '/images/messymates/program-slime-lab.png', desc: 'Buat slime sendiri — sains yang seronok!' },
]

const products = [
  { name: 'Sensory Kit', price: 'RM 45', img: '/images/messymates/product-sensory-kit.png' },
  { name: 'Art Set', price: 'RM 38', img: '/images/messymates/product-art-set.png' },
  { name: 'Slime Kit', price: 'RM 28', img: '/images/messymates/product-slime-kit.png' },
  { name: 'DIY Pack', price: 'RM 55', img: '/images/messymates/product-diy-pack.png' },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-orange-50 py-16 px-4 sm:py-24">
        {/* Decorative bubbles */}
        <div className="absolute top-10 left-10 w-16 h-16 rounded-full border-4 border-orange-200/60"></div>
        <div className="absolute top-40 right-20 w-8 h-8 rounded-full bg-pink-200/50"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 rounded-full border-4 border-green-200/60"></div>
        <div className="absolute top-24 left-1/2 w-6 h-6 rounded-full bg-yellow-300/50"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="mb-4 text-orange-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="inline-block">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-[56px] font-bold leading-[1.1] mb-6">
              <span className="text-orange-400">Play</span> with purpose.<br />
              <span className="text-green-500">Grow</span> with joy.
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-[400px]">
              Boutique sensory play & enrichment for curious little minds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="bg-green-500 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-green-600 transition-colors shadow-sm"
              >
                Book a Session
              </Link>
              <Link
                href="/#shop"
                className="bg-white text-orange-500 border border-orange-200 px-8 py-3.5 rounded-full font-semibold hover:bg-orange-50 transition-colors"
              >
                Shop SENSA
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="w-full rounded-[40px] overflow-hidden shadow-2xl relative z-10 border-4 border-white">
              <Image
                src="/images/messymates/hero-banner.png"
                alt="Kid playing with sensory tray"
                width={800}
                height={600}
                className="w-full h-[450px] object-cover"
              />
            </div>
            {/* Decorative background shape */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-yellow-100 rounded-[40px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* The MessyMates Method */}
      <section id="about" className="py-20 px-4 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] font-bold text-gray-900 mb-3">The <span className="text-rose-500">Messy</span><span className="text-blue-500">Mates</span> Method</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-[15px]">
            Sensory-rich experiences that build confidence, creativity<br/>and real-world skills through play.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/><path d="M6 11V6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v0"/></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Sensory Exploration</h3>
              <p className="text-xs text-gray-500">Hands-on discovery</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4 text-yellow-500">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Life Skills</h3>
              <p className="text-xs text-gray-500">Independence & confidence</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 text-rose-500">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Social Growth</h3>
              <p className="text-xs text-gray-500">Communication & empathy</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-500">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Joyful Learning</h3>
              <p className="text-xs text-gray-500">Play with purpose</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Experiences */}
      <section id="experiences" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-gray-900 mb-2">Explore Our Experiences</h2>
            <p className="text-gray-500">Programs designed for every stage, interest and setting.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Studio */}
            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 mb-6 relative">
                <Image src="/images/messymates/explore-studio.png" alt="Studio" fill sizes="192px" className="rounded-full object-cover" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Studio</h3>
              <p className="text-sm text-gray-600 mb-4 px-4">
                Sensory play, art, music, cooking & more in our beautiful play spaces.
              </p>
              <Link href="/#studio" className="text-green-600 font-medium text-sm hover:underline">
                Explore Studio <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Agro */}
            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 mb-6 relative">
                <Image src="/images/messymates/explore-agro.png" alt="Agro-Education" fill sizes="192px" className="rounded-full object-cover" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Agro-Education</h3>
              <p className="text-sm text-gray-600 mb-4 px-4">
                Farm adventures, nature learning & sustainable play.
              </p>
              <Link href="/#agro" className="text-green-600 font-medium text-sm hover:underline">
                Explore Agro <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Corporate */}
            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 mb-6 relative">
                <Image src="/images/messymates/explore-corporate.png" alt="Corporate" fill sizes="192px" className="rounded-full object-cover" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Corporate & Hospitality</h3>
              <p className="text-sm text-gray-600 mb-4 px-4">
                Team-building, family days & wellness experiences for the workplace.
              </p>
              <Link href="/#corporate" className="text-green-600 font-medium text-sm hover:underline">
                Explore Corporate <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Our Programs */}
      <section id="programs" className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-gray-900 mb-2">Our Programs</h2>
            <p className="text-gray-500">Enriching activities for every little explorer.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div key={program.name} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <Image src={program.img} alt={program.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{program.name}</h3>
                    <span className="text-green-600 font-bold text-sm">{program.price}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{program.age}</p>
                  <p className="text-sm text-gray-600 mb-5">{program.desc}</p>
                  <Link href="/booking" className="block w-full text-center bg-green-500 text-white py-2.5 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SENSA Shop */}
      <section id="shop" className="bg-white pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Shop Nav */}
          <div className="flex items-center gap-6 mb-12 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="text-rose-500 bg-rose-50 p-1 rounded-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" /></svg>
              </div>
              <span className="font-bold text-xl text-orange-700">SENSA</span>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500 ml-8">
              <Link href="/shop" className="text-orange-500">Shop</Link>
              <Link href="/shop/playbooks" className="hover:text-orange-500">Playbooks</Link>
              <Link href="/shop/parties" className="hover:text-orange-500">Parties</Link>
              <Link href="/shop/about" className="hover:text-orange-500">About SENSA</Link>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
              <div className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full">2</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
            {/* SENSA Play Essentials Banner */}
            <div className="bg-amber-50 rounded-[32px] p-8 flex flex-col items-start relative overflow-hidden h-[400px]">
              <div className="relative z-10 w-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">SENSA Play Essentials <span className="text-yellow-400">✨</span></h3>
                <p className="text-gray-600 text-sm mb-6 max-w-[200px]">
                  Thoughtfully curated for meaningful sensory play.
                </p>
                <Link
                  href="/shop"
                  className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-orange-600 transition-colors inline-block"
                >
                  Shop Now
                </Link>
              </div>
              <div className="absolute right-0 bottom-0 w-3/4 h-3/4">
                 <Image src="/images/messymates/sensa-banner.png" alt="Play Essentials" fill sizes="(max-width: 768px) 100vw, 50vw" loading="eager" className="object-contain object-bottom right-0" />
              </div>
            </div>

            {/* Best Sellers */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-gray-900">Best Sellers</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product, i) => (
                  <div key={product.name} className="group cursor-pointer">
                    <div className="bg-gray-50 rounded-2xl aspect-square mb-3 relative overflow-hidden">
                      {i === 0 && <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-sm z-10">Bestseller</span>}
                      <Image src={product.img} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1 leading-tight">{product.name}</h4>
                    <div className="font-bold text-sm mb-3">{product.price}</div>
                    <button className="w-full border border-green-200 text-green-600 py-2 rounded-full text-xs font-medium hover:bg-green-50">Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Bar */}
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center py-10 mt-10 border-t border-b border-gray-100 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Safe Materials</div>
                <div className="text-xs text-gray-500">Safe for kids</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Curated with Love</div>
                <div className="text-xs text-gray-500">Designed for play</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Fast Delivery</div>
                <div className="text-xs text-gray-500">Across Malaysia</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Trusted by Parents</div>
                <div className="text-xs text-gray-500">Loved by schools</div>
              </div>
            </div>
          </div>

          {/* Digital Playbooks Banner */}
          <div className="mt-12 bg-gray-50 rounded-[24px] p-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Playbooks</h3>
              <p className="text-gray-600 text-sm">Instant download • Fun themes • Easy activities</p>
            </div>
            <Link
              href="/shop/playbooks"
              className="mt-4 md:mt-0 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors inline-flex items-center gap-2"
            >
              Browse Playbooks <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
