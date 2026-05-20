'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Hardcoded products list
const allProducts = [
  {
    id: 'sensory-ocean',
    name: 'Ocean Adventure Sensory Kit',
    price: 45,
    category: 'Sensory Kits',
    img: '/images/messymates/product-sensory-kit.png',
    desc: 'Includes blue sensory rice, sea animal figurines, shells, scoopers, and ocean-themed loose parts.',
    bestseller: true
  },
  {
    id: 'sensory-dino',
    name: 'Dinosaur Dig Excavation Kit',
    price: 45,
    category: 'Sensory Kits',
    img: '/images/messymates/product-diy-pack.png',
    desc: 'Sandbox mixture, dino fossils, brush, magnifying glass, and mini dinosaur toys.'
  },
  {
    id: 'art-pastel',
    name: 'Pastel Acrylic Painting Set',
    price: 38,
    category: 'Art & Crafts',
    img: '/images/messymates/product-art-set.png',
    desc: '6 non-toxic pastel acrylic paint tubes, 3 wood canvas shapes, brushes, and mixing palette.'
  },
  {
    id: 'art-clay',
    name: 'Clay Modeling Magic Kit',
    price: 35,
    category: 'Art & Crafts',
    img: '/images/messymates/product-art-set.png',
    desc: 'Air-dry clay in 12 colors, molding tools, googly eyes, and step-by-step tutorial book.'
  },
  {
    id: 'slime-glow',
    name: 'Glow-in-the-Dark Slime Tub',
    price: 28,
    category: 'Slimes',
    img: '/images/messymates/product-slime-kit.png',
    desc: 'Pre-made neon slime that glows in dark conditions, with starry glitter mix-ins.',
    bestseller: true
  },
  {
    id: 'slime-cotton',
    name: 'Fluffy Cotton Candy Slime Set',
    price: 28,
    category: 'Slimes',
    img: '/images/messymates/product-slime-kit.png',
    desc: 'Super stretchy, scented fluffy slime with custom clay charms to mix in.'
  },
  {
    id: 'playbook-home',
    name: 'Messy Play Guide at Home (PDF)',
    price: 15,
    category: 'Digital Playbooks',
    img: '/images/messymates/sensa-banner.png',
    desc: 'Easy-to-follow sensory recipes, supply checklists, and setup tips for stress-free play.'
  },
  {
    id: 'playbook-outdoor',
    name: 'Outdoor Paint Craft Guide (PDF)',
    price: 15,
    category: 'Digital Playbooks',
    img: '/images/messymates/sensa-banner.png',
    desc: 'Digital download featuring 20 outdoor messy art activities for toddler and preschool kids.'
  }
]

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  img: string
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  // Load category from query string on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const catParam = params.get('category')
      if (catParam) {
        if (catParam.toLowerCase() === 'playbooks') {
          setSelectedCategory('Digital Playbooks')
        } else {
          const match = allProducts.find(p => p.category.toLowerCase().includes(catParam.toLowerCase()))
          if (match) setSelectedCategory(match.category)
        }
      }
    }
  }, [])

  const categories = ['All', 'Sensory Kits', 'Art & Crafts', 'Slimes', 'Digital Playbooks']

  // Filtered products
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Cart operations
  const addToCart = (product: typeof allProducts[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : null
      }
      return item
    }).filter(Boolean) as CartItem[])
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Generate Whatsapp Checkout URL
  const getWhatsappCheckoutLink = () => {
    const number = '60123456789' // Placeholder merchant number
    let message = 'Hi MessyMates! I would like to order the following SENSA items:\n\n'
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (x${item.quantity}) - RM ${item.price * item.quantity}\n`
    })
    message += `\n*Total Amount:* RM ${cartTotal}\n\n`
    message += 'Please assist me with payment and delivery details. Thanks!'
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50/50 py-12 px-4 border-b border-orange-100/40">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block">SENSA Play Shop</span>
          <h1 id="shop-title" className="text-3xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
            Sensa <span className="text-orange-500">Play</span> Essentials
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-[15px] font-medium">
            Hand-curated, safe sensory play kits and tools built to inspire curiosity, fine motor development, and hours of screen-free fun!
          </p>
        </div>
      </section>

      {/* Main Shop Container */}
      <main className="max-w-6xl w-full mx-auto px-4 py-12 flex-1">
        
        {/* Controls: Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map(cat => (
              <button
                key={cat}
                id={`btn-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.03]'
                    : 'bg-white text-gray-600 border border-slate-100 hover:border-orange-200 hover:text-orange-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              id="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search play essentials..."
              className="w-full bg-white pl-11 pr-4 py-2.5 rounded-full text-sm font-medium border border-slate-200 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors shadow-sm"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-3xl p-4 border border-slate-100 hover:shadow-xl hover:shadow-slate-100/70 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  {/* Image container */}
                  <div className="bg-slate-50 rounded-2xl aspect-square mb-4 relative overflow-hidden shadow-inner border border-slate-100">
                    {product.bestseller && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-950 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm z-10">Bestseller</span>
                    )}
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Category label */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 mb-1 block">{product.category}</span>
                  
                  {/* Name and description */}
                  <h3 className="font-bold text-gray-900 mb-1 leading-snug group-hover:text-orange-600 transition-colors">{product.name}</h3>
                  <p className="text-xs text-gray-500 font-medium line-clamp-2 mb-4">{product.desc}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-black text-lg text-gray-900">RM {product.price}</span>
                  </div>
                  <button
                    id={`btn-add-${product.id}`}
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-500 text-white py-3 rounded-full text-xs font-bold hover:bg-green-600 active:scale-95 transition-all shadow-md shadow-green-500/10 duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="font-bold text-gray-900 mb-1">No items found</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">We couldn't find anything matching your filters or search query.</p>
          </div>
        )}
      </main>

      {/* Floating Cart Button (visible if items in cart) */}
      {cartItemCount > 0 && !cartOpen && (
        <button
          id="btn-floating-cart"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-pink-500 text-white p-4 rounded-full shadow-lg shadow-pink-500/30 hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce flex items-center gap-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span className="font-bold text-sm bg-white text-pink-600 w-5 h-5 rounded-full flex items-center justify-center">{cartItemCount}</span>
        </button>
      )}

      {/* Cart Drawer Overlay */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
              onClick={() => setCartOpen(false)}
            ></div>

            {/* Panel */}
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-500 ease-in-out">
                <div className="flex h-full flex-col bg-white shadow-2xl rounded-l-[32px] border-l border-slate-100">
                  
                  {/* Drawer Header */}
                  <div className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 id="slide-over-title" className="text-lg font-black text-gray-900 flex items-center gap-2">
                      <span>Shopping Cart</span>
                      <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">{cartItemCount}</span>
                    </h2>
                    <button
                      id="btn-close-cart"
                      onClick={() => setCartOpen(false)}
                      className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-slate-50 transition-colors"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                    {cart.length > 0 ? (
                      cart.map(item => (
                        <div key={item.id} className="flex gap-4 p-3 bg-slate-50/50 rounded-2xl border border-slate-100 relative group">
                          {/* Remove button */}
                          <button
                            id={`btn-remove-${item.id}`}
                            onClick={() => removeFromCart(item.id)}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-white hover:bg-red-50 text-red-500 rounded-full border border-slate-200 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>

                          {/* Image */}
                          <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden border border-slate-150 flex-shrink-0">
                            <Image src={item.img} alt={item.name} fill className="object-cover" />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-gray-900 truncate leading-tight mb-1">{item.name}</h4>
                            <div className="text-sm font-black text-gray-700 mb-2">RM {item.price * item.quantity}</div>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2">
                              <button
                                id={`btn-qty-dec-${item.id}`}
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-sm"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold text-gray-700 w-4 text-center">{item.quantity}</span>
                              <button
                                id={`btn-qty-inc-${item.id}`}
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-sm"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-20">
                        <span className="text-4xl block mb-2">🛒</span>
                        <h4 className="font-bold text-gray-700 mb-1">Your cart is empty</h4>
                        <p className="text-xs text-gray-400">Add Sensa products from the store to get started.</p>
                      </div>
                    )}
                  </div>

                  {/* Drawer Footer */}
                  {cart.length > 0 && (
                    <div className="border-t border-slate-100 px-6 py-6 space-y-4 bg-slate-50/50">
                      <div className="flex justify-between items-center text-gray-900 font-bold text-sm">
                        <span>Total Items:</span>
                        <span>{cartItemCount}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-900 font-black text-base">
                        <span>Total Price:</span>
                        <span>RM {cartTotal}</span>
                      </div>
                      
                      <Link
                        href={getWhatsappCheckoutLink()}
                        target="_blank"
                        id="btn-whatsapp-checkout"
                        className="w-full bg-green-500 text-white py-3.5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-md shadow-green-500/25 active:scale-95 text-sm duration-300"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.73.001-2.597-1.012-5.038-2.85-6.88S14.12 1.152 11.524 1.15c-5.439 0-9.863 4.372-9.865 9.734-.001 1.705.474 3.372 1.378 4.842L2.091 20.39l4.556-1.236zM17.07 14.1c-.274-.136-1.62-.8-1.87-.89-.254-.09-.44-.136-.623.137-.182.273-.706.89-.867 1.072-.16.182-.32.205-.594.068-.273-.136-1.15-.424-2.19-1.353-.808-.72-1.353-1.61-1.512-1.884-.16-.273-.016-.42.12-.556.124-.12.274-.32.41-.478.137-.158.183-.273.275-.455.09-.182.046-.341-.023-.478-.068-.136-.623-1.5-.853-2.05-.223-.537-.47-.463-.643-.47-.166-.007-.356-.008-.545-.008-.19 0-.498.07-.759.356-.26.288-1 .978-1 2.386s1.026 2.766 1.17 2.948c.14.182 2.017 3.08 4.887 4.32.682.296 1.216.473 1.632.605.69.22 1.32.19 1.815.115.553-.083 1.62-.663 1.85-1.3.228-.636.228-1.182.16-1.3-.069-.118-.255-.183-.53-.32z"/></svg>
                        <span>Checkout via WhatsApp</span>
                      </Link>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
