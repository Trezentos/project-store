import formatToCurrency from '@/components/admin/components/Inputs/Input/formattersFunctions'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

export interface ImageProduct {
  id: string
  imageSrc: string
  name: string
  originalName: string
}

export interface Product {
  id: string
  price: number
  formattedPrice?: string
  name: string
  productVariationId: string
  colorHex: string
  colorName: string
  description: string
  quantity: number
  images: ImageProduct[]
  categories: {
    name: string
    id: string
  }[]
  categoriesOptions?: { label: string; value: string }[]
}

interface ProductsAdminProviderProps {
  children: ReactNode
  productsFromAPI: Product[]
  categoriesOptionsFromAPI: { label: string; value: string }[]
}

interface ProductsAdminContextDatas {
  allProducts: Product[]
  selectedImage: string | null
  isHoveredImage: boolean
  updateSelectedImage: (imgSrc: string | null) => void
  updateHoveredImage: (isHovered: boolean) => void
  updateProductToEdit: (id: string) => void
  updateProduct: (updatedProduct: Product) => void
  getCategoriesOptions: (product: Product) => {
    label: string
    value: string
  }[]
  productToEdit: Product
  categoriesOptionsFromAPI: { label: string; value: string }[]
}

export const ProductsAdminContext = createContext<ProductsAdminContextDatas>(
  {} as ProductsAdminContextDatas,
)

export function ProductsAdminProvider({
  children,
  categoriesOptionsFromAPI,
  productsFromAPI,
}: ProductsAdminProviderProps) {
  const [allProducts, setAllProducts] = useState<Product[]>(productsFromAPI)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isHoveredImage, setIsHoveredImage] = useState(false)
  const [productToEdit, setProductToEdit] = useState({} as Product)

  const updateSelectedImage = useCallback((imgSrc: string | null) => {
    setSelectedImage(imgSrc)
  }, [])

  const updateHoveredImage = useCallback((isHovered: boolean) => {
    setIsHoveredImage(isHovered)
  }, [])

  const updateProductToEdit = useCallback(
    (id: string) => {
      const product = allProducts.find((item) => item.id === id)

      if (!product) {
        setProductToEdit({} as Product)
        return
      }

      const categoriesOptions = product.categories.map((item) => ({
        label: item.name,
        value: item.id,
      }))

      console.log(categoriesOptions)

      setProductToEdit({
        ...product,
        categoriesOptions,
        formattedPrice: formatToCurrency(product.price),
      })
    },
    [allProducts],
  )

  const updateProduct = useCallback(
    (updatedProduct: Product) => {
      setAllProducts(
        allProducts.map((product) => {
          if (updatedProduct.id === product.id) {
            return updatedProduct
          }

          return product
        }),
      )
    },
    [allProducts],
  )

  const getCategoriesOptions = (product: Product) => {
    return product.categories.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  }

  useEffect(() => {
    console.log(categoriesOptionsFromAPI)
  }, [categoriesOptionsFromAPI])

  return (
    <ProductsAdminContext.Provider
      value={{
        allProducts,
        selectedImage,
        updateProductToEdit,
        getCategoriesOptions,
        isHoveredImage,
        updateHoveredImage,
        updateSelectedImage,
        updateProduct,
        productToEdit,
        categoriesOptionsFromAPI,
      }}
    >
      {children}
    </ProductsAdminContext.Provider>
  )
}
