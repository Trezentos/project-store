import { GetServerSideProps } from 'next'
import { Container } from './styles'
import { ReactNode } from 'react'
import { ModalAdminProvider } from '@/contexts/pages/admin/ModalAdminContext'
import Table from '@/components/admin/MenuEdition/Products/ProductsTable/Table'

import { parseCookies } from 'nookies'
import {
  Product,
  ProductVariation,
  ProductsAdminProvider,
} from '@/contexts/pages/admin/ProductsAdminContext'
import { api } from '@/lib/api'

interface ProductsProps {
  allProducts: Product[]
  allProductsVariations: ProductVariation[]
  allCategoriesOptions: {
    label: string
    value: string
  }[]
}

export default function Products({
  allProducts,
  allProductsVariations,
  allCategoriesOptions,
}: ProductsProps) {
  return (
    <Container>
      <ModalAdminProvider>
        <ProductsAdminProvider
          productsFromAPI={{ allProducts, allProductsVariations }}
          categoriesOptionsFromAPI={allCategoriesOptions}
        >
          <Table />
        </ProductsAdminProvider>
      </ModalAdminProvider>
    </Container>
  )
}

Products.getLayout = function PageLayout(page: ReactNode) {
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

  const {
    data: { allProducts, allProductsVariations },
  } = await api.get('/products/get-all-products')
  const { data: allCategoriesOptions } = await api.get(
    '/edit-menu/categories/get-categories-options',
  )

  return {
    props: {
      allProducts,
      allCategoriesOptions,
      allProductsVariations,
    },
  }
}
