import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#products', label: 'Products' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

const productLinks = [
  { href: '#products', label: 'NPK Fertilizer' },
  { href: '#products', label: 'Urea 46' },
  { href: '#products', label: 'Phosphate Mix' },
  { href: '#products', label: 'Potassium Complex' },
  { href: '#products', label: 'Organic Range' },
]

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0f2a04] text-primary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-SPzh0eq0jCHnxTOHdZqlHZy8leXJSQ.png"
                alt="The Gujarat Fertilizers Logo"
                width={56}
                height={56}
                className="object-contain"
              />
              <div>
                <p className="text-sm font-bold text-primary-foreground">THE GUJARAT</p>
                <p className="text-xs text-accent font-semibold tracking-wider">FERTILIZERS</p>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Delivering premium agricultural solutions for over 50 years. Committed to sustainable farming and empowering Indian farmers with world-class fertilizer products.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-primary-foreground mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent" />
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-primary-foreground/60 hover:text-accent transition-colors text-sm group"
                >
                  <ArrowRight size={12} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-accent" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-base font-bold text-primary-foreground mb-6 relative">
              Our Products
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent" />
            </h4>
            <nav className="space-y-3">
              {productLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-primary-foreground/60 hover:text-accent transition-colors text-sm group"
                >
                  <ArrowRight size={12} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-accent" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-bold text-primary-foreground mb-6 relative">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent" />
            </h4>
            <div className="space-y-4 text-sm text-primary-foreground/60">
              <p>
                <span className="text-primary-foreground font-semibold block mb-1">Factory Address</span>
                At: Jamnavad, Dhoraji - 360410
              </p>
              <p>
                <span className="text-primary-foreground font-semibold block mb-1">Corporate Office</span>
                &ldquo;Amofos House&rdquo; Station Road, Dhoraji,<br />
                Dist. Rajkot - 360410
              </p>
              <p>
                <span className="text-primary-foreground font-semibold block mb-1">Phone</span>
                (+91) 87589 18848<br />
                (+91) 94262 42547<br />
                (+91) 94277 22370
              </p>
              <p>
                <span className="text-primary-foreground font-semibold block mb-1">Email</span>
                tgfjamnavad@yahoo.in
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>&copy; {currentYear} The Gujarat Fertilizers Limited. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
