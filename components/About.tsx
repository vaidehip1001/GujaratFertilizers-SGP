'use client'

import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const pillars = [
  {
    title: 'Our Vision',
    body: 'To be a leading provider of innovative and sustainable fertilizer solutions that enhance soil health, maximize agricultural productivity, and contribute to global food security while promoting eco-friendly farming practices.',
  },
  {
    title: 'Our Mission',
    body: 'To manufacture high-quality fertilizers using advanced technology, support farmers with expert agronomic solutions, and drive agricultural growth through research, innovation, and sustainable practices that benefit both farmers and the environment.',
  },
  {
    title: 'Our Values',
    body: 'We are committed to quality, sustainability, innovation, and farmer empowerment. Our core values include integrity, customer-centricity, environmental responsibility, and continuous improvement to ensure long-term agricultural prosperity.',
  },
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
                  <div className="text-4xl font-serif font-bold text-accent">75+</div>
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

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-2 text-balance">
              Growing Agriculture
            </h2>
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-primary italic mb-6">
              Since 1947
            </h3>

            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Founded in 1947, The Gujarat Fertilizers has been a pioneer in the agricultural industry, providing high-quality fertilizers to support farmers and enhance crop productivity. With over seven decades of experience, we have built a strong reputation for innovation, sustainability, and excellence in manufacturing nutrient-rich fertilizers that improve soil health and maximize yields. Our commitment to research and development has enabled us to introduce advanced formulations that cater to the evolving needs of modern agriculture.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              At The Gujarat Fertilizers, we believe in empowering farmers with reliable and effective solutions that drive sustainable growth. Our state-of-the-art manufacturing facilities and stringent quality control processes ensure that every product meets the highest industry standards. As we continue to grow, we remain dedicated to fostering agricultural prosperity, promoting eco-friendly farming practices, and contributing to a greener, more productive future for India&apos;s farmers.
            </p>


          </div>
        </div>

        {/* Vision / Mission / Values */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 animate-fade-up">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-background rounded-2xl p-8 border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-10 h-1 bg-accent rounded-full mb-5 transition-all group-hover:w-16" />
              <h4 className="text-lg font-bold text-foreground mb-3">{pillar.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
