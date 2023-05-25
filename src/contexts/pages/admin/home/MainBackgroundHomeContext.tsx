import { StaticImageData } from 'next/image'
import { createContext, ReactNode, useState, useEffect } from 'react'

export interface IMainBackgroundHomeContent {}

export interface MainBackgroundItem {
  id: string
  mobileLink: string
  mobileKey: string
  desktopLink: string
  desktopKey: string
}
interface MainBackgroundHomeContextType {
  editMode: boolean
  backgroundItem: MainBackgroundItem
  toggleEditMode: (option?: boolean) => void
  updateBackgroundItem: (highlightItem: MainBackgroundItem) => void
}

interface MainBackgroundHomeContextProviderProps {
  children: ReactNode
}

export const MainBackgroundHomeContext = createContext(
  {} as MainBackgroundHomeContextType,
)

export function MainBackgroundHomeContextProvider({
  children,
}: MainBackgroundHomeContextProviderProps) {
  const [editMode, setEditMode] = useState(false)
  const [highlightItem, setHighlightItem] = useState<MainBackgroundItem>(
    {} as MainBackgroundItem,
  )

  function toggleEditMode(option?: boolean) {
    if (!option) {
      return setEditMode(!editMode)
    }

    setEditMode(option)
  }

  function updateHighlightItem(newHighlightItem: MainBackgroundItem) {
    setHighlightItem(newHighlightItem)
  }

  return (
    <MainBackgroundHomeContext.Provider
      value={{
        toggleEditMode,
        updateBackgroundItem: updateHighlightItem,
        editMode,
        backgroundItem: highlightItem,
      }}
    >
      {children}
    </MainBackgroundHomeContext.Provider>
  )
}
