'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, Search } from 'lucide-react'
import dynamic from 'next/dynamic'

const StaggeredMenu = dynamic(() => import('./StaggeredMenu').then(mod => ({ default: mod.StaggeredMenu })), { ssr: false })

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuOpen = useCallback(() => setMenuOpen(true), [])
  const handleMenuClose = useCallback(() => setMenuOpen(false), [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#about', label: 'About Us' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ]

  const staggeredMenuItems = navLinks.map(link => ({
    label: link.label,
    ariaLabel: `Go to ${link.label}`,
    link: link.href,
  }))

  const socialItems = [
    { label: 'Facebook', link: '#' },
    { label: 'Twitter', link: '#' },
    { label: 'Instagram', link: '#' },
    { label: 'LinkedIn', link: '#' },
  ]

  return (
    <>
      {/* Top Info Bar */}
      <div className={`bg-[#1a3a0a] text-primary-foreground transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between py-2.5 text-xs sm:text-sm gap-2">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-accent" />
                <span className="text-primary-foreground/80">Navodaya Complex, Vadodara, Gujarat</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <Mail size={14} className="text-accent" />
                <span className="text-primary-foreground/80">info@gujaratfertilizers.com</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-accent" />
                <span className="text-primary-foreground/80">+91 9876 543 210</span>
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Clock size={14} className="text-accent" />
                <span className="text-primary-foreground/80">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#1a3a0a]/95 backdrop-blur-md shadow-xl' : 'bg-primary'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-[60]">
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-SPzh0eq0jCHnxTOHdZqlHZy8leXJSQ.png"
                  alt="The Gujarat Fertilizers Logo"
                  width={56}
                  height={56}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <p className={`text-base font-bold tracking-wide transition-colors duration-300 ${menuOpen ? 'text-[#1a3a0a]' : 'text-primary-foreground'}`}>THE GUJARAT</p>
                <p className="text-xs text-accent font-semibold tracking-widest">FERTILIZERS</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-primary-foreground/90 hover:text-accent transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </nav>

            {/* CTA Button + Staggered Menu Trigger */}
            <div className="flex items-center gap-4">
              <button className="hidden lg:block text-primary-foreground/80 hover:text-accent transition-colors" aria-label="Search">
                <Search size={20} />
              </button>
              <Link
                href="#contact"
                className="hidden lg:block bg-accent text-accent-foreground px-6 py-2.5 rounded-full text-sm font-bold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Staggered Menu Overlay */}
      <div className="lg:hidden">
        <StaggeredMenu
          isFixed={true}
          position="right"
          colors={['#d4af37', '#2d5016']}
          accentColor="#d4af37"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#1a3a0a"
          changeMenuColorOnOpen={true}
          closeOnClickAway={true}
          displaySocials={true}
          displayItemNumbering={true}
          items={staggeredMenuItems}
          socialItems={socialItems}
          logoUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-SPzh0eq0jCHnxTOHdZqlHZy8leXJSQ.png"
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
        />
      </div>
    </>
  )
}
