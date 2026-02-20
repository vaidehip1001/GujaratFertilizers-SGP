'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const stats = [
  { value: 1360, suffix: '+', label: 'Completed Projects' },
  { value: 10, suffix: 'M+', label: 'Farmers Served' },
  { value: 4657, suffix: '+', label: 'Tons of Fertilizer' },
  { value: 25, suffix: '+', label: 'Premium Products' },
]

function AnimatedNumber({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let frame: number
    const duration = 2000
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [target, started])

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-20 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/stats-bg.jpg"
          alt="Golden wheat fields"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-5xl md:text-6xl font-serif font-bold text-accent mb-3 transition-transform duration-300 group-hover:scale-105">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} started={started} />
              </div>
              <div className="w-12 h-0.5 bg-accent/40 mx-auto mb-3" />
              <p className="text-primary-foreground/80 text-sm md:text-base font-medium tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
