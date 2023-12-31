import { PrismaClient } from '@prisma/client'
import mockup_brands from './mockup/brands'
import mockup_graphics_cards from './mockup/graphics_cards'
import mockup_hard_drives from './mockup/hard_drives'
import mockup_motherboards from './mockup/motherboards'
import mockup_processors from './mockup/processors'
import mockup_ram from './mockup/ram'

const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.brand.deleteMany()

  const brands = await prisma.brand.createMany({
    data: mockup_brands
  })

  const graphic_cards = await prisma.category.create({
    data: {
      name: 'graphics cards',
      products: {
        createMany: {
          data: mockup_graphics_cards
        }
      }
    }
  })

  const processors = await prisma.category.create({
    data: {
      name: 'processors',
      products: {
        createMany: {
          data: mockup_processors
        }
      }
    }
  })

  const hard_drives = await prisma.category.create({
    data: {
      name: 'hard drives',
      products: {
        createMany: {
          data: mockup_hard_drives
        }
      }
    }
  })

  const ram = await prisma.category.create({
    data: {
      name: 'ram',
      products: {
        createMany: {
          data: mockup_ram
        }
      }
    }
  })

  const motherboards = await prisma.category.create({
    data: {
      name: 'motherboards',
      products: {
        createMany: {
          data: mockup_motherboards
        }
      }
    }
  })

  console.log({ brands, graphic_cards, processors, hard_drives, ram, motherboards })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
