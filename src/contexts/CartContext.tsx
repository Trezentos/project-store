import { StaticImageData } from 'next/image'
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react'

export interface IProductItem {
  id: string
  productColorId: string
  name: string
  description: string
  price: number
  colorName: string
  sizes: string[]
  imagesSrc: { id: string; src: string }[]
  createdAt: string
  selectedSize: string | undefined
  quantity?: number
}

interface CartContextType {
  products: IProductItem[]
  open: boolean
  openCart: () => void
  closeCart: () => void
  addProductToCart: (product: IProductItem) => void
  increaseAmountByOne: (product: IProductItem) => void
  decreaseAmountByOne: (product: IProductItem) => void
  removeProduct: (product: IProductItem) => void
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [products, setProducts] = useState<IProductItem[]>([])
  const [open, setOpen] = useState(false)

  const addProductToCart = useCallback(
    (product: IProductItem) => {
      setOpen(true)

      const foundProductIndex = products.findIndex(
        (item) =>
          item.productColorId === product.productColorId &&
          item.selectedSize === product.selectedSize,
      )

      if (foundProductIndex === -1) {
        setProducts((prev) => [...prev, { ...product, quantity: 1 }])
        return
      }

      // Add to cart items differentiating by size
      if (product.selectedSize) {
        const sameSize = products.some(
          (item) =>
            item.selectedSize === product.selectedSize &&
            item.productColorId === product.productColorId,
        )

        if (!sameSize) {
          setProducts((prev) => [...prev, { ...product, quantity: 1 }])

          return
        }
      }

      setProducts(
        products.map((product, index) => {
          if (index === foundProductIndex) {
            return {
              ...product,
              quantity: Number(product.quantity) + 1,
            }
          }
          return product
        }),
      )
    },
    [products],
  )

  const increaseAmountByOne = useCallback(
    (product: IProductItem) => {
      if (product.selectedSize) {
        setProducts(
          products.map((item) => {
            if (
              item.selectedSize === product.selectedSize &&
              item.productColorId === product.productColorId
            ) {
              return {
                ...item,
                quantity: Number(item.quantity) + 1,
              }
            }
            return item
          }),
        )
        return
      }

      const productIndex = products.findIndex(
        (item) => item.productColorId === product.productColorId,
      )

      setProducts(
        products.map((product, index) => {
          if (index === productIndex) {
            return {
              ...product,
              quantity: Number(product.quantity) + 1,
            }
          }
          return product
        }),
      )
    },
    [products],
  )

  const decreaseAmountByOne = useCallback(
    (product: IProductItem) => {
      if (product.selectedSize) {
        if (product.quantity === 1) {
          setProducts(
            products.filter((item) => {
              if (item.productColorId === product.productColorId) {
                return item.selectedSize !== product.selectedSize
              }

              return true
            }),
          )
          return
        }

        setProducts(
          products.map((item) => {
            if (
              item.selectedSize === product.selectedSize &&
              item.productColorId === product.productColorId
            ) {
              return {
                ...item,
                quantity: Number(item.quantity) - 1,
              }
            }
            return item
          }),
        )
        return
      }

      const productIndex = products.findIndex(
        (item) => item.productColorId === product.productColorId,
      )

      if (productIndex === -1) return

      const productToExclude = products[productIndex]

      if (productToExclude.quantity === 1) {
        setProducts(
          products.filter(
            (item) => item.productColorId !== product.productColorId,
          ),
        )
        return
      }

      setProducts(
        products.map((product, index) => {
          if (index === productIndex) {
            return {
              ...product,
              quantity: Number(product.quantity) - 1,
            }
          }
          return product
        }),
      )
    },
    [products],
  )

  const removeProduct = useCallback(
    (product: IProductItem) => {
      console.log(product)

      if (product.selectedSize) {
        setProducts(
          products.filter((item) => {
            if (item.productColorId === product.productColorId) {
              return item.selectedSize !== product.selectedSize
            }

            return true
          }),
        )

        return
      }

      setProducts(
        products.filter(
          (item) => item.productColorId !== product.productColorId,
        ),
      )
    },
    [products],
  )

  const openCart = useCallback(() => {
    setOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <CartContext.Provider
      value={{
        openCart,
        closeCart,
        open,
        addProductToCart,
        products,
        increaseAmountByOne,
        decreaseAmountByOne,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
