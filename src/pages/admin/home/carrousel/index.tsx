import { FormEvent, ReactNode, useCallback, useState } from 'react'
import { Container } from './styles'
import type { GetStaticProps, NextPage } from 'next'
import CarrouselForm, {
  CarrouselImage,
} from '../../../../components/admin/Home/CarrouselForm'
import { api } from '@/lib/axios'
import { CarrouselContextProvider } from '@/contexts/pages/admin/CarrouselEditionContext'

interface CarrouselProps {
  carrouselImages: CarrouselImage[]
}

export default function Carrousel({ carrouselImages }: CarrouselProps) {
  const [forms, setForms] = useState<number[]>([0])

  const addForm = () => {
    setForms((prevForms) => [...prevForms, prevForms.length])
  }

  return (
    <Container>
      <div>
        {carrouselImages.map((carrouselItem, index) => (
          <CarrouselContextProvider key={carrouselItem.id}>
            <CarrouselForm carrouselItem={carrouselItem} index={index} />
          </CarrouselContextProvider>
        ))}

        {forms.length < 6 && (
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
