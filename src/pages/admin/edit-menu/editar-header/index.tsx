import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { Container } from './styles'
import {
  EditHeaderFromAdminProvider,
  HeaderItem,
  SubHeaderItem,
} from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import { api } from '@/lib/api'
import { ProductCategory } from '@/contexts/pages/admin/EditCategoriesContext'
import HeaderTable from '@/components/admin/MenuEdition/Header/HeaderTable/Table'
import requestHeaderData from '@/services/admin/menu/getHeaderContent'

interface EditHeaderProps {
  allCategories: ProductCategory[]
  headerItems: HeaderItem[]
  headerSubItemsPerHeaderItemId: {
    subHeaderItems: SubHeaderItem[]
    headerItemId: string
  }[]
}
export default function EditHeader({
  allCategories,
  headerItems,
  headerSubItemsPerHeaderItemId,
}: EditHeaderProps) {
  return (
    <Container>
      <EditHeaderFromAdminProvider
        value={{
          allCategories,
          headerItemsFromAPI: headerItems,
        }}
      >
        <HeaderTable />
      </EditHeaderFromAdminProvider>
    </Container>
  )
}

EditHeader.getLayout = function PageLayout(page: ReactNode) {
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

  const { allCategories, headerItems, headerSubItemsPerHeaderItemId } =
    await requestHeaderData()

  return {
    props: {
      allCategories,
      headerItems,
      headerSubItemsPerHeaderItemId,
    },
  }
}
