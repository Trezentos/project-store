import { ProductCategory } from '@/contexts/pages/admin/EditCategoriesContext'
import { api } from '@/lib/api'

export default async function requestHeaderData() {
  try {
    const { data: allCategories } = await api.get<ProductCategory[]>(
      'edit-menu/categories/get-categories',
    )

    const { data: headerItems } = await api.get<ProductCategory[]>(
      'edit-menu/header/get-header-items',
    )

    return {
      allCategories,
      headerItems,
    }
  } catch (error: any) {
    return {
      allCategories: [],
      headerItems: [],
    }
  }
}
