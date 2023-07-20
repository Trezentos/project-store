import { createContext, ReactNode, useCallback, useState } from 'react'

export interface ModalAdminProps {}
interface ModalAdminProviderProps {
  children: ReactNode
  value?: any
}

interface ModalContextDatas {
  editModalIsOpen: boolean
  addModalIsOpen: boolean
  closeEditModal: () => void
  openEditModal: () => void
}

export const ModalAdminContext = createContext<ModalContextDatas>(
  {} as ModalContextDatas,
)

export function ModalAdminProvider({
  children,
  value: any,
}: ModalAdminProviderProps) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)

  const closeEditModal = useCallback(() => {
    setEditModalIsOpen(false)
  }, [])

  const openEditModal = useCallback(() => {
    setEditModalIsOpen(true)
  }, [])

  return (
    <ModalAdminContext.Provider
      value={{ addModalIsOpen, editModalIsOpen, closeEditModal, openEditModal }}
    >
      {children}
    </ModalAdminContext.Provider>
  )
}
