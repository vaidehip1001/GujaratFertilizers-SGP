'use client'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { ShieldCheck, Award, Leaf, Sprout } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: '100% Quality Assured',
    description: 'Every batch tested and certified for the highest purity and effectiveness standards.',
  },
  {
    icon: Award,
    title: 'ISO 9001 Certified',
    description: 'Internationally recognized quality management systems ensuring consistent excellence.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Solutions',
    description: 'Committed to sustainable agriculture with environmentally responsible formulations.',
  },
  {
    icon: Sprout,
    title: '100% Organic Range',
    description: 'Complete organic product line for chemical-free, natural farming practices.',
  },
]

export default function Features() {
  const ref = useScrollAnimation()

  return (
    <section ref={ref} className="py-16 md:py-20 bg-[#f9f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className={`animate-fade-up delay-${(idx + 1) * 100} flex flex-col items-center text-center group`}
              >
                <div className="relative w-20 h-20 mb-5">
                  <div className="absolute inset-0 rounded-full bg-accent/20 transition-transform duration-500 group-hover:scale-110" />
                  <div className="relative w-full h-full rounded-full bg-accent flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon size={32} className="text-accent-foreground" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
