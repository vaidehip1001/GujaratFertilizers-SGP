'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Star, CheckCircle2, SlidersHorizontal, ChevronLeft, ArrowRight, Leaf, Sprout } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Product, Category } from '@/lib/products-data'
import { filterCategories } from '@/lib/products-data'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          className={
            star <= Math.floor(rating)
              ? 'fill-[#d4af37] text-[#d4af37]'
              : star <= rating
                ? 'fill-[#d4af37]/50 text-[#d4af37]'
                : 'text-[#e0e0e0]'
          }
        />
      ))}
    </div>
  )
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return (
    <div className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-[#ece8de] hover:border-[#d4af37]/40 hover:shadow-[0_20px_60px_-15px_rgba(45,80,22,0.15)] transition-all duration-500">
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
            product.badge === 'hot' ? 'bg-[#2d5016] text-white'
            : product.badge === 'new' ? 'bg-[#d4af37] text-[#1a1a1a]'
            : 'bg-[#dc2626] text-white'
          }`}>
            {product.badge === 'hot' ? 'Best Seller' : product.badge === 'new' ? 'New' : 'Sale'}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#f0ede4] p-6">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-[#2d5016]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 pt-4">
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-[#666]">({product.reviews})</span>
        </div>
        <h3 className="text-base font-bold text-[#1a1a1a] mb-1 group-hover:text-[#2d5016] transition-colors">{product.name}</h3>
        <p className="text-xs text-[#666] mb-1 leading-relaxed">{product.tag}</p>
        {product.unit && <p className="text-xs text-[#999] mb-4">Unit: {product.unit}</p>}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#f0ede4]">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-[#2d5016]">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#999] line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => onAdd(product)}
            id={`add-${product.id}`}
            className="flex items-center gap-2 bg-[#2d5016] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-300"
          >
            <ShoppingCart size={13} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

interface Props {
  title: string
  subtitle: string
  description: string
  accentColor: string
  icon: 'leaf' | 'sprout'
  products: Product[]
  backLabel?: string
  backHref?: string
  heroImage?: string
}

export default function ProductsPageLayout({
  title,
  subtitle,
  description,
  accentColor,
  icon,
  products,
  backLabel = 'Back to Home',
  backHref = '/',
  heroImage,
}: Props) {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [filtered, setFiltered] = useState(products)
  const [isAnimating, setIsAnimating] = useState(false)
  const [toast, setToast] = useState('')

  // Determine which filter tabs actually have products
  const availableTabs = filterCategories.filter(cat =>
    cat.id === 'all' || products.some(p => p.category.includes(cat.id))
  )

  useEffect(() => {
    setIsAnimating(true)
    const t = setTimeout(() => {
      setFiltered(
        activeCategory === 'all'
          ? products
          : products.filter(p => p.category.includes(activeCategory))
      )
      setIsAnimating(false)
    }, 250)
    return () => clearTimeout(t)
  }, [activeCategory, products])

  const handleAdd = (product: Product) => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '/')}`)
      return
    }
    addToCart({ name: product.name, price: product.price, image: product.image })
    setToast(`"${product.name}" added to cart!`)
    setTimeout(() => setToast(''), 3000)
  }

  const IconEl = icon === 'leaf' ? Leaf : Sprout

  return (
    <>
      <Header />

      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-6 z-[100] flex items-center gap-3 bg-[#0f2a04] text-white px-5 py-4 rounded-xl shadow-2xl max-w-sm">
          <CheckCircle2 size={18} className="text-[#d4af37] flex-shrink-0" />
          <p className="text-sm">{toast}</p>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {heroImage && (
          <Image src={heroImage} alt={title} fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2a04]/85 via-[#0f2a04]/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-sm font-bold tracking-widest uppercase">{subtitle}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-3">{title}</h1>
          <p className="text-white/70 text-sm md:text-base max-w-lg leading-relaxed">{description}</p>
        </div>
        <IconEl className="absolute bottom-6 right-8 text-white/10" size={120} />
      </div>

      <main className="min-h-screen bg-[#faf8f3] pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3 py-6">
            <Link href={backHref} className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#2d5016] transition-colors font-medium">
              <ChevronLeft size={16} />
              {backLabel}
            </Link>
            <span className="text-[#ccc]">/</span>
            <Link href="/products" className="text-sm text-[#666] hover:text-[#2d5016] transition-colors">All Products</Link>
            <span className="text-[#ccc]">/</span>
            <span className="text-sm text-[#2d5016] font-semibold">{title}</span>
          </div>

          {/* Filter + Count Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              {availableTabs.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
                    activeCategory === cat.id
                      ? 'bg-[#2d5016] border-[#2d5016] text-white shadow-lg'
                      : 'bg-white border-[#e0e0e0] text-[#666] hover:border-[#2d5016] hover:text-[#2d5016]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#666] shrink-0">
              <SlidersHorizontal size={15} className="text-[#2d5016]" />
              <span>{filtered.length} products</span>
            </div>
          </div>

          {/* Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 transition-all duration-300 ${
            isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
          }`}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={handleAdd} />
            ))}
          </div>

          {filtered.length === 0 && !isAnimating && (
            <div className="text-center py-20">
              <p className="text-[#666] text-lg">No products found in this category.</p>
            </div>
          )}

          {/* Explore Other Range */}
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 bg-[#0f2a04] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#2d5016] transition-all duration-300 hover:shadow-xl"
            >
              <ShoppingCart size={15} />
              View Cart
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border-2 border-[#2d5016] text-[#2d5016] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#2d5016] hover:text-white transition-all duration-300 group"
            >
              Browse All Products
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
