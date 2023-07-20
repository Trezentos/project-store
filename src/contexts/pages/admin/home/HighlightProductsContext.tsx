import { StaticImageData } from 'next/image'
import { createContext, ReactNode, useState, useEffect } from 'react'

export interface IHighlightProductsContent {}

export interface HighlightItem {
  id: string
  image1Link: string
  image1Key: string
  image1Name: string
  image2Link: string
  image2Key: string
  image2Name: string
}
interface HighlightProductsContextType {
  editMode: boolean
  highlightItem: HighlightItem
  toggleEditMode: (option?: boolean) => void
  updateHighlightItem: (highlightItem: HighlightItem) => void
}

interface HightlightContextProviderProps {
  children: ReactNode
  value: HighlightItem
}

export const HighlightProductsContext = createContext(
  {} as HighlightProductsContextType,
)

export function HighlightProductsContextProvider({
  children,
  value,
}: HightlightContextProviderProps) {
  const [editMode, setEditMode] = useState(false)
  const [highlightItem, setHighlightItem] = useState<HighlightItem>(value)

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
