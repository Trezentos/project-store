import { StaticImageData } from 'next/image'
import { createContext, ReactNode, useState, useEffect } from 'react'

export interface IHeaderContent {
  name: string
  link?: string
  featuredImg?: {
    name: string
    imageUrl: StaticImageData
  }
  subnavigation?: {
    name: string
  }[][]
}
interface HeaderContextType {
  updateHeaderContents: (headerContents: IHeaderContent[]) => void
  toggleMobileHeader: () => void
  headerContents: IHeaderContent[]
  mobileHeaderActive: boolean
}

interface HeaderContextProviderProps {
  children: ReactNode
}

export const HeaderContext = createContext({} as HeaderContextType)

export function HeaderContextProvider({
  children,
}: HeaderContextProviderProps) {
  const [mobileHeaderActive, setMobileHeaderActive] = useState(false)
  const [headerContents, setHeaderContents] = useState([] as IHeaderContent[])

  function toggleMobileHeader() {
    setMobileHeaderActive(!mobileHeaderActive)
  }

  function updateHeaderContents(headerContents: IHeaderContent[]) {
    setHeaderContents(headerContents)
  }

  return (
    <HeaderContext.Provider
      value={{
        toggleMobileHeader,
        mobileHeaderActive,
        headerContents,
        updateHeaderContents,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
