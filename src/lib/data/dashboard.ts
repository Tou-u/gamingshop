import prisma from '../prisma'

const api = {
  getProductsDashboard: async () => {
    try {
      const products = await prisma.product.findMany({
        orderBy: {
          name: 'asc'
        }
      })
      return { data: products }
    } catch (error) {
      throw new Error('Error obtaining the products')
    }
  },
  getOrders: async (username?: string) => {
    try {
      const orders = await prisma.order.findMany({
        orderBy: {
          created_at: 'desc'
        },
        include: {
          user: {
            select: { username: true }
          }
        },
        where: {
          user: {
            username: { contains: username, mode: 'insensitive' }
          }
        }
      })
      return orders
    } catch (error) {
      throw new Error('Error obtaining the orders')
    }
  },
  getProduct: async (id: string | undefined) => {
    try {
      const brands = await prisma.brand.findMany()
      const categories = await prisma.category.findMany()
      let product
      if (!id) {
        product = null
      } else {
        product = await prisma.product.findUnique({
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
      }

      return { data: { brands, categories, product } }
    } catch (error) {
      throw new Error('Error obtaining the product')
    }
  }
}

export default api
