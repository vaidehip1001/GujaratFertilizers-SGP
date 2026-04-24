'use client'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const ref = useScrollAnimation()

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-[#f9f7f2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="w-2 h-2 rounded-full bg-accent/30" />
            </div>
            <span className="text-accent text-sm font-bold tracking-widest uppercase">
              Get In Touch
            </span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-accent/30" />
              <span className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Contact{' '}
            <span className="text-primary italic">Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Reach out to us for enquiries, product information, or agricultural guidance. Our team is ready to assist you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 animate-fade-up">
          {/* Phone */}
          <div className="group flex flex-col items-start gap-4 bg-background p-6 rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-accent">
              <Phone size={20} className="text-accent transition-colors group-hover:text-accent-foreground" />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm mb-2">Call Us</h4>
              <p className="text-muted-foreground text-sm">(+91) 87589 18848</p>
              <p className="text-muted-foreground text-sm">(+91) 94262 42547</p>
              <p className="text-muted-foreground text-sm">(+91) 94277 22370</p>
            </div>
          </div>

          {/* Email */}
          <div className="group flex flex-col items-start gap-4 bg-background p-6 rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-accent">
              <Mail size={20} className="text-accent transition-colors group-hover:text-accent-foreground" />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm mb-2">Email Us</h4>
              <p className="text-muted-foreground text-sm">tgfjamnavad@yahoo.in</p>
            </div>
          </div>

          {/* Addresses */}
          <div className="group flex flex-col items-start gap-4 bg-background p-6 rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-accent">
              <MapPin size={20} className="text-accent transition-colors group-hover:text-accent-foreground" />
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-foreground text-sm mb-1">Factory Address</h4>
                <p className="text-muted-foreground text-sm">At: Jamnavad, Dhoraji - 360410</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm mb-1">Corporate Office</h4>
                <p className="text-muted-foreground text-sm">&ldquo;Amofos House&rdquo; Station Road, Dhoraji,</p>
                <p className="text-muted-foreground text-sm">Dist. Rajkot - 360410</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
