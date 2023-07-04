import { ProductCategory } from '@/contexts/pages/admin/EditCategoriesContext'
import {
  HeaderItem,
  SubHeaderItem,
} from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import { api } from '@/lib/api'

export default async function requestHeaderData() {
  try {
    const { data: allCategories } = await api.get<ProductCategory[]>(
      'edit-menu/categories/get-categories',
    )

    const { data: headerItems } = await api.get<HeaderItem[]>(
      'edit-menu/header/get-header-items',
    )

    const headerSubItemsPerHeaderItemId = headerItems
      .map((headerItem) => {
        if (headerItem.headerSubItems.length < 1) return undefined

        return headerItem.headerSubItems.map((headerSubItem) => {
          return {
            ...headerSubItem,
            headerItemId: headerItem.id,
          }
        }) as SubHeaderItem[]
      })
      .filter((item) => item)

    console.log(headerSubItemsPerHeaderItemId)

    return {
      allCategories,
      headerItems,
      headerSubItemsPerHeaderItemId,
    }
  } catch (error: any) {
    return {
      allCategories: [],
      headerItems: [],
    }
  }
}
