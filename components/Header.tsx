'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MapPin, Phone, Mail, Search, LogIn, LogOut, User, ShoppingCart, X, ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products-data'

const StaggeredMenu = dynamic(() => import('./StaggeredMenu').then(mod => ({ default: mod.StaggeredMenu })), { ssr: false })

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { isLoggedIn, user, logout } = useAuth()
  const { itemCount } = useCart()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAllProducts(data)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Focus search input when overlay opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    } else {
      setSearchQuery('')
    }
  }, [searchOpen])

  // Close search on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const handleMenuOpen = useCallback(() => setMenuOpen(true), [])
  const handleMenuClose = useCallback(() => setMenuOpen(false), [])

  // Filter products by search query
  const searchResults = searchQuery.trim().length > 1
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : []

  const handleProductClick = (productId: string) => {
    setSearchOpen(false)
    router.push(`/products?search=${encodeURIComponent(productId)}`)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#about', label: 'About Us' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ]

  const staggeredMenuItems = [
    ...navLinks.map(link => ({
      label: link.label,
      ariaLabel: `Go to ${link.label}`,
      link: link.href,
    })),
    ...(isLoggedIn && user?.role === 'admin'
      ? [{ label: 'Admin', ariaLabel: 'Go to Admin Portal', link: '/admin' }]
      : []),
  ]

  const socialItems = [
    { label: 'Facebook', link: '#' },
    { label: 'Twitter', link: '#' },
    { label: 'Instagram', link: '#' },
    { label: 'LinkedIn', link: '#' },
  ]

  return (
    <>
      {/* ── Search Overlay ─────────────────────────────────── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[200] bg-[#0f2a04]/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false) }}
        >
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-down">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#ece8de]">
              <Search size={20} className="text-[#2d5016] shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products, e.g. NPK, Urea, Organic..."
                className="flex-1 text-base text-[#1a1a1a] placeholder:text-[#aaa] bg-transparent outline-none"
                id="header-search-input"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#f0ede4] text-[#666] transition-colors"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {searchQuery.trim().length > 1 && searchResults.length === 0 && (
                <div className="px-5 py-10 text-center text-[#666] text-sm">
                  No products found for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </div>
              )}

              {searchResults.length > 0 && (
                <ul>
                  {searchResults.map(product => (
                    <li key={product.id}>
                      <button
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-[#faf8f3] transition-colors text-left group"
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#f0ede4] shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#2d5016] transition-colors">{product.name}</p>
                          <p className="text-xs text-[#666] truncate">{product.tag}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-[#2d5016]">₹{product.price}</p>
                          {product.originalPrice && (
                            <p className="text-xs text-[#999] line-through">₹{product.originalPrice}</p>
                          )}
                        </div>
                        <ArrowRight size={14} className="text-[#ccc] group-hover:text-[#2d5016] transition-colors shrink-0" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {searchQuery.trim().length > 1 && searchResults.length > 0 && (
                <div className="px-5 py-3 border-t border-[#f0ede4]">
                  <button
                    onClick={() => { setSearchOpen(false); router.push('/products') }}
                    className="text-xs text-[#2d5016] font-semibold hover:underline"
                  >
                    View all products →
                  </button>
                </div>
              )}

              {searchQuery.trim().length <= 1 && (
                <div className="px-5 py-6">
                  <p className="text-xs text-[#999] font-semibold uppercase tracking-widest mb-3">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['NPK Fertilizer', 'Urea 46', 'Organic Compost', 'DAP', 'Zinc Sulphate'].map(term => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 rounded-full bg-[#f0ede4] text-[#555] text-xs font-semibold hover:bg-[#2d5016] hover:text-white transition-all duration-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Top Info Bar ────────────────────────────────────── */}
      <div className={`bg-[#1a3a0a] text-primary-foreground transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between py-2.5 text-xs sm:text-sm gap-2">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-accent" />
                <span className="text-primary-foreground/80">At: Jamnavad, Dhoraji - 360410</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <Mail size={14} className="text-accent" />
                <span className="text-primary-foreground/80">tgfjamnavad@yahoo.in</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-accent" />
                <span className="text-primary-foreground/80">(+91) 87589 18848</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Navigation ─────────────────────────────────── */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#1a3a0a]/95 backdrop-blur-md shadow-xl' : 'bg-primary'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-[60]">
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-SPzh0eq0jCHnxTOHdZqlHZy8leXJSQ.png"
                  alt="The Gujarat Fertilizers Logo"
                  width={56}
                  height={56}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <p className={`text-base font-bold tracking-wide transition-colors duration-300 ${menuOpen ? 'text-[#1a3a0a]' : 'text-primary-foreground'}`}>THE GUJARAT</p>
                <p className="text-xs text-accent font-semibold tracking-widest">FERTILIZERS</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-primary-foreground/90 hover:text-accent transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center gap-4">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center justify-center text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="Search products"
                id="header-search-btn"
              >
                <Search size={20} />
              </button>

              {/* Cart Icon */}
              <Link href="/cart" className="relative group flex items-center justify-center p-2 text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-accent text-[#1a1a1a] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1a3a0a]">
                    {itemCount}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <div className="hidden lg:flex items-center gap-2">
                  {user?.role === 'admin' && (
                    <Link href="/admin" className="text-accent text-sm font-bold hover:text-accent/80 transition-colors mr-2">
                      Admin Portal
                    </Link>
                  )}
                  <span className="flex items-center gap-1.5 text-primary-foreground/80 text-sm">
                    <User size={14} className="text-accent" />
                    {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 bg-accent/20 text-accent border border-accent/30 px-4 py-2 rounded-full text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden lg:flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 rounded-full text-sm font-bold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                >
                  <LogIn size={15} />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Staggered Mobile Menu ───────────────────────────── */}
      <div className="lg:hidden">
        <StaggeredMenu
          isFixed={true}
          position="right"
          colors={['#d4af37', '#2d5016']}
          accentColor="#d4af37"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#1a3a0a"
          changeMenuColorOnOpen={true}
          closeOnClickAway={true}
          displaySocials={true}
          displayItemNumbering={true}
          items={staggeredMenuItems}
          socialItems={socialItems}
          logoUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-SPzh0eq0jCHnxTOHdZqlHZy8leXJSQ.png"
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
        />
      </div>
    </>
  )
}
