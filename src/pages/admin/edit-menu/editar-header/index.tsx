import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { Container } from './styles'
import { EditHeaderFromAdminProvider } from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import { api } from '@/lib/api'
import { ProductCategory } from '@/contexts/pages/admin/EditCategoriesContext'
import HeaderTable from '@/components/admin/MenuEdition/HeaderTable/Table'

interface EditHeaderProps {
  allCategories: ProductCategory[]
}
export default function EditHeader({ allCategories }: EditHeaderProps) {
  return (
    <Container>
      <div>
        <EditHeaderFromAdminProvider value={{ allCategories }}>
          <HeaderTable />
        </EditHeaderFromAdminProvider>
      </div>
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

  const { data } = await api.get<ProductCategory[]>(
    'edit-menu/categories/get-categories',
  )

  return {
    props: { allCategories: data },
  }
}
