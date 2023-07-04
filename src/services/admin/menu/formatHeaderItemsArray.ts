import { HeaderItem, ProductCategory, HeaderSubItem } from '@prisma/client'

const getPropertyValueFrom = (
  categories: ProductCategory[],
  {
    categoryId,
    property,
  }: { categoryId: string | null; property: 'hifen' | 'name' },
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
      linkName: getPropertyValueFrom(categories, {
        categoryId: headerItem.category_id,
        property: 'name',
      }),
      featuredImg: {
        name: headerItem.backgroundImageName,
        imageUrl: headerItem.backgroundImageLink,
        linkTo: headerItem.backgroundImageLinkTo,
      },
      categoryId: headerItem.category_id,
      headerSubItems: headerItem.HeaderSubItem.map((subHeaderItem) => {
        return {
          id: subHeaderItem.id,
          name: subHeaderItem.name,
          linkTo: getPropertyValueFrom(categories, {
            categoryId: subHeaderItem.category_id,
            property: 'hifen',
          }),
          linkName: getPropertyValueFrom(categories, {
            categoryId: subHeaderItem.category_id,
            property: 'name',
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
  category: ProductCategory,
) {
  return {
    id: headerItem.id,
    name: headerItem.name,
    linkTo: category.hifen,
    linkName: category.name,
    featuredImg: {
      name: headerItem.backgroundImageName,
      imageUrl: headerItem.backgroundImageLink,
      linkTo: headerItem.backgroundImageLinkTo,
    },
    categoryId: headerItem.category_id,
    headerSubItems: headerItem.HeaderSubItem.map((subHeaderItem) => {
      return {
        name: subHeaderItem.name,
        linkTo: category.hifen,
        linkName: category.name,
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

export function formatSubHeaderItemObject(
  headerSubItem: HeaderSubItem,
  category: ProductCategory,
) {
  return {
    id: headerSubItem.id,
    name: headerSubItem.name,
    linkTo: category.hifen,
    linkName: category.name,
    categoryId: headerSubItem.category_id,
    columnPosition: headerSubItem.columnPosition,
    isHighlighted: headerSubItem.isHighlightedSubItem,
  }
}
