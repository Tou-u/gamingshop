import prisma from './prisma'

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
        name: true,
        category: true,
        slug: true,
        image: true,
        price: true
      }
    })

    return products
  } catch (error) {
    throw error
  }
}

export async function getSixProducts() {
  try {
    const products = await prisma.category.findMany({
      include: {
        products: {
          take: 6
        }
      }
    })
    return products
  } catch (error) {
    throw error
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany()
    return categories
  } catch (error) {
    throw error
  }
}

export async function getProductsPerCategory(name: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: { name }
      },
      include: {
        brand: true
      }
    })

    return products
  } catch (error) {
    throw error
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug }
    })
    return product
  } catch (error) {
    throw error
  }
}

export async function getProductsByName(value: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: { contains: value, mode: 'insensitive' }
      }
    })
    return products
  } catch (error) {
    throw error
  }
}
