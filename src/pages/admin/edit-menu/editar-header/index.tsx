import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { Container } from './styles'

export default function EditHeader() {
  return (
    <Container>
      <h1>Editar header</h1>
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

  return {
    props: {},
  }
}
