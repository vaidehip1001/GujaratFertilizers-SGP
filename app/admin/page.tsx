import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Users, FileText, Package, ExternalLink, Calendar, MapPin, Phone } from 'lucide-react'
import AdminTabs from '@/components/AdminTabs'

async function getAdminData() {
  const prisma = new PrismaClient()
  try {
    const buyers = await prisma.user.findMany({
      where: { role: 'buyer' },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        state: true,
        city: true,
        licenseUrl: true,
        idProofUrl: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    })
    const orders = await prisma.order.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    })
    return { buyers, orders }
  } finally {
    await prisma.$disconnect()
  }
}

export default async function AdminDashboard() {
  const { buyers, orders } = await getAdminData()

  return (
    <div className="min-h-screen bg-[#faf8f3] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#1a1a1a]">Admin Portal</h1>
            <p className="text-[#666666] mt-2">Platform overview and registered buyer management.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-[#e8e4da] flex items-center gap-4">
              <div className="w-12 h-12 bg-[#2d5016]/10 rounded-full flex items-center justify-center">
                <Users className="text-[#2d5016]" size={24} />
              </div>
              <div>
                <p className="text-[#666666] text-sm font-bold uppercase tracking-wider">Total Buyers</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">{buyers.length}</p>
              </div>
            </div>
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-[#e8e4da] flex items-center gap-4">
              <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
                <Package className="text-[#d4af37]" size={24} />
              </div>
              <div>
                <p className="text-[#666666] text-sm font-bold uppercase tracking-wider">Total Orders</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        <AdminTabs buyers={buyers} orders={orders} />

      </div>
    </div>
  )
}
