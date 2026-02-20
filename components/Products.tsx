import { Leaf, Droplet, Zap, Sprout } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'NPK Fertilizer',
    description: 'Balanced nitrogen, phosphorus, and potassium blend for comprehensive crop nutrition. Essential for all major crops.',
    icon: Leaf,
    benefits: ['Increased Yield', 'Balanced Nutrition', 'Cost Effective']
  },
  {
    id: 2,
    name: 'Urea 46',
    description: 'High-nitrogen urea fertilizer for rapid plant growth. Ideal for leafy vegetables and cereals.',
    icon: Sprout,
    benefits: ['High Nitrogen', 'Quick Acting', 'Water Soluble']
  },
  {
    id: 3,
    name: 'Phosphate Mix',
    description: 'Rich in phosphorus for strong root development and flowering. Perfect for fruit crops.',
    icon: Droplet,
    benefits: ['Root Development', 'Better Flowering', 'Nutrient Absorption']
  },
  {
    id: 4,
    name: 'Potassium Complex',
    description: 'High potassium content for improved disease resistance and fruit quality.',
    icon: Zap,
    benefits: ['Disease Resistance', 'Better Quality', 'Enhanced Flavor']
  }
]

export default function Products() {
  return (
    <section id="products" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Premium Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scientifically formulated fertilizers designed to maximize crop yield and soil health
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const IconComponent = product.icon
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 border border-border"
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-lg w-fit">
                  <IconComponent size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>
                <div className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition">
                  Learn More
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
