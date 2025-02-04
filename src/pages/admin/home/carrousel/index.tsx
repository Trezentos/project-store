import { FormEvent, ReactNode, useCallback, useEffect, useState } from 'react'
import { Container } from './styles'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import CarrouselForm, {
  CarrouselItem,
} from '../../../../components/admin/Home/CarrouselForm'
import { api } from '@/lib/api'
import { CarrouselContextProvider } from '@/contexts/pages/admin/Home/CarrouselEditionContext'
import { parseCookies } from 'nookies'
import { generateKey } from 'node:crypto'
import generateRandomString from '@/utils/generateHash'

// Estrita tipagem para a resposta da API
interface CarrouselAPIResponse {
  id: string
  desktopLink: string
  mobileLink: string
  desktopImageName: string
  mobileImageName: string
  desktopKey: string
  mobileKey: string
  active: boolean
}

interface CarrouselProps {
  carrouselImages: CarrouselItem[]
}

export default function Carrousel({ carrouselImages }: CarrouselProps) {
  const [carrousels, setCarrousels] = useState<CarrouselItem[]>(carrouselImages)
  const [isAdding, setIsAdding] = useState(true)

  // Ação para adicionar um novo Carrousel ao estado
  const addForm = useCallback(() => {
    setCarrousels((prevCarrousels) => [
      ...prevCarrousels,
      {
        id: 'temp-id-card',
        active: true,
      } as CarrouselItem,
    ])
  }, [])

  return (
    <Container>
      <div id="all-cards">
        {carrousels.map((carrouselItem, index) => (
          <CarrouselContextProvider key={carrouselItem.id}>
            <CarrouselForm carrouselItem={carrouselItem} index={index} />
          </CarrouselContextProvider>
        ))}

        {carrousels.length < 6 && (
          <button onClick={addForm} id="add-form-button">
            Adicionar Carrousel
          </button>
        )}
      </div>
    </Container>
  )
}

Carrousel.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'nextauth-admin-token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  const { data } = await api.get<CarrouselAPIResponse[]>('/home/get-carrousel')

  // Map the server data to the local data structure
  const carrouselImages = data.map((item) => ({
    id: item.id,
    desktopImageName: item.desktopImageName,
    desktopLink: item.desktopLink,
    mobileLink: item.mobileLink,
    desktopKey: item.desktopKey,
    mobileImageName: item.mobileImageName,
    mobileKey: item.mobileKey,
    active: item.active,
  }))

  return {
    props: {
      carrouselImages,
    },
  }
}
