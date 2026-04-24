import ProductsPageLayout from '@/components/ProductsPageLayout'
export const dynamic = 'force-dynamic'
import { PrismaClient } from '@prisma/client'

export const metadata = {
  title: 'Crop Growth Products | The Gujarat Fertilizers',
  description: 'Top crop growth fertilizers — NPK, Urea, DAP, Potassium, Calcium Nitrate and more to maximise yield across all crops.',
}

export default async function CropGrowthPage() {
  const prisma = new PrismaClient()
  const cropGrowthProducts = await prisma.product.findMany({
    where: { category: { has: 'crop-growth' } },
    orderBy: { name: 'asc' }
  })
  await prisma.$disconnect()

  return (
    <ProductsPageLayout
      title="Crop Growth"
      subtitle="Top Products"
      description="Maximise your crop yield with our high-performance growth fertilizers — trusted by 1,05,000+ farmers across India."
      accentColor="#4a8c1c"
      icon="sprout"
      products={cropGrowthProducts}
      heroImage="/images/cat-crop-growth.jpg"
      backLabel="Back to Home"
      backHref="/"
    />
  )
}
