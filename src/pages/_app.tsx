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
import { AuthAdminProvider } from '@/contexts/pages/admin/AuthAdminContext'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'

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
  const router = useRouter()

  if (Component.getLayout) {
    const isLoginPageAdmin = router.pathname.includes('login')

    return (
      <>
        <AuthAdminProvider>
          <ThemeProvider theme={defaultTheme}>
            <AdminStyle />
            {isLoginPageAdmin ? (
              <Component {...pageProps} />
            ) : (
              <Sidebar>
                <Component {...pageProps} />
              </Sidebar>
            )}
          </ThemeProvider>
          <ToastContainer />
        </AuthAdminProvider>
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
        <ToastContainer />
      </ThemeProvider>
    </>
  )
}
