'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-SPzh0eq0jCHnxTOHdZqlHZy8leXJSQ.png"
              alt="The Gujarat Fertilizers Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-primary">THE GUJARAT</p>
              <p className="text-sm font-bold text-primary">FERTILIZERS</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-foreground hover:text-primary font-medium transition">
              Home
            </Link>
            <Link href="#products" className="text-foreground hover:text-primary font-medium transition">
              Products
            </Link>
            <Link href="#about" className="text-foreground hover:text-primary font-medium transition">
              About Us
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary font-medium transition">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary font-medium transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#products"
                className="text-foreground hover:text-primary font-medium transition"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                href="#about"
                className="text-foreground hover:text-primary font-medium transition"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="#contact"
                className="text-foreground hover:text-primary font-medium transition"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
