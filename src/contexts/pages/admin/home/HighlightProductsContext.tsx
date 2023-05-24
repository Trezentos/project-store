import { StaticImageData } from 'next/image'
import { createContext, ReactNode, useState, useEffect } from 'react'

export interface IHighlightProductsContent {}

interface HighlightProductsContextType {
  editMode: boolean
  toggleEditMode: (option?: boolean) => void
}

interface CarrouselContextProviderProps {
  children: ReactNode
}

export const HighlightProductsContext = createContext(
  {} as HighlightProductsContextType,
)

export function HighlightProductsContextProvider({
  children,
}: CarrouselContextProviderProps) {
  const [editMode, setEditMode] = useState(false)

  function toggleEditMode(option?: boolean) {
    if (!option) {
      return setEditMode(!editMode)
    }

    setEditMode(option)
  }

  return (
    <HighlightProductsContext.Provider
      value={{
        toggleEditMode,
        editMode,
      }}
    >
      {children}
    </HighlightProductsContext.Provider>
  )
}
