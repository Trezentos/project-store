import { StaticImageData } from 'next/image'
import { createContext, ReactNode, useState, useEffect } from 'react'

export interface ICarrouselContent {
  desktopLink: string
  desktopKey: string
  id: string
  mobileKey: string
  mobileLink: string
  active: boolean
}

interface CarrouselContextType {
  carrouselCard: ICarrouselContent
  editMode: boolean
  isNewCarrousel: boolean
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
  const [isNewCarrousel, setIsNewCarrousel] = useState(false)
  const [carrouselCard, setCarrouselCard] = useState({} as ICarrouselContent)

  function toggleEditMode() {
    setEditMode(!editMode)
  }

  function updateCarrouselCard(carrouselCard: ICarrouselContent) {
    setCarrouselCard(carrouselCard)
  }

  useEffect(() => {
    const { desktopKey, mobileKey } = carrouselCard

    setIsNewCarrousel(!desktopKey && !mobileKey)
  }, [carrouselCard])

  return (
    <CarrouselContext.Provider
      value={{
        toggleEditMode,
        editMode,
        carrouselCard,
        updateCarrouselCard,
        isNewCarrousel,
      }}
    >
      {children}
    </CarrouselContext.Provider>
  )
}
