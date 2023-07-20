import { api } from '@/lib/api'
import { prisma } from '@/lib/prisma'
import { ProductCategory } from '@prisma/client'

const colorContent = [
  {
    color: 'purple',
    id: 1,
  },
  {
    color: 'red',
    id: 2,
  },
  {
    color: 'blue',
    id: 3,
  },
  {
    color: 'crimson',
    id: 4,
  },
  {
    color: 'pink',
    id: 5,
  },
  {
    color: 'gray',
    id: 6,
  },
  {
    color: 'brown',
    id: 7,
  },
  {
    color: 'deepskyblue',
    id: 8,
  },
  {
    color: 'yellow',
    id: 9,
  },
  {
    color: 'orange',
    id: 12,
  },
  {
    color: 'aliceblue',
    id: 354,
  },
]

export default async function getManyProducts(category: ProductCategory) {
  const activeFilters = await prisma.productFilter.findMany({
    where: {
      productCategory: {
        some: { id: category.id },
      },
    },
  })

  return {
    colorContent,
    activeFilters,
  }
}
