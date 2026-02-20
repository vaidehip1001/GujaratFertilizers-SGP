import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">TGF</h3>
            <p className="text-white/80 leading-relaxed mb-6">
              The Gujarat Fertilizers Limited - Delivering premium agricultural solutions for over 50 years.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-accent transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/" className="text-white/80 hover:text-accent transition block">
                Home
              </Link>
              <Link href="#products" className="text-white/80 hover:text-accent transition block">
                Products
              </Link>
              <Link href="#about" className="text-white/80 hover:text-accent transition block">
                About Us
              </Link>
              <Link href="#contact" className="text-white/80 hover:text-accent transition block">
                Contact
              </Link>
            </nav>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-bold mb-4">Products</h4>
            <nav className="space-y-2">
              <Link href="#" className="text-white/80 hover:text-accent transition block">
                NPK Fertilizer
              </Link>
              <Link href="#" className="text-white/80 hover:text-accent transition block">
                Urea 46
              </Link>
              <Link href="#" className="text-white/80 hover:text-accent transition block">
                Phosphate Mix
              </Link>
              <Link href="#" className="text-white/80 hover:text-accent transition block">
                Potassium Complex
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-white/80 text-sm">
              <p>
                <strong>Address:</strong><br />
                Navodaya Complex<br />
                Vadodara, Gujarat 390001
              </p>
              <p>
                <strong>Phone:</strong><br />
                +91 9876 543 210
              </p>
              <p>
                <strong>Email:</strong><br />
                info@gujaratfertilizers.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <p className="text-white/80 text-sm">
              © {currentYear} The Gujarat Fertilizers Limited. All rights reserved.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="#" className="text-white/80 hover:text-accent transition text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white/80 hover:text-accent transition text-sm">
                Terms of Service
              </Link>
            </div>
            <p className="text-white/80 text-sm text-right">
              Certified ISO 9001:2015
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
