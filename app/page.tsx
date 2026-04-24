import { PrismaClient } from '@prisma/client'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import About from '@/components/About'
import StatsCounter from '@/components/StatsCounter'
import Products from '@/components/Products'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default async function Home() {
  const prisma = new PrismaClient()
  const initialProducts = await prisma.product.findMany({
    take: 8,
    orderBy: { name: 'asc' }
  })
  await prisma.$disconnect()

  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <About />
      <StatsCounter />
      <Products initialProducts={initialProducts} />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
