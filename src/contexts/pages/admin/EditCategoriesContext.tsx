import { recoverUserInformation, signInRequest } from '@/services/auth'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { setCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { api } from '@/lib/api'
import { v4 } from 'uuid'

interface EditCategoriesProviderProps {
  children: ReactNode
}

interface ProductFilters {
  id: string
  name: string
  active: boolean
}
export interface ProductCategory {
  id: string
  imageBackgroundName: string
  imageBackgroundLink: string
  name: string
  active: boolean
  filters: ProductFilters[]
}

interface EditCategoriesContextDatas {
  selectedImage: string | null
  isHoverdImage: boolean
  updateSelectedImage: (imgSrc: string) => void
  updateHoveredImage: (isHovered: boolean) => void
  modalIsOpen: boolean
  closeModal: () => void
  openModal: () => void
}

export const EditCategoriesContext = createContext<EditCategoriesContextDatas>(
  {} as EditCategoriesContextDatas,
)

export function EditCategoriesProvider({
  children,
}: EditCategoriesProviderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isHoverdImage, setIsHoveredImage] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const updateSelectedImage = useCallback((imgSrc: string) => {
    setSelectedImage(imgSrc)
  }, [])

  const updateHoveredImage = useCallback((isHovered: boolean) => {
    setIsHoveredImage(isHovered)
  }, [])

  const closeModal = () => {
    setModalIsOpen(false)
  }
  const openModal = () => {
    setModalIsOpen(true)
  }

  return (
    <EditCategoriesContext.Provider
      value={{
        selectedImage,
        updateSelectedImage,
        updateHoveredImage,
        isHoverdImage,
        closeModal,
        openModal,
        modalIsOpen,
      }}
    >
      {children}
    </EditCategoriesContext.Provider>
  )
}
