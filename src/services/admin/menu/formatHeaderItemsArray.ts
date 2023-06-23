import { HeaderItem, ProductCategory, HeaderSubItem } from '@prisma/client'

const getPropertyValueFrom = (
  categories: ProductCategory[],
  { categoryId, property }: { categoryId: string | null; property: 'hifen' },
) => {
  return categories
    .filter((categorieItem) => {
      return categorieItem.id === categoryId
    })
    .reduce((_, curr) => curr[`${property}`], '')
}

export default function formatHeaderItemsArray(
  headerItems: (HeaderItem & {
    HeaderSubItem: HeaderSubItem[]
  })[],
  categories: ProductCategory[],
) {
  return headerItems.map((headerItem) => {
    return {
      id: headerItem.id,
      name: headerItem.name,
      linkTo: getPropertyValueFrom(categories, {
        categoryId: headerItem.category_id,
        property: 'hifen',
      }),
      featuredImg: {
        name: headerItem.backgroundImageName,
        imageUrl: headerItem.backgroundImageLink,
        linkTo: headerItem.backgroundImageLinkTo,
      },
      categoryId: headerItem.category_id,
      headerSubItems: headerItem.HeaderSubItem.map((subHeaderItem) => {
        return {
          name: subHeaderItem.name,
          linkTo: getPropertyValueFrom(categories, {
            categoryId: subHeaderItem.category_id,
            property: 'hifen',
          }),
          isHighlighted: subHeaderItem.isHighlightedSubItem,
          columnPosition: subHeaderItem.columnPosition,
          categoryId: subHeaderItem.category_id,
        }
      }).sort((a, b) => {
        if (a.isHighlighted && !b.isHighlighted) {
          return -1
        } else if (!a.isHighlighted && b.isHighlighted) {
          return 1
        }

        // Manter a ordem original para valores iguais
        return 0
      }),
    }
  })
}

export function formatHeaderItemObject(
  headerItem: HeaderItem & {
    HeaderSubItem: HeaderSubItem[]
  },
  categories: ProductCategory[],
) {
  return {
    id: headerItem.id,
    name: headerItem.name,
    linkTo: getPropertyValueFrom(categories, {
      property: 'hifen',
      categoryId: headerItem.category_id,
    }),
    featuredImg: {
      name: headerItem.backgroundImageName,
      imageUrl: headerItem.backgroundImageLink,
      linkTo: headerItem.backgroundImageLinkTo,
    },
    categoryId: headerItem.category_id,
    headerSubItems: headerItem.HeaderSubItem.map((subHeaderItem) => {
      return {
        name: subHeaderItem.name,
        linkTo: getPropertyValueFrom(categories, {
          categoryId: subHeaderItem.category_id,
          property: 'hifen',
        }),
        isHighlighted: subHeaderItem.isHighlightedSubItem,
        columnPosition: subHeaderItem.columnPosition,
        categoryId: subHeaderItem.category_id,
      }
    }).sort((a, b) => {
      if (a.isHighlighted && !b.isHighlighted) {
        return -1
      } else if (!a.isHighlighted && b.isHighlighted) {
        return 1
      }

      // Manter a ordem original para valores iguais
      return 0
    }),
  }
}
