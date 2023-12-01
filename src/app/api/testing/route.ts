import prisma from '@/lib/prisma'
import { Product } from '@/types'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// interface CustomPromiseSettledResult<T> {
//   status: 'fulfilled' | 'rejected'
//   value?: T
//   reason?: Error // Ahora especificamos que la razón debe ser de tipo Error
// }

function ValidateOrder(productId: string) {
  return prisma.$transaction(async (tx) => {
    const updateStock = await tx.product.update({
      where: {
        id: productId,
        active: { equals: true }
      },
      data: {
        stock: { decrement: 1 }
      }
    })

    if (updateStock.stock < 0) {
      throw new Error(`Product ${updateStock.name} out of stock`)
    }
  })
}

export const GET = async () => {
  try {
    await ValidateOrder('clpjz678l0001r2it7drq8048')

    return NextResponse.json({ success: true, time: Date.now() })
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return NextResponse.json({ error: 'A product in your cart is no longer available.' })
        }
      }
      return NextResponse.json({ error: error.message, time: Date.now() })
    }
    return NextResponse.json({ error: 'Failed to complete the order, try again later.' })
  }
}

// const BuyProduct = async () => {
//   try {
//     return prisma.$transaction(async (tx) => {
//       const updateStock = await tx.product.update({
//         where: {
//           id: 'clpjz678l0001r2it7drq8048',
//           active: { equals: true }
//         },
//         data: {
//           stock: { decrement: 1 }
//         }
//       })

//       const time = Date.now()

//       if (updateStock.stock < 0) {
//         throw new Error(`Product ${updateStock.name} out of stock + ${time}`)
//       }
//       return `Purchased product + ${time}`
//     })
//   } catch (error) {
//     throw error
//   }
// }

// export const GET = async (request: NextRequest) => {
//   const results: CustomPromiseSettledResult<unknown>[] = await Promise.allSettled([
//     BuyProduct(),
//     BuyProduct()
//   ])

//   const errors = results
//     .filter((result) => result.status === 'rejected' && result.reason instanceof Error)
//     .map((result) => result.reason)

//   return NextResponse.json({
//     success: results.map((r) => r.value),
//     failed: errors.map((e) => e?.message)
//   })
// }
