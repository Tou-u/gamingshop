import prisma from './prisma'

// Shop Site
export async function getMainProducts() {
  try {
    const products = await prisma.category.findMany({
      select: {
        name: true,
        products: {
          take: 6,
          select: {
            slug: true,
            name: true,
            price: true,
            image: true
          },
          where: {
            active: { equals: true }
          }
        }
      }
    })
    return { data: products }
  } catch (error) {
    return { error: 'Error obtaining the products' }
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        name: true
      }
    })
    return { data: categories }
  } catch (error) {
    return { error: 'Error obtaining the categories' }
  }
}

export async function getProductsPerCategory(name: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: { name },
        active: { equals: true }
      },
      select: {
        slug: true,
        name: true,
        price: true,
        image: true,
        brand: {
          select: {
            name: true
          }
        }
      }
    })

    return { data: products }
  } catch (error) {
    return { error: 'Error obtaining the products' }
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug, active: { equals: true } },
      select: {
        name: true,
        description: true,
        image: true,
        price: true,
        stock: true
      }
    })
    return { data: product }
  } catch (error) {
    return { error: 'Error obtaining the product' }
  }
}

export async function getProductsByName(name: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        active: { equals: true }
      },
      select: {
        slug: true,
        name: true,
        price: true,
        image: true
      }
    })
    return { data: products }
  } catch (error) {
    return { error: 'Error obtaining the products' }
  }
}

export async function getUserCart(user_id: string) {
  try {
    const products = await prisma.cart.findUnique({
      where: {
        user_id
      },
      select: {
        products: true
      }
    })
    return { data: products }
  } catch (error) {
    console.log(error)
    return { error: 'Error obtaining the cart' }
  }
}

// Dashboard Site
export async function getProductsDashboard() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return { data: products }
  } catch (error) {
    return { error: 'Error obtaining the products' }
  }
}

export async function getProductByID(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        active: true,
        slug: true,
        name: true,
        description: true,
        image: true,
        price: true,
        stock: true,
        category: true,
        brand: true
      }
    })
    return { data: product }
  } catch (error) {
    return { error: 'Error obtaining the product' }
  }
}

export async function getBrandsDashboard() {
  try {
    const brands = await prisma.brand.findMany()
    return { data: brands }
  } catch (error) {
    return { error: 'Error obtaining the brands' }
  }
}

export async function getCategoriesDashboard() {
  try {
    const categories = await prisma.category.findMany()
    return { data: categories }
  } catch (error) {
    return { error: 'Error obtaining the categories' }
  }
}
