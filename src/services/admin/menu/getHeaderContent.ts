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
