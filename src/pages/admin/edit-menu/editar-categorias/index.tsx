import { ReactNode } from 'react'
import { Container } from './styles'
import Table from '@/components/admin/MenuEdition/Table/Table'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { api } from '@/lib/api'
import {
  EditCategoriesContext,
  EditCategoriesProvider,
  ProductCategory,
} from '@/contexts/pages/admin/EditCategoriesContext'

interface CategoriesProps {
  productCategories: ProductCategory[]
}
export default function Categories({ productCategories }: CategoriesProps) {
  return (
    <Container>
      <div>
        <EditCategoriesProvider>
          <Table productCategoriesFromApi={productCategories} />
        </EditCategoriesProvider>
      </div>
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

  const { data } = await api.get<ProductCategory[]>(
    '/edit-menu/categories/get-categories',
  )

  const orderedByActive = data.sort((a, b) =>
    a.active === b.active ? 0 : a.active ? -1 : 1,
  )

  return {
    props: {
      productCategories: orderedByActive ?? [],
    },
  }
}
