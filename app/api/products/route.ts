import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET: Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST: Create a new product (Admin/Seller only)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newProduct = await prisma.product.create({
      data: {
        id: body.id,
        name: body.name,
        price: Number(body.price),
        originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
        image: body.image,
        category: body.category || [],
        tag: body.tag || null,
        description: body.description || '',
        badge: body.badge || null,
        unit: body.unit || null,
        stock: Number(body.stock) || 0,
      },
    })
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
