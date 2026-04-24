import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await req.json()
    const { items, totalAmount } = body

    if (!items || !items.length || typeof totalAmount !== 'number') {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 })
    }

    // Create the Order and OrderItems in one transaction
    const order = await prisma.order.create({
      data: {
        userId: decoded.id,
        totalAmount,
        paymentStatus: 'paid', // hardcoded because mock payment
        status: 'processing',
        items: {
          create: items.map((item: any) => ({
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json({
      message: 'Order created successfully',
      orderId: order.id,
    })
  } catch (error: any) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
