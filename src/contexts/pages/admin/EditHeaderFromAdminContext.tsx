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
  backgroundImageLink: string
  backgroundImageName: string
  backgroundImageLinkTo: string
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
  headerItemToEdit: HeaderItem
  openAddModal: () => void
  updateSingleHeaderItem: (headerItem: HeaderItem) => void
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
  const [user, setUser] = useState()
  const router = useRouter()
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [headerItemToEdit, setHeaderItemToEdit] = useState<HeaderItem>(
    {} as HeaderItem,
  )
  const [headerItems, setHeaderItems] = useState(headerItemsFromAPI)

  const closeEditModal = () => {
    setEditModalIsOpen(false)
  }
  const closeAddModal = () => {
    setAddModalIsOpen(false)
  }
  const openEditionModal = (id: string) => {
    const selectedHeader = headerItemsFromAPI.find((item) => item.id === id)
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
  const updateSingleHeaderItem = useCallback(
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

  return (
    <EditHeaderFromAdminContext.Provider
      value={{
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
        updateSingleHeaderItem,
      }}
    >
      {children}
    </EditHeaderFromAdminContext.Provider>
  )
}
