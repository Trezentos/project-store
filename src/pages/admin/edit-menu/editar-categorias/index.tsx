import { ReactNode } from 'react'
import { Container } from './styles'
import Table from '@/components/admin/MenuEdition/Categories/CategorieTable/Table'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { api } from '@/lib/api'
import {
  EditCategoriesProvider,
  ProductCategory,
  ProductFilter,
} from '@/contexts/pages/admin/EditCategoriesContext'

interface CategoriesProps {
  productCategories: ProductCategory[]
  filters: ProductFilter[]
}
export default function Categories({
  productCategories,
  filters,
}: CategoriesProps) {
  return (
    <Container>
      <EditCategoriesProvider value={{ filters, productCategories }}>
        <Table />
      </EditCategoriesProvider>
    </Container>
  )
}

Categories.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'nextauth-admin-token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  const { data: categoriesData } = await api.get<ProductCategory[]>(
    '/edit-menu/categories/get-categories',
  )
  const { data: filtersData } = await api.get<ProductFilter[]>(
    '/edit-menu/filters/get-filters',
  )

  const orderedByActive = categoriesData.sort((a, b) =>
    a.active === b.active ? 0 : a.active ? -1 : 1,
  )

  return {
    props: {
      productCategories: orderedByActive ?? [],
      filters: filtersData ?? [],
    },
  }
}
