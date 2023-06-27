import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import { ProductCategory } from './EditCategoriesContext'

export interface HeaderItem {
  id: string
  name: string
  linkTo: string
  linkName: string
  featuredImg: {
    imageUrl: string | null
    linkTo: string | null
    name: string | null
  }
  categoryId: string
}

export interface HeaderSubItem {
  id: string
  name: string
  linkTo: string
  categoryName: string
  backgroundImageLink: string
  backgroundImageName: string
  categoryId: string
}

interface EditHeaderFromAdminProviderProps {
  children: ReactNode
  value: {
    allCategories: ProductCategory[]
    headerItemsFromAPI: HeaderItem[]
  }
}

interface EditHeaderFromAdminContextData {
  allCategories: ProductCategory[]
  headerItems: HeaderItem[]
  editModalIsOpen: boolean
  addModalIsOpen: boolean
  closeEditModal: () => void
  closeAddModal: () => void
  openEditionModal: (id: string) => void
  isHoverdImage: boolean
  selectedImage: string | null
  headerItemToEdit: HeaderItem
  openAddModal: () => void
  removeFeaturedImage: () => void
  updateHeaderItem: (headerItem: HeaderItem) => void
  deleteHeaderItem: (id: string) => void
  updateSelectedImage: (imgSrc: string | null) => void
  updateHoveredImage: (isHovered: boolean) => void
  getCategoryOption: (id: string) => {
    label: string
    value: string
  }
  allCategoriesOptions: {
    value: string
    label: string
  }[]
}

export const EditHeaderFromAdminContext =
  createContext<EditHeaderFromAdminContextData>(
    {} as EditHeaderFromAdminContextData,
  )

export function EditHeaderFromAdminProvider({
  children,
  value: { allCategories, headerItemsFromAPI },
}: EditHeaderFromAdminProviderProps) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [headerItems, setHeaderItems] = useState(headerItemsFromAPI)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isHoverdImage, setIsHoveredImage] = useState(false)
  const [headerItemToEdit, setHeaderItemToEdit] = useState<HeaderItem>(
    {} as HeaderItem,
  )

  const closeEditModal = () => {
    setEditModalIsOpen(false)
  }
  const closeAddModal = () => {
    setAddModalIsOpen(false)
  }
  const openEditionModal = (id: string) => {
    const selectedHeader = headerItems.find((item) => item.id === id)
    if (!selectedHeader) return
    setHeaderItemToEdit(selectedHeader)
    setEditModalIsOpen(true)
  }

  const allCategoriesOptions = allCategories
    .map((item) => ({
      value: item.id,
      label: item.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const getCategoryOption = (id: string) => {
    const category = allCategories.find((item) => item.id === id)

    if (!category)
      return {
        label: '',
        value: '',
      }

    return {
      label: category.name,
      value: category.id,
    }
  }

  const openAddModal = () => {
    setAddModalIsOpen(true)
  }
  const updateHeaderItem = useCallback(
    (headerItem: HeaderItem) => {
      setHeaderItems(
        headerItems.map((item) => {
          if (item.id === headerItem.id) return headerItem
          return item
        }),
      )
    },
    [headerItems],
  )

  const deleteHeaderItem = useCallback(
    (id: string) => {
      setHeaderItems(headerItems.filter((item) => item.id !== id))
    },
    [headerItems],
  )

  const updateSelectedImage = useCallback((imgSrc: string | null) => {
    setSelectedImage(imgSrc)
  }, [])

  const updateHoveredImage = useCallback((isHovered: boolean) => {
    setIsHoveredImage(isHovered)
  }, [])

  const removeFeaturedImage = useCallback(() => {
    setHeaderItemToEdit({
      ...headerItemToEdit,
      featuredImg: {
        imageUrl: null,
        linkTo: null,
        name: null,
      },
    })
  }, [headerItemToEdit])

  return (
    <EditHeaderFromAdminContext.Provider
      value={{
        updateSelectedImage,
        updateHoveredImage,
        isHoverdImage,
        allCategories,
        headerItems,
        closeAddModal,
        closeEditModal,
        getCategoryOption,
        openAddModal,
        openEditionModal,
        addModalIsOpen,
        editModalIsOpen,
        headerItemToEdit,
        allCategoriesOptions,
        removeFeaturedImage,
        updateHeaderItem,
        deleteHeaderItem,
        selectedImage,
      }}
    >
      {children}
    </EditHeaderFromAdminContext.Provider>
  )
}
