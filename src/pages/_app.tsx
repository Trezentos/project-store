import Header from '@/components/Header'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { GlobalStyle, AdminStyle } from '../styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/styles/themes/default'
import { HeaderContextProvider } from '@/contexts/HeaderContext'
import Footer from '@/components/Footer'
import { CartContextProvider } from '@/contexts/CartContext'
import Cartside from '@/components/CartSide'
import { SessionProvider } from 'next-auth/react'
import Sidebar from './../components/admin/SideBar'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  if (Component.getLayout) {
    return (
      <>
        <ThemeProvider theme={defaultTheme}>
          <AdminStyle />
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
        </ThemeProvider>
      </>
    )
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CartContextProvider>
          <SessionProvider session={session}>
            <HeaderContextProvider>
              <Header />
            </HeaderContextProvider>
            <Component {...pageProps} />
          </SessionProvider>
          <Cartside />
        </CartContextProvider>
        <Footer />
        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}
