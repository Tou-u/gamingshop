'use server'
import { revalidatePath } from 'next/cache'
import prisma from '../prisma'
import { ProductSchema } from './schema'
import { Prisma } from '@prisma/client'
import { Key } from 'react'
import { randomUUID } from 'crypto'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '../r2'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export const uploadImage = async (productId: string) => {
  const signedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: productId
    }),
    {
      expiresIn: 60
    }
  )
  return signedUrl
}

export const createOrEditProduct = async (
  extraData: { category_id: Key; brand_id: Key; active: boolean; productId: string | undefined },
  prevState: any,
  formData: FormData
) => {
  formData.append('category_id', extraData.category_id as string)
  formData.append('brand_id', extraData.brand_id as string)
  formData.append('active', extraData.active ? 'true' : 'false')

  if (extraData.productId) {
    formData.append('id', extraData.productId)
  }

  const image = formData.get('imageFile') as File

  const form = Object.fromEntries(formData.entries())
  const response = ProductSchema.safeParse(form)

  if (!response.success) {
    const { errors } = response.error
    return { error: errors[0].message }
  }

  const { id, ...data } = response.data

  try {
    if (!id) {
      if (image.size === 0) return { error: 'An image is required' }
      const generateId = `temp-${randomUUID()}`

      const product = await prisma.product.create({
        data: {
          ...data,
          id: generateId,
          image: generateId
        }
      })

      const signedUrl = await uploadImage(product.id)
      await fetch(signedUrl, { method: 'PUT', body: image })
    } else {
      await prisma.product.update({
        where: {
          id
        },
        data
      })
    }
    revalidatePath('/d/products')
    return { success: true }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') return { error: 'A product with that slug already exist' }
    }
    return { error: 'Failed to save the product, try again later.' }
  }
}

export const deleteProduct = async (productId: string | undefined, prevState: any) => {
  if (!productId) return

  try {
    await prisma.product.delete({
      where: { id: productId }
    })
    revalidatePath('/d/products')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete the product, try again later.' }
  }
}

export const updateOrderStage = async (id: string, prevState: any, formData: FormData) => {
  const stage = formData.get('stage') as string
  try {
    await prisma.order.update({
      where: {
        id
      },
      data: {
        stage
      }
    })
    revalidatePath('/d/orders')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to save the stage, try again later.' }
  }
}
