import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { ReactNode, useEffect } from 'react'
import { Container } from './style'

export default function Home() {
  const router = useRouter()

  return <Container>Home page</Container>
}

Home.getLayout = function PageLayout(page: ReactNode) {
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
