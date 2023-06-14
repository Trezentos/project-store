import { useContext, useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'
import { StyledEditRowModal } from './styles'
import EditForm from './RowAddForm'

interface InstaModalProps {
  isOpen: boolean
  closeModal: () => void
}
Modal.setAppElement('#__next')

export default function AddRowModal({ isOpen, closeModal }: InstaModalProps) {
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
      width: '20%',
      zIndex: '99999',
      transition: `${transitionTime}ms`,
      display: 'flex',
      alignItem: 'flex-start',
      justifyContent: 'center',
      gap: '1rem',
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Editar Linha"
      id={'add-categories-modal'}
    >
      <EditForm />
    </Modal>
  )
}
