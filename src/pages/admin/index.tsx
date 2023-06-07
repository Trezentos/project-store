import { ReactNode, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthAdminContext } from '@/contexts/pages/admin/AuthAdminContext'
import { api } from '@/lib/api'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function Admin() {
  const router = useRouter()

  const { isAuthenticated } = useContext(AuthAdminContext)

  useEffect(() => {
    // api.get('/users')
  }, [])

  return (
    <>
      <h1>Painel Admin</h1>
    </>
  )
}

Admin.getLayout = function PageLayout(page: ReactNode) {
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

  return {
    redirect: {
      destination: '/admin/home/carrousel',
      permanent: false,
    },
  }
}
