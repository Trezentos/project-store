import { useContext, useState } from 'react'
import Modal from 'react-modal'
import { Container } from './styles'

interface InstaModalProps {
  isSubmitting: boolean
  isOpen: boolean
  closeModal: () => void
  handleRemoveCard: () => void
}

export default function ConfirmModal({
  isOpen,
  closeModal,
  handleRemoveCard,
  isSubmitting,
}: InstaModalProps) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '15%',
      height: '15%',
      zIndex: '99999',
    },
  }
  Modal.setAppElement('#__next')

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Container>
        <h4>Você realmente deseja excluir este item?</h4>
        <div>
          <button disabled={isSubmitting} onClick={() => handleRemoveCard()}>
            Sim
          </button>
          <button disabled={isSubmitting} onClick={closeModal}>
            Não
          </button>
        </div>
      </Container>
    </Modal>
  )
}
