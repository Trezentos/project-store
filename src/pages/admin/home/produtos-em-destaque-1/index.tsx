import { FormEvent, ReactNode, useCallback } from 'react'
import { Container } from './styles'
import { api } from '@/lib/api'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

export default function FeaturedProducts1() {
  return <Container>Produtos em destaque 1</Container>
}

FeaturedProducts1.getLayout = function PageLayout(page: ReactNode) {
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
