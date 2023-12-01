import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    await prisma.product.findFirst()
    return NextResponse.json({ success: true, time: Date.now() })
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to complete the order, try again later.',
      time: Date.now()
    })
  }
}
