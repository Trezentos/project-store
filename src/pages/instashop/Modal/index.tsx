import Image from 'next/image'
import { useCallback, useContext, useState } from 'react'
import Modal from 'react-modal'
import { Container, ModalContent, HeaderContainer, BodyContent } from './styles'
import { CaretLeft, CaretRight, X, InstagramLogo } from 'phosphor-react'
import { InstagramContext } from '@/contexts/pages/home/InstagramContext'
import dateFormatter from '@/utils/dateFormatter'
import { InstagramMedia } from '..'

interface InstaModalProps {
  isOpen: boolean
  content: InstagramMedia[]
  selectedImage: InstagramMedia
  closeModal: () => void
  changeImage: (item: InstagramMedia) => void
}

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

export default function InstaModal({
  isOpen,
  closeModal,
  content,
  selectedImage,
  changeImage,
}: InstaModalProps) {
  const [imageIndex, setImageIndex] = useState(0)
  const nextImage = useCallback(
    (id: string) => {
      const foundImageIndex = content.findIndex((item) => item.id === id)
      if (foundImageIndex === -1 || !content[foundImageIndex + 1]) return

      changeImage(content[foundImageIndex + 1])
    },
    [changeImage, content],
  )
  const previousImage = useCallback(
    (id: string) => {
      const foundImageIndex = content.findIndex((item) => item.id === id)
      if (foundImageIndex === -1 || !content[foundImageIndex - 1]) return

      changeImage(content[foundImageIndex - 1])
    },
    [changeImage, content],
  )

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Container>
        <Image src={selectedImage.imageSrc} alt="" fill />
        <ModalContent>
          <HeaderContainer>
            <div>
              <CaretLeft
                size={48}
                onClick={() => previousImage(selectedImage.id)}
              />
              <CaretRight
                size={48}
                onClick={() => nextImage(selectedImage.id)}
              />
            </div>
            <X size={48} onClick={closeModal} />
          </HeaderContainer>
          <BodyContent>
            <h3>{selectedImage.description}</h3>
            <h4>{dateFormatter(selectedImage.timestamp)}</h4>
            <InstagramLogo />
          </BodyContent>
        </ModalContent>
      </Container>
    </Modal>
  )
}
