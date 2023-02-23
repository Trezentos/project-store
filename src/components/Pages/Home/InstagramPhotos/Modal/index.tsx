import Image from 'next/image'
import { useContext, useState } from 'react'
import Modal from 'react-modal'
import { InstagramPostProps } from '..'
import { Container, ModalContent, HeaderContainer, BodyContent } from './styles'
import { CaretLeft, CaretRight, X, InstagramLogo } from 'phosphor-react'
import { InstagramContext } from '@/context/instagramContext'
import dateFormatter from '@/utils/dateFormatter'

interface InstaModalProps {
  isOpen: boolean
  closeModal: () => void
}

export default function InstaModal({ isOpen, closeModal }: InstaModalProps) {
  const {
    selectedIntaMedia,
    goNextSelectedMediaInsta,
    goPreviousSelectedMediaInsta,
  } = useContext(InstagramContext)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: '80%',
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
        <Image src={selectedIntaMedia.imageSrc} alt="" fill />
        <ModalContent>
          <HeaderContainer>
            <div>
              <CaretLeft size={48} onClick={goPreviousSelectedMediaInsta} />
              <CaretRight size={48} onClick={goNextSelectedMediaInsta} />
            </div>
            <X size={48} onClick={closeModal} />
          </HeaderContainer>
          <BodyContent>
            <h3>{selectedIntaMedia.description}</h3>
            <h4>{dateFormatter(selectedIntaMedia.timestamp)}</h4>
            <InstagramLogo />
          </BodyContent>
        </ModalContent>
      </Container>
    </Modal>
  )
}
