'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Address',
    lines: ['Navodaya Complex, Vadodara', 'Gujarat, India - 390001'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 9876 543 210', '+91 9876 543 211'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@gujaratfertilizers.com', 'support@gujaratfertilizers.com'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
  },
]

export default function Contact() {
  const ref = useScrollAnimation()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-[#f9f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Have Questions?{' '}
            <span className="text-primary italic">{"We'd Love to Hear"}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Reach out to us for enquiries, product information, or agricultural guidance. Our team is ready to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-5 animate-fade-left">
            {contactInfo.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="group flex items-start gap-4 bg-background p-5 rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-accent">
                    <Icon size={20} className="text-accent transition-colors group-hover:text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-1">{item.title}</h4>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-muted-foreground text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 animate-fade-right">
            <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-8 md:p-10 shadow-xl border border-border">
              {submitted && (
                <div className="mb-6 p-4 bg-primary/10 border border-primary/20 text-primary rounded-xl text-sm font-medium flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">&#10003;</span>
                  Thank you! We will get back to you shortly.
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-foreground text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#f9f7f2] border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-foreground text-sm font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#f9f7f2] border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-foreground text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f9f7f2] border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-foreground text-sm font-semibold mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f9f7f2] border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm"
                  >
                    <option value="">Select a topic</option>
                    <option value="products">Product Enquiry</option>
                    <option value="order">Order Status</option>
                    <option value="support">Technical Support</option>
                    <option value="dealership">Dealership Enquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-foreground text-sm font-semibold mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#f9f7f2] border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="group flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 rounded-full font-bold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
              >
                Send Message
                <Send size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
