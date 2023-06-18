import { createContext, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProductCategory } from './EditCategoriesContext'

export interface HeaderItem {
  id: string
  name: string
  linkTo: string
  linkName: string
  backgroundImageLink: string
  backgroundImageName: string
}

export interface HeaderSubItem {
  id: string
  name: string
  linkTo: string
  categoryName: string
  backgroundImageLink: string
  backgroundImageName: string
}

interface EditHeaderFromAdminProviderProps {
  children: ReactNode
  value: {
    allCategories: ProductCategory[]
    headerItems: HeaderItem[]
  }
}

interface EditHeaderFromAdminContextData {
  allCategories: ProductCategory[]
  headerItems: HeaderItem[]
}

export const EditHeaderFromAdminContext =
  createContext<EditHeaderFromAdminContextData>(
    {} as EditHeaderFromAdminContextData,
  )

export function EditHeaderFromAdminProvider({
  children,
  value: { allCategories, headerItems },
}: EditHeaderFromAdminProviderProps) {
  const [user, setUser] = useState()
  const router = useRouter()

  console.log(allCategories, headerItems)

  return (
    <EditHeaderFromAdminContext.Provider value={{ allCategories, headerItems }}>
      {children}
    </EditHeaderFromAdminContext.Provider>
  )
}
