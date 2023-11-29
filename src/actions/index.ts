'use server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { Address, Product } from '@/types'

// Shop

export async function AddToCart(formData: FormData) {
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

export async function RemoveFromCart(formData: FormData) {
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

const AddressSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(1, { message: 'A first name is required' }).trim(),
  last_name: z.string().min(1, { message: 'A last name is required' }).trim(),
  address: z.string().min(1, { message: 'An address is required' }).trim(),
  email: z.string().email({ message: 'Enter a valid email' }),
  phone: z.coerce
    .number({ invalid_type_error: 'Enter a valid phone' })
    .gte(10000000, { message: 'Enter a valid phone' })
    .lte(99999999, { message: 'Enter a valid phone' }),
  info: z.string().trim().optional(),
  user_id: z.string()
})

export async function AddOrUpdateUserAddress(user_id: string, prevState: any, formData: FormData) {
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

function ValidateOrder(products: Product[], user_id: string, address: {}) {
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

export async function NewOrder(formData: FormData) {
  const user_id = formData.get('user_id') as string
  const productsData = formData.get('products') as string
  const addressData = formData.get('address') as string

  const { user_id: userId, id, ...address } = JSON.parse(addressData) as Address
  const products = JSON.parse(productsData) as Product[]

  try {
    const delay = new Promise((resolve) =>
      setTimeout(() => {
        resolve('Simulating purchase')
      }, 1000)
    )
    await delay
    await ValidateOrder(products, user_id, address)

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

// Dashboard

const ProductSchema = z.object({
  slug: z.string().min(1, { message: 'A slug is required' }).trim(),
  name: z.string().min(1, { message: 'A name is required' }).trim(),
  description: z.string().min(1, { message: 'A description is required' }).trim(),
  image: z.string().min(1, { message: 'An image is required' }).trim(),
  price: z.coerce.number().min(0, { message: 'Enter a valid price' }),
  stock: z.coerce.number().min(0, { message: 'Enter a valid stock' }),
  category_id: z.string().min(1, { message: 'A category is required' }),
  brand_id: z.string().min(1, { message: 'A brand is required' }),
  active: z.enum(['true', 'false']).transform((value) => value === 'true'),
  id: z.string().optional()
})

export async function NewProduct(prevState: any, formData: FormData) {
  const form = Object.fromEntries(formData.entries())
  const response = ProductSchema.safeParse(form)

  if (!response.success) {
    const { errors } = response.error
    return { error: errors[0].message }
  }

  const data = response.data

  try {
    await prisma.product.create({
      data
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') return { error: 'A product with that slug already exist' }
    }
    return { error: 'Failed to save the product, try again later.' }
  }
}

export async function EditProduct(prevState: any, formData: FormData) {
  const form = Object.fromEntries(formData.entries())
  const response = ProductSchema.safeParse(form)

  if (!response.success) {
    const { errors } = response.error
    return { error: errors[0].message }
  }

  const { id, ...data } = response.data

  try {
    await prisma.product.update({
      where: { id },
      data
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') return { error: 'A product with that slug already exist' }
    }
    return { error: 'Failed to save the product, try again later.' }
  }
}

export async function DeleteProduct(prevState: any, formData: FormData) {
  const id = formData.get('id') as string

  try {
    await prisma.product.delete({
      where: { id }
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete the product, try again later.' }
  }
}
