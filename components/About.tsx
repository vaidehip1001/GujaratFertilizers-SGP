import { CheckCircle2 } from 'lucide-react'

const values = [
  'Quality Assurance',
  'Environmental Sustainability',
  'Farmer Welfare',
  'Innovation & Research',
  'Transparent Practices',
  'Community Development'
]

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              About The Gujarat Fertilizers
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over 50 years of experience, The Gujarat Fertilizers Limited has been at the forefront of India's agricultural revolution. We are committed to providing high-quality fertilizers that not only increase crop yield but also promote sustainable farming practices.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our state-of-the-art manufacturing facilities and rigorous quality control processes ensure that every product meets international standards. We work closely with farmers, agronomists, and researchers to continuously innovate and improve our offerings.
            </p>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded">
              <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower Indian farmers with superior quality fertilizers and agricultural solutions, fostering sustainable growth while maintaining environmental responsibility.
              </p>
            </div>
          </div>

          {/* Right Content - Values */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-8">
              Our Core Values
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {values.map((value, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={24} />
                  <span className="text-foreground font-semibold text-lg">{value}</span>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <div className="text-3xl font-bold text-primary">50+</div>
                <p className="text-xs text-muted-foreground mt-2">Years Active</p>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <div className="text-3xl font-bold text-primary">10M+</div>
                <p className="text-xs text-muted-foreground mt-2">Farmers Trust Us</p>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <div className="text-3xl font-bold text-primary">25+</div>
                <p className="text-xs text-muted-foreground mt-2">Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
