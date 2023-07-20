import { createContext, ReactNode, useCallback, useState } from 'react'
export interface ProductFilter {
  id: string
  name: string
  hifen: string
}

export interface ProductCategory {
  id: string
  imageBackgroundName: string
  imageBackgroundOriginalName: string
  imageBackgroundLink: string
  name: string
  hifen: string
  active: boolean
  filters: ProductFilter[]
}
interface EditCategoriesProviderProps {
  children: ReactNode
  value: {
    filters: ProductFilter[]
    productCategories: ProductCategory[]
  }
}

interface EditCategoriesContextDatas {
  thereIsProductCategories: boolean
  allCategories: ProductCategory[]
  options: {
    value: string
    label: string
  }[]
  filters: ProductFilter[]
  deleteCategory: (id: string) => void
  addNewCategorie: (newCategory: ProductCategory) => void
  updateCategory: (updatedCategory: ProductCategory) => void
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
  value: { productCategories, filters },
}: EditCategoriesProviderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isHoverdImage, setIsHoveredImage] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<ProductCategory>(
    {} as ProductCategory,
  )
  const [allCategories, setAllCategories] =
    useState<ProductCategory[]>(productCategories)

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

  const options = filters.map((filter) => ({
    value: filter.id,
    label: filter.name,
  }))

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
        isHoverdImage,
        categoryToEdit,
        filters,
        updateCategory: updateSingleCategorie,
        updateHoveredImage,
        closeEditModal,
        openEditionModal,
        addNewCategorie,
        editModalIsOpen,
        openAddModal,
        updateAllCategories,
        addModalIsOpen,
        deleteCategory: deleteSingleCategory,
        allCategories,
        thereIsProductCategories,
        closeAddModal,
        options,
      }}
    >
      {children}
    </EditCategoriesContext.Provider>
  )
}
