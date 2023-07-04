import Image from 'next/image'
import { useContext, useState } from 'react'
import Modal from 'react-modal'
import { InstagramPostProps } from '..'
import { Container, ModalContent, HeaderContainer, BodyContent } from './styles'
import { CaretLeft, CaretRight, X, InstagramLogo } from 'phosphor-react'
import { InstagramContext } from '@/contexts/pages/home/InstagramContext'
import dateFormatter from '@/utils/dateFormatter'
import Skeleton from 'react-loading-skeleton'

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
      height: '95%',
      zIndex: '99999',
      padding: '0px',
      border: '0px',
    },
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Container>
        {/* <Image src={selectedIntaMedia.imageSrc} alt="" fill /> */}
        <div>
          <Image src={selectedIntaMedia.imageSrc} alt="" fill />
        </div>
        <ModalContent>
          <HeaderContainer>
            <div>
              <CaretLeft size={48} onClick={goPreviousSelectedMediaInsta} />
              <CaretRight size={48} onClick={goNextSelectedMediaInsta} />
            </div>
            <X size={48} strokeWidth={1} onClick={closeModal} />
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
