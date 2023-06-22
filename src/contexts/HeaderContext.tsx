import { StaticImageData } from 'next/image'
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react'
import FeaturedImage from '../assets/pretty-woman.png'
import FeaturedImage2 from '../assets/pretty-woman-2.png'
import { api } from '@/lib/api'
import { HeaderItem } from '@prisma/client'

export interface ISubHeaderContent {
  name: string
  linkTo: string
  isHighlighted: boolean
  columnPosition: number
}
export interface IHeaderContent {
  id: string
  name: string
  linkTo?: string
  featuredImg?: {
    name: string
    imageUrl: StaticImageData
    linkTo?: string
  }
  headerSubItems?: ISubHeaderContent[]
}
interface HeaderContextType {
  updateHeaderContents: (headerContents: IHeaderContent[]) => void
  toggleMobileHeader: () => void
  headerContent: IHeaderContent[]
  mobileHeaderActive: boolean
  closeSubItems: () => void
  openSubItems: (e: HTMLElement | null) => void
  isExpansibleHeaderItem: (name: string) => boolean
  getHeaderItemProperties: (id: string) => IHeaderContent
  convertToColumns: (
    headerSubItems: ISubHeaderContent[],
  ) => ISubHeaderContent[][]
}

interface HeaderContextProviderProps {
  children: ReactNode
}

export const HeaderContext = createContext({} as HeaderContextType)

export function HeaderContextProvider({
  children,
}: HeaderContextProviderProps) {
  const [mobileHeaderActive, setMobileHeaderActive] = useState(false)
  const [headerContent, setHeaderContent] = useState([] as IHeaderContent[])

  const getHeaderData = useCallback(async () => {
    try {
      const { data } = await api.get<HeaderItem[]>(
        '/edit-menu/header/get-header-items',
      )
      setHeaderContent(data)
    } catch (err: any) {
      console.error(err.message)
    }
  }, [])

  function toggleMobileHeader() {
    setMobileHeaderActive(!mobileHeaderActive)
  }

  function updateHeaderContents(headerContents: IHeaderContent[]) {
    setHeaderContent(headerContents)
  }

  const closeSubItems = function () {
    const allSubItems = document.querySelectorAll('.sub-header')
    allSubItems.forEach((item) => item.classList.remove('active'))
  }

  const openSubItems = function (e: HTMLElement | null) {
    e?.parentElement?.lastElementChild?.classList.toggle('active')
  }

  const isExpansibleHeaderItem = useCallback(
    (name: string) => {
      const headerItem = headerContent.find((item) => item.name === name)

      if (!headerItem) return false

      const { headerSubItems } = headerItem

      if (!headerSubItems?.[0]) return false

      if (headerSubItems.length > 0) return true

      return false
    },
    [headerContent],
  )

  const getHeaderItemProperties = useCallback(
    (id: string) => {
      const headerItem = headerContent.find((item) => item.id === id)

      if (!headerItem) return {} as IHeaderContent

      return headerItem
    },
    [headerContent],
  )

  const convertToColumns = useCallback(
    (headerSubItems: ISubHeaderContent[]) => {
      const filteredByColumns = [
        headerSubItems.filter((item) => item.columnPosition === 0),
        headerSubItems.filter((item) => item.columnPosition === 1),
        headerSubItems.filter((item) => item.columnPosition === 2),
      ].filter((array) => array.length > 0)

      return filteredByColumns
    },
    [],
  )

  useEffect(() => {
    getHeaderData()
  }, [getHeaderData])

  return (
    <HeaderContext.Provider
      value={{
        toggleMobileHeader,
        mobileHeaderActive,
        headerContent,
        updateHeaderContents,
        openSubItems,
        closeSubItems,
        isExpansibleHeaderItem,
        getHeaderItemProperties,
        convertToColumns,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
