import { StaticImageData } from 'next/image'
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react'

interface IProductItem {
  id: string
  details: string
  color: string
  size: string
  price: number
}

export interface ICartContent {
  products: IProductItem[]
}
interface CartContextType {}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [products, setProducts] = useState<IProductItem[]>([])

  const addProductToCart = useCallback((product: IProductItem) => {
    setProducts((prev) => [...prev, product])
  }, [])

  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>
}
