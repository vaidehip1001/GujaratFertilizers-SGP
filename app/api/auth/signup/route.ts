import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary } from '@/lib/cloudinary'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const mobile = formData.get('mobile') as string
    const state = formData.get('state') as string
    const city = formData.get('city') as string
    const address = formData.get('address') as string
    const licenseFile = formData.get('licenseFile') as File
    const idFile = formData.get('idFile') as File

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Upload files to Cloudinary
    let licenseUrl = ''
    let idProofUrl = ''
    if (licenseFile) {
      licenseUrl = await uploadToCloudinary(licenseFile, 'tgf/licenses')
    }
    if (idFile) {
      idProofUrl = await uploadToCloudinary(idFile, 'tgf/ids')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        mobile,
        state,
        city,
        address,
        licenseUrl,
        idProofUrl,
        role: 'buyer',
      },
    })

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      message: 'Signup successful',
      token,
      user: { name: user.name, email: user.email, role: user.role },
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: error.message || 'Signup failed' }, { status: 500 })
  }
}
