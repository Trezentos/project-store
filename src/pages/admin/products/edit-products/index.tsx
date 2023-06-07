import { GetServerSideProps } from 'next'
import { Container } from './styles'
import { ReactNode } from 'react'
import { parseCookies } from 'nookies'

export default function Products() {
  return (
    <Container>
      <h1>Products</h1>
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

  return {
    props: {},
  }
}
