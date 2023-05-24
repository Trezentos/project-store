import { FormEvent, ReactNode, useCallback } from 'react'
import { CardHeader, Container } from './styles'

import HighlightProducts from '@/components/admin/Home/HighlightProducts'
import { GetServerSideProps } from 'next'
import { api } from '@/lib/axios'
import { HighlightProductsContextProvider } from '@/contexts/pages/admin/home/HighlightProductsContext'

interface HighLightItemItem {
  id: string
  image1Link: string
  image1Key: string
  image2Link: string
  image2Key: string
}

interface FeaturedWallpaperProps {
  highlightItem: HighLightItemItem
}
export default function FeaturedWallpaper({
  highlightItem,
}: FeaturedWallpaperProps) {
  console.log('front', highlightItem)
  return (
    <Container>
      <HighlightProductsContextProvider>
        <HighlightProducts />
      </HighlightProductsContextProvider>
    </Container>
  )
}

FeaturedWallpaper.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get<HighLightItemItem[]>(
    '/home/highlight-images/get-hightlight-images',
  )

  return {
    props: {
      highlightImage: data,
    },
  }
}
