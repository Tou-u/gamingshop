import prisma from './prisma'

// Shop Site
const api = {
  getMainProducts: async () => {
    try {
      const products = await prisma.product.findMany({
        select: {
          slug: true,
          name: true,
          price: true,
          image: true
        },
        take: 10,
        where: {
          active: { equals: true }
        },
        orderBy: { created_at: 'desc' }
      })
      return products
    } catch (error) {
      throw new Error('Error obtaining the products')
    }
  },
  getUserCart: async (user_id: string) => {
    const cart = await prisma.cart.findUnique({
      where: {
        user_id
      },
      select: {
        products: {
          select: {
            name: true,
            image: true,
            price: true,
            id: true,
            slug: true
          },
          where: {
            active: { equals: true }
          }
        }
      }
    })
    if (!cart) {
      return []
    }
    return cart.products
  },
  getProductBySlug: async (slug: string) => {
    try {
      const product = await prisma.product.findUnique({
        where: { slug, active: { equals: true } },
        select: {
          name: true,
          description: true,
          image: true,
          price: true,
          stock: true,
          slug: true,
          id: true
        }
      })
      return product
    } catch (error) {
      throw new Error('Error obtaining the product')
    }
  },
  getProductsByName: async (name: string) => {
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
    return products
  },
  getUserAddress: async (user_id: string) => {
    const address = prisma.address.findUnique({
      where: {
        user_id
      }
    })
    return address
  },
  getUserOrders: async (user_id: string) => {
    const orders = prisma.order.findMany({
      where: {
        user_id
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    return orders
  }
}

export default api

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
