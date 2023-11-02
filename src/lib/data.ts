import prisma from "./prisma";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw error;
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    throw error;
  }
}

export async function getProductsPerCategory(name: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: { name },
      },
    });

    return products;
  } catch (error) {
    throw error;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });
    return product;
  } catch (error) {
    throw error;
  }
}
