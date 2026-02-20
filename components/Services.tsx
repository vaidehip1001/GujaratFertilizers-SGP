'use client'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { Truck, FlaskConical, HeartHandshake, BarChart3, Microscope, Users } from 'lucide-react'

const services = [
  {
    icon: FlaskConical,
    title: 'Soil Testing',
    description: 'Free soil analysis and customized fertilizer recommendations for optimal crop performance.',
  },
  {
    icon: Truck,
    title: 'Direct Delivery',
    description: 'Nationwide logistics network ensuring timely doorstep delivery to farms across all states.',
  },
  {
    icon: HeartHandshake,
    title: 'Farmer Support',
    description: 'Dedicated agronomist team providing on-field guidance and 24/7 helpline support.',
  },
  {
    icon: Microscope,
    title: 'R&D Innovation',
    description: 'Cutting-edge research labs developing next-generation sustainable fertilizer formulations.',
  },
  {
    icon: BarChart3,
    title: 'Yield Analytics',
    description: 'Data-driven crop analytics helping farmers make smarter decisions for better harvests.',
  },
  {
    icon: Users,
    title: 'Community Programs',
    description: 'Farmer training workshops and community development initiatives across rural India.',
  },
]

export default function Services() {
  const ref = useScrollAnimation()

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="w-2 h-2 rounded-full bg-accent/30" />
            </div>
            <span className="text-accent text-sm font-bold tracking-widest uppercase">
              What We Offer
            </span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-accent/30" />
              <span className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4 text-balance">
            We Passionately Care About{' '}
            <span className="text-accent italic">Farmers & Communities</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Comprehensive agricultural services designed to support every step of the farming journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div
                key={idx}
                className={`animate-fade-up delay-${(idx + 1) * 100} group relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
                  <Icon size={28} className="text-accent transition-colors group-hover:text-accent-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-primary-foreground mb-3">{service.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{service.description}</p>
                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
