import { StaticImageData } from 'next/image'
import { createContext, ReactNode, useState, useEffect } from 'react'

export interface IHighlightProductsContent {}

export interface HighlightItem {
  id: string
  image1Link: string
  image1Key: string
  image2Link: string
  image2Key: string
}
interface HighlightProductsContextType {
  editMode: boolean
  highlightItem: HighlightItem
  toggleEditMode: (option?: boolean) => void
  updateHighlightItem: (highlightItem: HighlightItem) => void
}

interface HightlightContextProviderProps {
  children: ReactNode
}

export const HighlightProductsContext = createContext(
  {} as HighlightProductsContextType,
)

export function HighlightProductsContextProvider({
  children,
}: HightlightContextProviderProps) {
  const [editMode, setEditMode] = useState(false)
  const [highlightItem, setHighlightItem] = useState<HighlightItem>(
    {} as HighlightItem,
  )

  function toggleEditMode(option?: boolean) {
    if (!option) {
      return setEditMode(!editMode)
    }

    setEditMode(option)
  }

  function updateHighlightItem(newHighlightItem: HighlightItem) {
    setHighlightItem(newHighlightItem)
  }

  return (
    <HighlightProductsContext.Provider
      value={{
        toggleEditMode,
        updateHighlightItem,
        editMode,
        highlightItem,
      }}
    >
      {children}
    </HighlightProductsContext.Provider>
  )
}
