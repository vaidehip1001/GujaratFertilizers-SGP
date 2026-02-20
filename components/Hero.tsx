import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Growing India's Future
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              The Gujarat Fertilizers Limited delivers premium agricultural solutions that enhance crop yield and soil health. With decades of expertise, we're committed to sustainable farming practices.
            </p>
            <div className="flex gap-4">
              <Link
                href="#products"
                className="bg-accent text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition inline-flex items-center gap-2"
              >
                Explore Products
                <ArrowRight size={20} />
              </Link>
              <Link
                href="#contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-white/80">Years of Excellence</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <div className="text-4xl font-bold mb-2">10M+</div>
              <p className="text-white/80">Farmers Served</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <div className="text-4xl font-bold mb-2">95%</div>
              <p className="text-white/80">Crop Improvement</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-white/80">Organic Certified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
