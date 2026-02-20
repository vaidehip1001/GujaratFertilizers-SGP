'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { ArrowRight } from 'lucide-react'

const products = [
  {
    name: 'NPK Fertilizer',
    description: 'Balanced nitrogen, phosphorus, and potassium blend for comprehensive crop nutrition and enhanced soil vitality.',
    image: '/images/product-npk.jpg',
    tag: 'Best Seller',
  },
  {
    name: 'Urea 46',
    description: 'High-nitrogen urea fertilizer for rapid plant growth. Ideal for leafy vegetables and cereal crops.',
    image: '/images/product-urea.jpg',
    tag: 'Premium',
  },
  {
    name: 'Phosphate Mix',
    description: 'Rich in phosphorus for strong root development and flowering. Perfect for fruit and vegetable crops.',
    image: '/images/product-phosphate.jpg',
    tag: 'Organic',
  },
  {
    name: 'Potassium Complex',
    description: 'High potassium content for improved disease resistance, fruit quality, and enhanced crop flavor.',
    image: '/images/product-potassium.jpg',
    tag: 'New',
  },
]

export default function Products() {
  const ref = useScrollAnimation()

  return (
    <section id="products" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="w-2 h-2 rounded-full bg-accent/30" />
            </div>
            <span className="text-accent text-sm font-bold tracking-widest uppercase">
              Our Premium Products
            </span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-accent/30" />
              <span className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Providing The Finest Products To{' '}
            <span className="text-primary italic">The Best Farmers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scientifically formulated fertilizers designed to maximize crop yield while maintaining ecological balance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <div
              key={idx}
              className={`animate-fade-up delay-${(idx + 1) * 100} group relative bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border hover:border-accent/30 hover:-translate-y-2`}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Tag */}
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                  {product.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {product.description}
                </p>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/link"
                >
                  <span className="relative">
                    Read More
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover/link:w-full" />
                  </span>
                  <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-14 animate-fade-up">
          <Link
            href="#contact"
            className="inline-flex items-center gap-3 border-2 border-primary text-primary px-8 py-4 rounded-full font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
