import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
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

    // Fetch orders — no items include to avoid Prisma cache issues
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ buyers, orders })
  } catch (error: any) {
    console.error('Admin API Error:', error?.message)
    return NextResponse.json({ error: 'Failed to fetch admin data', detail: error?.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
