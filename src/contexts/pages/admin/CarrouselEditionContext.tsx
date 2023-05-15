import { StaticImageData } from 'next/image'
import { createContext, ReactNode, useState, useEffect } from 'react'

export interface ICarrouselContent {
  desktopLink: string
  desktopKey: string
  id: string
  mobileKey: string
  mobileLink: string
}

interface CarrouselContextType {
  carrouselCard: ICarrouselContent
  editMode: boolean
  toggleEditMode: () => void
  updateCarrouselCard: (carrouseCard: ICarrouselContent) => void
}

interface CarrouselContextProviderProps {
  children: ReactNode
}

export const CarrouselContext = createContext({} as CarrouselContextType)

export function CarrouselContextProvider({
  children,
}: CarrouselContextProviderProps) {
  const [editMode, setEditMode] = useState(false)
  const [carrouselCard, setCarrouselCard] = useState({} as ICarrouselContent)

  function toggleEditMode() {
    setEditMode(!editMode)
  }

  function updateCarrouselCard(carrouseCard: ICarrouselContent) {
    setCarrouselCard(carrouseCard)
  }

  return (
    <CarrouselContext.Provider
      value={{ toggleEditMode, editMode, carrouselCard, updateCarrouselCard }}
    >
      {children}
    </CarrouselContext.Provider>
  )
}
