'use client'

import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const el = ref.current
    if (el) {
      const animatedElements = el.querySelectorAll(
        '.animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-scale-in'
      )
      animatedElements.forEach((child) => observer.observe(child))
    }

    return () => observer.disconnect()
  }, [])

  return ref
}
