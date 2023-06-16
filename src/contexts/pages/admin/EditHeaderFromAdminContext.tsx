import { createContext, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProductCategory } from './EditCategoriesContext'

interface EditHeaderFromAdminProviderProps {
  children: ReactNode
  value: {
    allCategories: ProductCategory[]
  }
}

interface EditHeaderFromAdminContextData {
  allCategories: ProductCategory[]
}

export const EditHeaderFromAdminContext =
  createContext<EditHeaderFromAdminContextData>(
    {} as EditHeaderFromAdminContextData,
  )

export function EditHeaderFromAdminProvider({
  children,
  value: { allCategories },
}: EditHeaderFromAdminProviderProps) {
  const [user, setUser] = useState()
  const router = useRouter()

  return (
    <EditHeaderFromAdminContext.Provider value={{ allCategories }}>
      {children}
    </EditHeaderFromAdminContext.Provider>
  )
}
