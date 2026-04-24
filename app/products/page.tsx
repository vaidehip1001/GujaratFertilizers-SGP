import ProductsPageLayout from '@/components/ProductsPageLayout'
import { PrismaClient } from '@prisma/client'

export const metadata = {
  title: 'All Products | The Gujarat Fertilizers',
  description: 'Browse our complete range of premium fertilizers — NPK, Urea, organic composts, bio-fertilizers, micronutrients and more.',
}

export default async function AllProductsPage() {
  const prisma = new PrismaClient()
  const allProducts = await prisma.product.findMany({ orderBy: { name: 'asc' } })
  await prisma.$disconnect()

  return (
    <ProductsPageLayout
      title="All Products"
      subtitle="Premium Collection"
      description="Scientifically formulated fertilizers designed to maximise crop yield while maintaining ecological balance."
      accentColor="#2d5016"
      icon="sprout"
      products={allProducts}
      backLabel="Back to Home"
      backHref="/"
    />
  )
}
