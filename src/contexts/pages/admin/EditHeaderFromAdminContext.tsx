import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import produce from 'immer'

import { ProductCategory } from './EditCategoriesContext'
export interface SubHeaderItem {
  id: string
  name: string
  linkTo: string
  linkName: string
  categoryId: string
  isHighlighted: boolean
  columnPosition: number
  headerItemId: string
}
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
  headerSubItems: SubHeaderItem[]
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
  closeEditHeaderModal: () => void
  closeAddHeaderModal: () => void
  openEditionModal: (id: string) => void
  openSubHeaderEditionModal: (headerSubItem: SubHeaderItem) => void
  isHoverdImage: boolean
  selectedImage: string | null
  headerItemToEdit: HeaderItem
  subHeaderItemToEdit: SubHeaderItem
  openHeaderAddModal: () => void
  removeFeaturedImage: () => void
  addHeaderItem: (newHeaderItem: HeaderItem) => void
  updateHeaderItem: (headerItem: HeaderItem) => void
  openSubHeaderAddModal: (id: string) => void
  closeSubHeaderAddModal: () => void
  updateSubHeaderItem: (
    subHeaderItem: SubHeaderItem,
    headerItemId: string,
  ) => void
  deleteHeaderItem: (id: string) => void
  deleteSubHeaderItem: (id: string, headerItemId: string) => void
  updateSelectedImage: (imgSrc: string | null) => void
  updateHoveredImage: (isHovered: boolean) => void
  headerItemIdToAddIn: string
  closeSubHeaderEditionModal: () => void
  subHeaderModalOpen: boolean
  addSubHeaderItem: (
    newSubHeaderItem: SubHeaderItem,
    headerItemId: string,
  ) => void
  addSubHeaderModalIsOpen: boolean
  getHighlightItemDefaultValue: (isHighlighted: boolean) => {
    label: string
    value: string
  }
  getCategoryOption: (id: string) => {
    label: string
    value: string
  }
  getColumnPositionDefaultValue: (columnPosition: number) => {
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
  const [subHeaderModalOpen, setSubHeaderModalOpen] = useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [addSubHeaderModalIsOpen, setAddSubHeaderModalIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isHoverdImage, setIsHoveredImage] = useState(false)
  const [headerItems, setHeaderItems] = useState(headerItemsFromAPI)
  const [headerItemToEdit, setHeaderItemToEdit] = useState<HeaderItem>(
    {} as HeaderItem,
  )
  const [subHeaderItemToEdit, setSubHeaderItemToEdit] = useState<SubHeaderItem>(
    {} as SubHeaderItem,
  )
  const [headerItemIdToAddIn, setHeaderItemToAddInId] = useState('')

  const openEditionModal = (id: string) => {
    const selectedHeader = headerItems.find((item) => item.id === id)
    if (!selectedHeader) return
    setHeaderItemToEdit(selectedHeader)
    setEditModalIsOpen(true)
  }

  const closeEditHeaderModal = () => {
    setEditModalIsOpen(false)
  }

  const openHeaderAddModal = () => {
    setAddModalIsOpen(true)
  }

  const closeAddHeaderModal = () => {
    setAddModalIsOpen(false)
  }
  const openSubHeaderAddModal = (id: string) => {
    setAddSubHeaderModalIsOpen(true)
    setHeaderItemToAddInId(id)
  }

  const closeSubHeaderAddModal = () => {
    setAddSubHeaderModalIsOpen(false)
  }
  const closeSubHeaderEditionModal = () => {
    setSubHeaderModalOpen(false)
  }

  const openSubHeaderEditionModal = (subHeaderItem: SubHeaderItem) => {
    setSubHeaderItemToEdit(subHeaderItem)
    setSubHeaderModalOpen(true)
  }

  const allCategoriesOptions = [
    ...allCategories
      .map((item) => ({
        value: item.id,
        label: item.name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  ]

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

  const getHighlightItemDefaultValue = (isHighlighted: boolean) => {
    if (isHighlighted)
      return {
        label: 'Sim',
        value: 'true',
      }

    return {
      label: 'Não',
      value: 'false',
    }
  }
  const getColumnPositionDefaultValue = (columnPosition: number) => {
    return {
      label: String(columnPosition + 1),
      value: String(columnPosition + 1),
    }
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
  const updateSubHeaderItem = useCallback(
    (newSubHeaderItem: SubHeaderItem, headerItemId: string) => {
      setHeaderItems(
        headerItems.map((headerItem) => {
          if (headerItem.id === headerItemId) {
            return {
              ...headerItem,
              headerSubItems: headerItem.headerSubItems.map((subHeaderItem) => {
                if (subHeaderItem.id === newSubHeaderItem.id) {
                  return newSubHeaderItem
                }

                return subHeaderItem
              }),
            }
          }
          return headerItem
        }),
      )
    },
    [headerItems],
  )

  const deleteSubHeaderItem = useCallback(
    (id: string, headerItemId: string) => {
      setHeaderItems(
        headerItems.map((headerItem) => {
          if (headerItem.id === headerItemId) {
            return {
              ...headerItem,
              headerSubItems: headerItem.headerSubItems.filter(
                (subHeaederItem) => subHeaederItem.id !== id,
              ),
            }
          }
          return headerItem
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

  const addHeaderItem = useCallback(
    (newHeaderItem: HeaderItem) => {
      setHeaderItems([newHeaderItem, ...headerItems])
    },
    [headerItems],
  )
  const addSubHeaderItem = useCallback(
    (newSubHeaderItem: SubHeaderItem, headerItemId: string) => {
      setHeaderItems(
        headerItems.map((headerItem) => {
          if (headerItem.id === headerItemId) {
            return {
              ...headerItem,
              headerSubItems: [...headerItem.headerSubItems, newSubHeaderItem],
            }
          }
          return headerItem
        }),
      )
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
        closeSubHeaderEditionModal,
        updateSelectedImage,
        updateHoveredImage,
        isHoverdImage,
        addHeaderItem,
        closeSubHeaderAddModal,
        addSubHeaderItem,
        openSubHeaderAddModal,
        allCategories,
        headerItems,
        addSubHeaderModalIsOpen,
        closeAddHeaderModal,
        getColumnPositionDefaultValue,
        subHeaderModalOpen,
        subHeaderItemToEdit,
        closeEditHeaderModal,
        getCategoryOption,
        headerItemIdToAddIn,
        openHeaderAddModal,
        openEditionModal,
        addModalIsOpen,
        editModalIsOpen,
        headerItemToEdit,
        allCategoriesOptions,
        updateSubHeaderItem,
        removeFeaturedImage,
        updateHeaderItem,
        deleteHeaderItem,
        deleteSubHeaderItem,
        getHighlightItemDefaultValue,
        selectedImage,
        openSubHeaderEditionModal,
      }}
    >
      {children}
    </EditHeaderFromAdminContext.Provider>
  )
}
