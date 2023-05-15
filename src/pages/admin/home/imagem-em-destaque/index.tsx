import { FormEvent, ReactNode, useCallback } from 'react'
import { Container } from './styles'
import { api } from '@/lib/axios'

export default function FeaturedWallpaper() {
  return <Container>Imagem em destaque</Container>
}

FeaturedWallpaper.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}
