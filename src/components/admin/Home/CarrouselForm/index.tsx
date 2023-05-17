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
import EditIcons from './components/EditIcons'

export interface CarrouselItem {
  id: string
  desktopLink: string
  mobileLink: string
  desktopKey: string
  mobileKey: string
}

interface ImageFormProps {
  carrouselItem: CarrouselItem
  index: number
}

export default function CarrouselForm({
  carrouselItem,
  index,
}: ImageFormProps) {
  const { desktopKey, mobileKey } = carrouselItem
  const { editMode, updateCarrouselCard } = useContext(CarrouselContext)
  const isNewCarrousel = !desktopKey && !mobileKey

  useEffect(() => {
    if (!isNewCarrousel) updateCarrouselCard(carrouselItem)
  }, [])

  return (
    <Container>
      <ToastContainer />
      <header>
        {!isNewCarrousel ? (
          <p>Carrousel {index + 1}</p>
        ) : (
          <p>Adicionar Carrousel</p>
        )}
        {!isNewCarrousel && <EditIcons />}
      </header>
      {isNewCarrousel ? <AddForm /> : <CarrouselCard editMode={editMode} />}
    </Container>
  )
}
