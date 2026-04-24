import ProductsPageLayout from '@/components/ProductsPageLayout'
export const dynamic = 'force-dynamic'
import { PrismaClient } from '@prisma/client'

export const metadata = {
  title: 'Soil Health Products | The Gujarat Fertilizers',
  description: 'Premium soil enrichment products — organic composts, gypsum, sulphur, micronutrients and biofertilizers to improve soil structure and fertility.',
}

export default async function SoilHealthPage() {
  const prisma = new PrismaClient()
  const soilHealthProducts = await prisma.product.findMany({
    where: { category: { has: 'soil-health' } },
    orderBy: { name: 'asc' }
  })
  await prisma.$disconnect()

  return (
    <ProductsPageLayout
      title="Soil Health"
      subtitle="Premium Range"
      description="Restore, enrich and protect your soil with our scientifically formulated organic and mineral soil-health products."
      accentColor="#d4af37"
      icon="leaf"
      products={soilHealthProducts}
      heroImage="/images/cat-soil-health.jpg"
      backLabel="Back to Home"
      backHref="/"
    />
  )
}
