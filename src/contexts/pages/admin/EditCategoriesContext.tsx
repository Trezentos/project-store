import { createContext, ReactNode, useCallback, useState } from 'react'

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
  thereIsProductCategories: boolean
  allCategories: ProductCategory[]
  deleteSingleCategory: (id: string) => void
  addNewCategorie: (newCategory: ProductCategory) => void
  updateSingleCategorie: (updatedCategory: ProductCategory) => void
  selectedImage: string | null
  updateAllCategories: (categories: ProductCategory[]) => void
  isHoverdImage: boolean
  updateSelectedImage: (imgSrc: string) => void
  updateHoveredImage: (isHovered: boolean) => void
  editModalIsOpen: boolean
  addModalIsOpen: boolean
  categoryToEdit: ProductCategory
  closeEditModal: () => void
  closeAddModal: () => void
  openEditionModal: (id: string) => void
  openAddModal: () => void
}

export const EditCategoriesContext = createContext<EditCategoriesContextDatas>(
  {} as EditCategoriesContextDatas,
)

export function EditCategoriesProvider({
  children,
}: EditCategoriesProviderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isHoverdImage, setIsHoveredImage] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<ProductCategory>(
    {} as ProductCategory,
  )
  const [allCategories, setAllCategories] = useState<ProductCategory[]>(
    [] as ProductCategory[],
  )

  const deleteSingleCategory = useCallback(
    (id: string) => {
      setAllCategories(
        allCategories
          .filter((row) => row.id !== id)
          .sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1)),
      )
    },
    [allCategories],
  )

  const updateAllCategories = useCallback(
    (categories: ProductCategory[]) => {
      setAllCategories(categories)
    },
    [setAllCategories],
  )

  const updateSingleCategorie = useCallback(
    (updatedCategory: ProductCategory) => {
      setAllCategories(
        allCategories.map((item) => {
          if (item.id === updatedCategory.id) return updatedCategory
          return item
        }),
      )
    },
    [allCategories],
  )

  const addNewCategorie = useCallback((newCategory: ProductCategory) => {
    setAllCategories((prev) =>
      [...prev, newCategory].sort((a, b) =>
        a.active === b.active ? 0 : a.active ? -1 : 1,
      ),
    )
  }, [])

  const updateSelectedImage = useCallback((imgSrc: string) => {
    setSelectedImage(imgSrc)
  }, [])

  const updateHoveredImage = useCallback((isHovered: boolean) => {
    setIsHoveredImage(isHovered)
  }, [])

  const closeEditModal = () => {
    setEditModalIsOpen(false)
  }
  const closeAddModal = () => {
    setAddModalIsOpen(false)
  }
  const openEditionModal = (id: string) => {
    const selectedCategory = allCategories.find((item) => item.id === id)
    if (!selectedCategory) return
    setCategoryToEdit(selectedCategory)
    setEditModalIsOpen(true)
  }
  const openAddModal = () => {
    setAddModalIsOpen(true)
  }

  const thereIsProductCategories = !!allCategories?.[0]

  return (
    <EditCategoriesContext.Provider
      value={{
        selectedImage,
        updateSelectedImage,
        categoryToEdit,
        updateSingleCategorie,
        updateHoveredImage,
        isHoverdImage,
        closeEditModal,
        openEditionModal,
        addNewCategorie,
        editModalIsOpen,
        openAddModal,
        updateAllCategories,
        addModalIsOpen,
        deleteSingleCategory,
        allCategories,
        thereIsProductCategories,
        closeAddModal,
      }}
    >
      {children}
    </EditCategoriesContext.Provider>
  )
}
