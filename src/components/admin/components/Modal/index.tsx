import { ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'

interface InstaModalProps {
  isOpen: boolean
  closeModal: () => void
  children: ReactNode
  id?: string
}

export default function EditRowModal({
  isOpen,
  closeModal,
  children,
  id,
}: InstaModalProps) {
  const [top, setTop] = useState<string>('')
  const transitionTime = 300

  const customStyles = {
    content: {
      top,
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      // width: '20%',
      zIndex: '99999',
      transition: `${transitionTime}ms`,
      display: 'flex',
      alignItem: 'flex-start',
      justifyContent: 'center',
      gap: '1rem',
      overflow: 'visible',
    },
  }

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        setTop('400px')
      }, transitionTime)

      return () => {
        clearTimeout(timeoutId)
      }
    }
    setTop('-300px')
  }, [isOpen])

  return isOpen ? (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Editar Linha"
      id={id ?? ''}
    >
      {children}
    </Modal>
  ) : (
    <></>
  )
}
