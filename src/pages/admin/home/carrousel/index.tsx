import { FormEvent, ReactNode, useCallback, useEffect, useState } from 'react'
import { Container } from './styles'
import type { GetStaticProps, NextPage } from 'next'
import CarrouselForm, {
  CarrouselItem,
} from '../../../../components/admin/Home/CarrouselForm'
import { api } from '@/lib/axios'
import { CarrouselContextProvider } from '@/contexts/pages/admin/CarrouselEditionContext'

interface CarrouselProps {
  carrouselImages: CarrouselItem[]
}

export default function Carrousel({ carrouselImages }: CarrouselProps) {
  const [carrousels, setCarrousels] = useState<CarrouselItem[]>(carrouselImages)

  const addForm = () => {
    setCarrousels([
      ...carrousels,
      { id: String(Math.floor(Math.random() * 1000)) } as CarrouselItem,
    ])
  }

  return (
    <Container>
      <div>
        {carrousels.map((carrouselItem, index) => (
          <CarrouselContextProvider key={carrouselItem.id}>
            <CarrouselForm carrouselItem={carrouselItem} index={index} />
          </CarrouselContextProvider>
        ))}

        {carrousels.length < 6 && (
          <button onClick={addForm}>Adicionar Carrousel</button>
        )}
      </div>
    </Container>
  )
}

Carrousel.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await api.get('/home/get-carrousel')

  const carrouselImages = data.map((item: any) => ({
    id: item.id,
    desktopLink: item.desktopLink,
    mobileLink: item.mobileLink,
    desktopKey: item.desktopKey,
    mobileKey: item.mobileKey,
  }))

  return {
    props: {
      carrouselImages,
    },
  }
}
