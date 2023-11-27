'use server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

// Shop
export async function AddToCart(formData: FormData) {
  const user_id = formData.get('user_id') as string
  const product_slug = formData.get('product_slug') as string

  try {
    await prisma.user.update({
      data: {
        cart: {
          upsert: {
            create: {
              products: {
                connect: {
                  slug: product_slug
                }
              }
            },
            update: {
              products: {
                connect: {
                  slug: product_slug
                }
              }
            }
          }
        }
      },
      where: {
        id: user_id
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
  const product_slug = formData.get('product_slug') as string

  try {
    await prisma.cart.update({
      data: {
        products: {
          disconnect: {
            slug: product_slug
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

const AdressSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(1, { message: 'A first name is required' }).trim(),
  last_name: z.string().min(1, { message: 'A last name is required' }).trim(),
  adress: z.string().min(1, { message: 'An adress is required' }).trim(),
  email: z.string().email({ message: 'Enter a valid email' }),
  phone: z.coerce
    .number({ invalid_type_error: 'Enter a valid phone' })
    .gte(10000000, { message: 'Enter a valid phone' })
    .lte(99999999, { message: 'Enter a valid phone' }),
  info: z.string().trim().optional(),
  user_id: z.string()
})

export async function AddOrUpdateUserAdress(user_id: string, prevState: any, formData: FormData) {
  formData.append('user_id', user_id)
  const form = Object.fromEntries(formData.entries())
  const response = AdressSchema.safeParse(form)

  if (!response.success) {
    const { errors } = response.error
    return { error: errors[0].message }
  }

  const data = response.data

  try {
    await prisma.adress.upsert({
      where: {
        user_id: data.user_id
      },
      create: {
        adress: data.adress,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        info: data.info,
        user_id: data.user_id
      },
      update: {
        adress: data.adress,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        info: data.info
      }
    })
    revalidatePath('/myadress')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to save the product, try again later.' }
  }
}

export async function NewOrder(formData: FormData) {
  const user_id = formData.get('user_id') as string
  const products = formData.get('products') as string
  const adress = formData.get('adress') as string

  const SlugsFromProducts: [] = JSON.parse(products)

  try {
    await prisma.order.create({
      data: {
        products: {
          connect: SlugsFromProducts.map((slug) => ({ slug }))
        },
        adress: JSON.parse(adress),
        user_id
      }
    })
    console.log('creado')
  } catch (error) {
    console.log(error)
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
