import { prisma } from '@/lib/prisma'

export default async function connectAndDisconnectCategories(array: any[]) {
  const allCategories = await prisma.productCategory.findMany()

  const categoriesToDisconnect = allCategories
    .filter((item: any) => !array.includes(item.id))
    .map((item) => ({
      id: item.id,
    }))

  const categoriesToConnect = array.map((item) => ({
    id: item,
  }))

  return {
    categoriesToDisconnect,
    categoriesToConnect,
  }
}
