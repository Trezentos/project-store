import { FormEvent, ReactNode, useCallback } from 'react'
import { CardHeader, Container } from './styles'

import HighlightProducts from '@/components/admin/Home/HighlightProducts'
import { GetServerSideProps } from 'next'
import { api } from '@/lib/api'
import {
  MainBackgroundItem,
  MainBackgroundHomeContextProvider,
} from '@/contexts/pages/admin/Home/MainBackgroundHomeContext'
import MainBackgroundHome from '@/components/admin/Home/MainBackgroudHome'
import {
  HighlightItem,
  HighlightProductsContextProvider,
} from '@/contexts/pages/admin/Home/HighlightProductsContext'
import { parseCookies } from 'nookies'

interface FeaturedWallpaperProps {
  highlightItem: HighlightItem
  backgroundItem: MainBackgroundItem
}
export default function FeaturedWallpaper({
  highlightItem,
  backgroundItem,
}: FeaturedWallpaperProps) {
  return (
    <Container>
      <HighlightProductsContextProvider>
        <HighlightProducts highlightItemFromApi={highlightItem} />
      </HighlightProductsContextProvider>
      <MainBackgroundHomeContextProvider>
        <MainBackgroundHome mainBackgroundItemFromApi={backgroundItem} />
      </MainBackgroundHomeContextProvider>
    </Container>
  )
}

FeaturedWallpaper.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { 'nextauth-admin-token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  const { data: highlightItemResponse } = await api.get<HighlightItem[]>(
    '/home/highlight-images/get-hightlight-images',
  )
  const { data: backgroundItemResponse } = await api.get<MainBackgroundItem[]>(
    '/home/main-background-home/get-background-item',
  )

  return {
    props: {
      highlightItem: highlightItemResponse,
      backgroundItem: backgroundItemResponse,
    },
  }
}
