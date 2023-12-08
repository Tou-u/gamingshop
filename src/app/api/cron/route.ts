import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json('Unauthorized', { status: 401 })
  }

  await prisma.product.deleteMany({
    where: {
      id: { startsWith: 'temp-' }
    }
  })

  await prisma.order.deleteMany({
    where: {
      id: { startsWith: 'temp-' }
    }
  })

  return NextResponse.json({ ok: true }, { status: 200 })
}
