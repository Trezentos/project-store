import { FormEvent, ReactNode, useCallback } from 'react'
import { Container } from './styles'
import { api } from '@/lib/axios'

export default function FeaturedProducts1() {
  return <Container>Produtos em destaque 1</Container>
}

FeaturedProducts1.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}
