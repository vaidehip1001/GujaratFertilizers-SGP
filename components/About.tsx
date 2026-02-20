'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const highlights = [
  'ISO 9001:2015 Certified Manufacturing',
  'Scientifically Formulated Products',
  'Nationwide Distribution Network',
  'Dedicated Farmer Support Programs',
]

export default function About() {
  const ref = useScrollAnimation()

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-[#f9f7f2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image Composition */}
          <div className="relative animate-fade-left">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-farm.jpg"
                  alt="Indian farmer with golden harvest"
                  width={600}
                  height={450}
                  className="w-full h-[400px] md:h-[480px] object-cover"
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl animate-float">
                <div className="text-center">
                  <div className="text-4xl font-serif font-bold text-accent">50+</div>
                  <div className="text-sm text-primary-foreground/80 mt-1">Years of<br />Excellence</div>
                </div>
              </div>
              {/* Decorative Gold Border */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-accent rounded-tl-2xl" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="animate-fade-right">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="w-2 h-2 rounded-full bg-accent/60" />
                <span className="w-2 h-2 rounded-full bg-accent/30" />
              </div>
              <span className="text-accent text-sm font-bold tracking-widest uppercase">
                Welcome to The Gujarat Fertilizers
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-6 text-balance">
              What You Plant Now,{' '}
              <span className="text-primary italic">You Will Harvest Later</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              The Gujarat Fertilizers Limited has been at the forefront of India's agricultural revolution for over five decades. Our state-of-the-art manufacturing facilities and rigorous quality control processes ensure that every product meets international standards.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              We work closely with farmers, agronomists, and researchers to continuously innovate and deliver solutions that not only increase crop yield but also promote sustainable farming practices for future generations.
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                  <span className="text-foreground text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="#contact"
              className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-sm hover:bg-accent/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20"
            >
              More About Us
              <span className="w-8 h-8 rounded-full bg-accent-foreground/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
