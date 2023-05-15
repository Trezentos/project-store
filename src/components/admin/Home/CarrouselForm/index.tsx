// components/ImageForm.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'phosphor-react'
import React, { ReactNode, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodError } from 'zod'
import { Container } from './styles'
import EditForm from './EditForm'
import { ToastContainer } from 'react-toastify'
import CarrouselCard from './CarrouselCard'
import {
  CarrouselContext,
  CarrouselContextProvider,
} from '@/contexts/pages/admin/CarrouselEditionContext'

export interface CarrouselImage {
  id: string
  desktopLink: string
  mobileLink: string
  desktopKey: string
  mobileKey: string
}

interface ImageFormProps {
  carrouselItem: CarrouselImage
  index: number
}

export default function CarrouselForm({
  carrouselItem,
  index,
}: ImageFormProps) {
  const { desktopLink, desktopKey, id, mobileKey, mobileLink } = carrouselItem
  const { toggleEditMode, editMode } = useContext(CarrouselContext)

  return (
    <Container>
      <ToastContainer />
      <header>
        <p>Carrousel {index + 1}</p>
        <Pencil onClick={() => toggleEditMode()} size={20} />
      </header>
      {editMode ? (
        <EditForm carrouselItem={carrouselItem} />
      ) : (
        <CarrouselCard carrouselItem={carrouselItem} />
      )}
    </Container>
  )
}
