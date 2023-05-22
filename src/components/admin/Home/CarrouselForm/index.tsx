// components/ImageForm.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodError } from 'zod'
import { Container } from './styles'
import EditForm from './CarrouselContainer/EditForm'
import { ToastContainer } from 'react-toastify'
import CarrouselCard from './CarrouselContainer'
import { CarrouselContext } from '@/contexts/pages/admin/CarrouselEditionContext'
import AddForm from './AddForm'
import OptionsCardHeader from './components/OptionsCardHeader'

export interface CarrouselItem {
  id: string
  desktopLink: string
  mobileLink: string
  desktopKey: string
  mobileKey: string
  active: boolean
}

interface ImageFormProps {
  carrouselItem: CarrouselItem
  index: number
}

export default function CarrouselForm({
  carrouselItem,
  index,
}: ImageFormProps) {
  const { editMode, updateCarrouselCard, isNewCarrousel, carrouselCard } =
    useContext(CarrouselContext)

  const { active } = carrouselCard

  useEffect(() => {
    if (!isNewCarrousel) updateCarrouselCard(carrouselItem)
  }, [])

  return (
    <Container
      id={`carrousel-id-${carrouselCard.id}`}
      className={!active ? 'hide' : ''}
    >
      <ToastContainer />
      <header>
        {!isNewCarrousel ? (
          <p>Carrousel {index + 1}</p>
        ) : (
          <p>Adicionar Carrousel</p>
        )}
        {!isNewCarrousel && <OptionsCardHeader />}
      </header>
      {isNewCarrousel ? <AddForm /> : <CarrouselCard editMode={editMode} />}
    </Container>
  )
}
