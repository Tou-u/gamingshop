'use server'
import { revalidatePath } from 'next/cache'
import prisma from '../prisma'
import { AddressSchema } from './schema'
import { Address, Product } from '@/types'
import { Prisma } from '@prisma/client'

export const addToCart = async (formData: FormData) => {
  const user_id = formData.get('user_id') as string
  const product_id = formData.get('product_id') as string

  try {
    await prisma.cart.upsert({
      create: {
        products: {
          connect: {
            id: product_id
          }
        },
        user_id
      },
      update: {
        products: {
          connect: {
            id: product_id
          }
        }
      },
      where: {
        user_id
      }
    })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to add to cart the product, try again later.' }
  }
}

export const removeFromCart = async (formData: FormData) => {
  const user_id = formData.get('user_id') as string
  const product_id = formData.get('product_id') as string

  try {
    await prisma.cart.update({
      data: {
        products: {
          disconnect: {
            id: product_id
          }
        }
      },
      where: {
        user_id
      }
    })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to remove from cart the product, try again later.' }
  }
}

export const addOrUpdateUserAddress = async (
  user_id: string,
  prevState: any,
  formData: FormData
) => {
  formData.append('user_id', user_id)
  const form = Object.fromEntries(formData.entries())
  const response = AddressSchema.safeParse(form)

  if (!response.success) {
    const { errors } = response.error
    return { error: errors[0].message }
  }

  const data = response.data

  try {
    await prisma.address.upsert({
      where: {
        user_id: data.user_id
      },
      create: {
        address: data.address,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        info: data.info,
        user_id: data.user_id
      },
      update: {
        address: data.address,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        info: data.info
      }
    })
    revalidatePath('/myaddress')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to save the product, try again later.' }
  }
}

const validateOrder = (products: Product[], user_id: string, address: {}) => {
  return prisma.$transaction(async (tx) => {
    for (const product of products) {
      const updateStock = await tx.product.update({
        where: {
          id: product.id,
          active: { equals: true }
        },
        data: {
          stock: { decrement: 1 }
        }
      })

      if (updateStock.stock < 0) {
        throw new Error(`Product ${updateStock.name} out of stock`)
      }
    }
    await prisma.order.create({
      data: {
        user_id,
        address,
        products: products
      }
    })

    await prisma.cart.delete({
      where: {
        user_id
      }
    })
  })
}

export const newOrder = async (formData: FormData) => {
  const user_id = formData.get('user_id') as string
  const productsData = formData.get('products') as string
  const addressData = formData.get('address') as string

  const { user_id: userId, id, ...address } = JSON.parse(addressData) as Address
  const products = JSON.parse(productsData) as Product[]

  try {
    await validateOrder(products, user_id, address)

    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return { error: 'A product in your cart is no longer available.' }
        }
      }
      return { error: error.message }
    }
    return { error: 'Failed to complete the order, try again later.' }
  }
}
