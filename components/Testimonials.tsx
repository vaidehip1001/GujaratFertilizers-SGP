'use client'

import { useState, useEffect } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Rajesh Patel',
    location: 'Anand, Gujarat',
    quote: 'Since switching to TGF products, my wheat yield has increased by 35%. The quality is unmatched, and their support team helped me choose the right fertilizer for my soil type.',
    rating: 5,
    crop: 'Wheat Farmer',
  },
  {
    name: 'Suresh Kumar',
    location: 'Ahmedabad, Gujarat',
    quote: 'The NPK fertilizer from Gujarat Fertilizers has transformed my cotton fields. Consistent quality every season and the results speak for themselves.',
    rating: 5,
    crop: 'Cotton Farmer',
  },
  {
    name: 'Bhavna Desai',
    location: 'Surat, Gujarat',
    quote: 'Their organic range is exactly what modern farming needs. My vegetable produce is healthier, and I can command premium prices in the market. Truly grateful.',
    rating: 5,
    crop: 'Vegetable Grower',
  },
]

export default function Testimonials() {
  const ref = useScrollAnimation()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background overflow-hidden">
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
              Testimonials
            </span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-accent/30" />
              <span className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-balance">
            What Our <span className="text-primary italic">Farmers Say</span>
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto animate-fade-up">
          <div className="relative overflow-hidden">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  idx === current
                    ? 'opacity-100 translate-x-0 relative'
                    : 'opacity-0 absolute inset-0 translate-x-8 pointer-events-none'
                }`}
              >
                <div className="bg-[#f9f7f2] rounded-3xl p-10 md:p-14 text-center relative">
                  {/* Decorative Quote */}
                  <div className="absolute top-6 left-8 opacity-10">
                    <Quote size={64} className="text-primary" />
                  </div>

                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={20} className="text-accent fill-accent" />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif italic mb-8">
                    {`"${t.quote}"`}
                  </p>

                  {/* Author */}
                  <div>
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold font-serif">
                      {t.name.charAt(0)}
                    </div>
                    <h4 className="text-lg font-bold text-foreground">{t.name}</h4>
                    <p className="text-accent font-semibold text-sm">{t.crop}</p>
                    <p className="text-muted-foreground text-sm">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`transition-all duration-500 rounded-full ${
                    idx === current ? 'w-8 h-3 bg-accent' : 'w-3 h-3 bg-border hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
