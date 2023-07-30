import InstaModal from './Modal'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { InstagramLogo } from 'phosphor-react'
import { useState } from 'react'
import { Container, ImageContainer, PhotosContainer } from './styles'

export interface InstagramMedia {
  imageSrc: string
  id: string
  description: string
  timestamp: string
}

export interface InstaShopProps {
  instagramPhotos: InstagramMedia[]
}

export default function InstaShop({ instagramPhotos }: InstaShopProps) {
  const [selectedMedia, setSelectedMedia] = useState(instagramPhotos[0])
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal(instagramMediaItem: InstagramMedia) {
    setSelectedMedia(instagramMediaItem)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <Container>
      <h1>Nosso Instagram!</h1>
      <PhotosContainer>
        {instagramPhotos.map((instaImage, index) => {
          return (
            <ImageContainer
              className="imagecontainer"
              key={instaImage.id}
              onClick={() => openModal(instaImage)}
            >
              <Image src={instaImage.imageSrc} alt="" fill />
              <InstagramLogo size={24} />
            </ImageContainer>
          )
        })}
      </PhotosContainer>
      <InstaModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        content={instagramPhotos}
        selectedImage={selectedMedia}
        changeImage={(item: InstagramMedia) => setSelectedMedia(item)}
      />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const fields = 'media_url, media_type, caption, timestamp'
    const url = `https://graph.instagram.com/me/media?access_token=${process.env.NEXT_INSTA_TOKEN}&fields=${fields}`

    const {
      data: { data },
    } = await axios.get(url)

    const instagramPhotos = data
      .map((item: any) => ({
        imageSrc: item.media_url,
        description: item.caption,
        id: item.id,
        timestamp: item.timestamp,
      }))
      .filter((item: any) => !String(item.imageSrc).includes('video'))

    return {
      props: {
        instagramPhotos,
      },
    }
  } catch (error: any) {
    console.log(error.message)

    return {
      props: {
        instagramPhotos: [],
      },
    }
  }
}
