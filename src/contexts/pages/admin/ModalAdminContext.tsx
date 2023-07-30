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
  closeAddModal: () => void
  openAddModal: () => void
  closeSubEditModal: () => void
  openSubEditModal: () => void
  subEditModalIsOpen: boolean
  closeSubAddModal: () => void
  openSubAddModal: () => void
  subAddModalIsOpen: boolean
  warningModalIsOpen: boolean
  openWarningModal: (action: () => void) => void
  closeWarningModal: () => void
  warningAction: (() => void) | undefined
}

export const ModalAdminContext = createContext<ModalContextDatas>(
  {} as ModalContextDatas,
)

export function ModalAdminProvider({
  children,
  value: any,
}: ModalAdminProviderProps) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [subEditModalIsOpen, setSubEditModalIsOpen] = useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [subAddModalIsOpen, setSubAddModalIsOpen] = useState(false)
  const [warningModalIsOpen, setWarningModalIsOpen] = useState(false)
  const [warningAction, setWarningAction] =
    useState<() => Promise<void> | (() => void)>()

  const closeEditModal = useCallback(() => {
    setEditModalIsOpen(false)
  }, [])

  const openEditModal = useCallback(() => {
    setEditModalIsOpen(true)
  }, [])

  const closeSubEditModal = useCallback(() => {
    setSubEditModalIsOpen(false)
  }, [])

  const openSubEditModal = useCallback(() => {
    setSubEditModalIsOpen(true)
  }, [])
  const closeAddModal = useCallback(() => {
    setAddModalIsOpen(false)
  }, [])

  const openAddModal = useCallback(() => {
    setAddModalIsOpen(true)
  }, [])

  const closeSubAddModal = useCallback(() => {
    setSubAddModalIsOpen(false)
  }, [])

  const openSubAddModal = useCallback(() => {
    setSubAddModalIsOpen(true)
  }, [])

  const closeWarningModal = useCallback(() => {
    setWarningModalIsOpen(false)
  }, [])

  const openWarningModal = useCallback((action: () => void) => {
    setWarningModalIsOpen(true)
    setWarningAction(() => action)
  }, [])

  return (
    <ModalAdminContext.Provider
      value={{
        addModalIsOpen,
        editModalIsOpen,
        closeEditModal,
        subAddModalIsOpen,
        openEditModal,
        closeAddModal,
        openAddModal,
        openSubEditModal,
        closeSubAddModal,
        subEditModalIsOpen,
        openSubAddModal,
        closeSubEditModal,
        closeWarningModal,
        openWarningModal,
        warningModalIsOpen,
        warningAction,
      }}
    >
      {children}
    </ModalAdminContext.Provider>
  )
}
