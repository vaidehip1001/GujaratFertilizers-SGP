export type Category = 'all' | 'best-sellers' | 'organic' | 'new-arrivals' | 'specialty' | 'soil-health' | 'crop-growth'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number | null
  image: string
  category: string[]
  tag?: string | null
  description: string
  rating: number
  reviews: number
  badge?: string | null
  unit?: string | null
  stock?: number
}

export const filterCategories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'best-sellers', label: 'Best Sellers' },
  { id: 'organic', label: 'Organic' },
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'specialty', label: 'Specialty' },
]
