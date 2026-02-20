'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    title: 'Every Crop Counts,',
    subtitle: 'Every Farmer Matters',
    description: 'Empowering Indian agriculture with premium quality fertilizers and sustainable farming solutions for over 50 years.',
    cta: 'See Our Products',
    ctaLink: '#products',
  },
  {
    title: 'Nurturing Growth,',
    subtitle: 'Harvesting Prosperity',
    description: 'From soil to harvest, our scientifically formulated products ensure maximum yield and environmental responsibility.',
    cta: 'Learn More',
    ctaLink: '#about',
  },
  {
    title: 'Rooted in Quality,',
    subtitle: 'Growing the Future',
    description: 'Trusted by millions of farmers across India. ISO certified manufacturing with world-class quality standards.',
    cta: 'Contact Us',
    ctaLink: '#contact',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (idx: number) => setCurrent(idx)
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  return (
    <section className="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-farm.jpg"
          alt="Lush green Indian farmland"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f00]/80 via-[#0a1f00]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f00]/40 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-float hidden lg:block" />
      <div className="absolute bottom-32 left-10 w-40 h-40 rounded-full bg-accent/10 blur-2xl animate-float hidden lg:block" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute transition-all duration-1000 ease-out ${
                idx === current
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              {/* Decorative accent line */}
              <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-200 ${idx === current ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                <div className="w-12 h-0.5 bg-accent" />
                <span className="text-accent text-sm font-semibold tracking-widest uppercase">The Gujarat Fertilizers</span>
              </div>

              <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-primary-foreground leading-[1.1] mb-2 transition-all duration-700 delay-300 ${idx === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {slide.title}
              </h1>
              <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] mb-8 transition-all duration-700 delay-500 ${idx === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <span className="text-accent italic">{slide.subtitle}</span>
              </h1>

              <p className={`text-lg sm:text-xl text-primary-foreground/80 max-w-xl mb-10 leading-relaxed transition-all duration-700 delay-700 ${idx === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {slide.description}
              </p>

              <div className={`flex items-center gap-5 transition-all duration-700 delay-[900ms] ${idx === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Link
                  href={slide.ctaLink}
                  className="group flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-base hover:bg-accent/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20"
                >
                  {slide.cta}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/70 hover:border-accent hover:text-accent transition-all" aria-label="Previous slide">
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-500 rounded-full ${
                idx === current
                  ? 'w-10 h-3 bg-accent'
                  : 'w-3 h-3 bg-primary-foreground/40 hover:bg-primary-foreground/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/70 hover:border-accent hover:text-accent transition-all" aria-label="Next slide">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Side Progress Indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
        {slides.map((_, idx) => (
          <div key={idx} className="relative">
            <button
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full border transition-all duration-500 ${
                idx === current
                  ? 'border-accent bg-accent scale-125'
                  : 'border-primary-foreground/40 bg-transparent hover:border-accent'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
            {idx < slides.length - 1 && (
              <div className="w-px h-8 bg-primary-foreground/20 mx-auto mt-1" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
