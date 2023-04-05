import Header from '@/components/Header'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { GlobalStyle } from '../styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/styles/themes/default'
import { HeaderContextProvider } from '@/contexts/HeaderContext'
import Footer from '@/components/Footer'
import { CartContextProvider } from '@/contexts/CartContext'
import Cartside from '@/components/CartSide'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return <Component {...pageProps} />
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CartContextProvider>
          <HeaderContextProvider>
            <Header />
          </HeaderContextProvider>
          <Component {...pageProps} />
          <Cartside />
        </CartContextProvider>
        <Footer />
        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}
