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
  getOrders: async (username?: string, page: number = 1, stage?: string) => {
    const pageSize = 15
    const skip = (page - 1) * pageSize

    try {
      const totalOrders = await prisma.order.count({
        where: {
          user: {
            username: { contains: username, mode: 'insensitive' }
          },
          stage: stage === 'all' ? undefined : stage
        }
      })
      const pages = Math.ceil(totalOrders / pageSize)
      const orders = await prisma.order.findMany({
        skip,
        take: pageSize,
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
          },
          stage: stage === 'all' ? undefined : stage
        }
      })
      return { orders, pages }
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
  },
  getOrder: async (order_id: string) => {
    try {
      const order = await prisma.order.findFirst({
        where: {
          id: order_id
        }
      })
      return order
    } catch (error) {
      throw new Error('Error obtaining the order')
    }
  }
}

export default api
