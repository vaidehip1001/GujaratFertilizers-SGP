'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { ArrowRight, ShoppingCart, Eye, Star } from 'lucide-react'

type Category = 'all' | 'best-sellers' | 'organic' | 'new-arrivals' | 'specialty'

interface Product {
  name: string
  price: string
  originalPrice?: string
  image: string
  category: Category[]
  tag?: string
  rating: number
  reviews: number
  badge?: 'hot' | 'new' | 'sale'
}

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'best-sellers', label: 'Best Sellers' },
  { id: 'organic', label: 'Organic Range' },
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'specialty', label: 'Specialty' },
]

const products: Product[] = [
  {
    name: 'NPK Fertilizer',
    price: '1,450',
    originalPrice: '1,800',
    image: '/images/product-npk.jpg',
    category: ['all', 'best-sellers'],
    tag: 'Complete nutrition for all crops',
    rating: 4.8,
    reviews: 342,
    badge: 'hot',
  },
  {
    name: 'Urea 46',
    price: '980',
    image: '/images/product-urea.jpg',
    category: ['all', 'best-sellers'],
    tag: 'High-nitrogen for rapid growth',
    rating: 4.7,
    reviews: 289,
  },
  {
    name: 'Phosphate Mix',
    price: '1,250',
    image: '/images/product-phosphate.jpg',
    category: ['all', 'organic'],
    tag: 'Strong root development',
    rating: 4.6,
    reviews: 198,
  },
  {
    name: 'Potassium Complex',
    price: '1,680',
    originalPrice: '2,100',
    image: '/images/product-potassium.jpg',
    category: ['all', 'new-arrivals'],
    tag: 'Disease resistance booster',
    rating: 4.9,
    reviews: 156,
    badge: 'new',
  },
  {
    name: 'Micronutrient Blend',
    price: '2,200',
    image: '/images/product-micronutrient.jpg',
    category: ['all', 'specialty'],
    tag: 'Essential trace elements',
    rating: 4.5,
    reviews: 124,
  },
  {
    name: 'Organic Compost Plus',
    price: '850',
    image: '/images/product-organic.jpg',
    category: ['all', 'organic', 'new-arrivals'],
    tag: '100% natural ingredients',
    rating: 4.8,
    reviews: 267,
    badge: 'new',
  },
  {
    name: 'Sulphur Granules',
    price: '1,100',
    originalPrice: '1,350',
    image: '/images/product-sulphur.jpg',
    category: ['all', 'specialty'],
    tag: 'Soil pH correction',
    rating: 4.4,
    reviews: 98,
    badge: 'sale',
  },
  {
    name: 'Zinc Sulphate',
    price: '1,320',
    image: '/images/product-zinc.jpg',
    category: ['all', 'specialty', 'best-sellers'],
    tag: 'Zinc deficiency treatment',
    rating: 4.6,
    reviews: 176,
  },
]

const featuredCategories = [
  {
    title: 'Soil Health',
    subtitle: 'Premium Range',
    image: '/images/cat-soil-health.jpg',
    cta: 'Shop Now',
  },
  {
    title: 'Crop Growth',
    subtitle: 'Top Products',
    image: '/images/cat-crop-growth.jpg',
    cta: 'Shop Now',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
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

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <div
      className={`animate-fade-up delay-${((index % 4) + 1) * 100} group relative`}
    >
      {/* Card */}
      <div className="relative bg-[#faf8f3] rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(45,80,22,0.15)] border border-transparent hover:border-[#d4af37]/20">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                product.badge === 'hot'
                  ? 'bg-[#2d5016] text-[#ffffff]'
                  : product.badge === 'new'
                    ? 'bg-[#d4af37] text-[#1a1a1a]'
                    : 'bg-[#dc2626] text-[#ffffff]'
              }`}
            >
              {product.badge === 'hot' ? 'Best Seller' : product.badge === 'new' ? 'New' : 'Sale'}
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button
            className="w-10 h-10 rounded-full bg-[#ffffff] shadow-lg flex items-center justify-center hover:bg-[#2d5016] hover:text-[#ffffff] text-[#1a1a1a] transition-colors duration-200"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye size={16} />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-[#ffffff] shadow-lg flex items-center justify-center hover:bg-[#d4af37] hover:text-[#1a1a1a] text-[#1a1a1a] transition-colors duration-200"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-[#f0ede4] p-6">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-[#2d5016]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-5 pt-4">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-[#666666]">({product.reviews})</span>
          </div>

          {/* Name */}
          <h3 className="text-base font-bold text-[#1a1a1a] mb-1 group-hover:text-[#2d5016] transition-colors duration-300">
            {product.name}
          </h3>

          {/* Tag */}
          <p className="text-xs text-[#666666] mb-3 leading-relaxed">
            {product.tag}
          </p>

          {/* Price Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#2d5016]">
                {'Rs.'}{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#666666] line-through">
                  {'Rs.'}{product.originalPrice}
                </span>
              )}
            </div>
            <button
              className="w-9 h-9 rounded-full bg-[#2d5016] text-[#ffffff] flex items-center justify-center hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-300 hover:scale-110"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const ref = useScrollAnimation()
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [isAnimating, setIsAnimating] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setFilteredProducts(
        activeCategory === 'all'
          ? products
          : products.filter((p) => p.category.includes(activeCategory))
      )
      setIsAnimating(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [activeCategory])

  return (
    <section id="products" ref={ref} className="py-24 md:py-32 bg-[#ffffff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Featured Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {featuredCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`animate-fade-up delay-${(idx + 1) * 100} group relative rounded-3xl overflow-hidden h-72 cursor-pointer`}
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/70 via-[#1a1a1a]/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center p-10">
                <span className="text-[#d4af37] text-sm font-bold tracking-widest uppercase mb-2">
                  {cat.subtitle}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#ffffff] mb-5 text-balance">
                  {cat.title}
                </h3>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[#d4af37] text-[#1a1a1a] px-6 py-3 rounded-full text-sm font-bold w-fit hover:bg-[#ffffff] transition-all duration-300 group/btn"
                >
                  {cat.cta}
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-sm font-bold tracking-widest uppercase">
              Premium Collection
            </span>
            <span className="h-px w-10 bg-[#d4af37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-4 text-balance">
            Our Products
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto leading-relaxed">
            Scientifically formulated fertilizers designed to maximize crop yield
            while maintaining ecological balance.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14 animate-fade-up">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
                activeCategory === cat.id
                  ? 'bg-[#2d5016] border-[#2d5016] text-[#ffffff] shadow-lg shadow-[#2d5016]/20'
                  : 'bg-transparent border-[#e0e0e0] text-[#666666] hover:border-[#2d5016] hover:text-[#2d5016]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 transition-all duration-300 ${
            isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.name} product={product} index={idx} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && !isAnimating && (
          <div className="text-center py-16">
            <p className="text-[#666666] text-lg">No products found in this category.</p>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-16 animate-fade-up">
          <Link
            href="#contact"
            className="inline-flex items-center gap-3 border-2 border-[#2d5016] text-[#2d5016] px-10 py-4 rounded-full font-bold text-sm hover:bg-[#2d5016] hover:text-[#ffffff] transition-all duration-300 group"
          >
            View All Products
            <span className="w-8 h-8 rounded-full bg-[#d4af37] text-[#1a1a1a] flex items-center justify-center group-hover:bg-[#ffffff] group-hover:text-[#2d5016] transition-all duration-300">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
