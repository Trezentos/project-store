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
  name: string
}
export interface ProductVariation {
  id: string
  productId: string
  price: number
  formattedPrice?: string
  colorHex: string
  colorName: string
  description: string
  quantity: number
  images: ImageProduct[]
  categoriesOptions: { label: string; value: string }[]
}

interface ProductsAdminProviderProps {
  children: ReactNode
  productsFromAPI: {
    allProducts: Product[]
    allProductsVariations: ProductVariation[]
  }
  categoriesOptionsFromAPI: { label: string; value: string }[]
}

interface ProductsAdminContextDatas {
  allProducts: Product[]
  selectedImage: string | null
  isHoveredImage: boolean
  addProductVariation: (newProductVariation: ProductVariation) => void
  updateSelectedImage: (imgSrc: string | null) => void
  updateHoveredImage: (isHovered: boolean) => void
  updateProduct: (updatedProduct: Product) => void
  updateProductToEdit: (id: string) => void
  updateProductVariation: (updatedProduct: ProductVariation) => void
  deleteProductVariation: (id: string) => void
  updateProductVariationToEdit: (id: string) => void
  deleteImageFromProductVariation: (imageId: string, productId: string) => void
  getProductsVariations: (productId: string) => ProductVariation[]
  productToEdit: Product
  categoriesOptionsFromAPI: { label: string; value: string }[]
  productVariationToEdit: ProductVariation
  updateProductIdToAdd: (id: string) => void
  productIdToAdd: string
  allProductsVariations: ProductVariation[]
  addProductMain: (newProduct: Product) => void
  deleteProductMain: (id: string) => void
  updateAllMainProducts: (products: Product[]) => void
}

export const ProductsAdminContext = createContext<ProductsAdminContextDatas>(
  {} as ProductsAdminContextDatas,
)

export function ProductsAdminProvider({
  children,
  categoriesOptionsFromAPI,
  productsFromAPI: {
    allProducts: productsFromAPI,
    allProductsVariations: allProductsVariationsFromAPI,
  },
}: ProductsAdminProviderProps) {
  const [allProducts, setAllProducts] = useState<Product[]>(productsFromAPI)
  const [allProductsVariations, setAllProductsVariations] = useState<
    ProductVariation[]
  >(allProductsVariationsFromAPI)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isHoveredImage, setIsHoveredImage] = useState(false)
  const [productToEdit, setProductToEdit] = useState({} as Product)
  const [productVariationToEdit, setProductVariationToEdit] = useState(
    {} as ProductVariation,
  )
  const [productIdToAdd, setProductIdToAdd] = useState('')

  const updateAllMainProducts = useCallback((products: Product[]) => {
    setAllProducts(products)
  }, [])

  const addProductVariation = useCallback(
    (newProductVariation: ProductVariation) => {
      setAllProductsVariations([newProductVariation, ...allProductsVariations])
    },
    [allProductsVariations],
  )
  const addProductMain = useCallback(
    (newProduct: Product) => {
      setAllProducts([newProduct, ...allProducts])
    },
    [allProducts],
  )

  const updateProductToEdit = useCallback(
    (id: string) => {
      const product = allProducts.find((item) => item.id === id)

      if (!product) {
        setProductToEdit({} as Product)
        return
      }

      setProductToEdit(product)
    },
    [allProducts],
  )
  const updateProductVariationToEdit = useCallback(
    (id: string) => {
      const product = allProductsVariations.find((item) => item.id === id)

      if (!product) {
        setProductVariationToEdit({} as ProductVariation)
        return
      }

      setProductVariationToEdit(product)
    },
    [allProductsVariations],
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

  const updateProductVariation = useCallback(
    (updatedProduct: ProductVariation) => {
      setAllProductsVariations(
        allProductsVariations.map((product) => {
          if (updatedProduct.id === product.id) {
            return updatedProduct
          }

          return product
        }),
      )
    },
    [allProductsVariations],
  )
  const deleteProductVariation = useCallback(
    (id: string) => {
      setAllProductsVariations(
        allProductsVariations.filter(
          (productVariation) => productVariation.id !== id,
        ),
      )
    },
    [allProductsVariations],
  )
  const deleteProductMain = useCallback(
    (id: string) => {
      setAllProducts(allProducts.filter((product) => product.id !== id))
      setAllProductsVariations(
        allProductsVariations.filter(
          (productVariation) => productVariation.productId !== id,
        ),
      )
    },
    [allProducts, allProductsVariations],
  )

  const deleteImageFromProductVariation = useCallback(
    (imageId: string, productVariationId: string) => {
      setAllProductsVariations(
        allProductsVariations.map((productVariation) => {
          if (productVariation.id === productVariationId) {
            return {
              ...productVariation,
              images: productVariation.images.filter(
                (image) => image.id !== imageId,
              ),
            }
          }

          return productVariation
        }),
      )
    },
    [allProductsVariations],
  )

  const getProductsVariations = useCallback(
    (productId: string) => {
      const productsVariations = allProductsVariations.filter(
        (item) => item.productId === productId,
      )

      return productsVariations
    },
    [allProductsVariations],
  )

  // Function that updates a state string which informs what main product
  // the product variation will be added
  const updateProductIdToAdd = useCallback((id: string) => {
    setProductIdToAdd(id)
  }, [])

  const updateSelectedImage = useCallback((imgSrc: string | null) => {
    setSelectedImage(imgSrc)
  }, [])

  const updateHoveredImage = useCallback((isHovered: boolean) => {
    setIsHoveredImage(isHovered)
  }, [])

  return (
    <ProductsAdminContext.Provider
      value={{
        deleteImageFromProductVariation,
        updateProductVariationToEdit,
        categoriesOptionsFromAPI,
        allProducts,
        selectedImage,
        updateAllMainProducts,
        updateProductToEdit,
        addProductMain,
        isHoveredImage,
        deleteProductMain,
        updateHoveredImage,
        updateSelectedImage,
        updateProduct,
        productToEdit,
        getProductsVariations,
        deleteProductVariation,
        updateProductVariation,
        productVariationToEdit,
        updateProductIdToAdd,
        productIdToAdd,
        addProductVariation,
        allProductsVariations,
      }}
    >
      {children}
    </ProductsAdminContext.Provider>
  )
}
