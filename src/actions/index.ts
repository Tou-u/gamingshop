'use server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

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
