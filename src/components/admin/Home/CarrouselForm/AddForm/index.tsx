import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import InputFile from '../../../InputsComponents/InputFile'
import { api } from '@/lib/api'
import { AddFormContainer, ErrorMessage } from './styles'
import { CarrouselContext } from '@/contexts/pages/admin/Home/CarrouselEditionContext'
import { errorToast, successToast } from '@/utils/toast/sucessToast'

const MAX_FILE_SIZE = 5200000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const schema = z.object({
  addDesktopImage: z
    .any()
    .refine((files) => {
      return files?.length === 1
    }, 'Selecione uma imagem.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `A imagem não pode passar de 5 mb.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  addMobileImage: z
    .any()
    .refine((files) => files?.length === 1, 'Selecione uma imagem.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `A imagem não pode passar de 5 mb.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
})

interface FormValues {
  addMobileImage: FileList
  addDesktopImage: FileList
}

export default function AddForm() {
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [desktopFile, setDesktopFile] = useState<FileList | null>(null)
  const [mobileFile, setMobileFile] = useState<FileList | null>(null)

  // FAZER DOIS ESTADOS

  const { toggleEditMode, updateCarrouselCard, carrouselCard } =
    useContext(CarrouselContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    const addFormContainer = document.querySelector(
      '#carrousel-id-temp-id-card',
    )
    const addFormButton =
      document.querySelector<HTMLButtonElement>('#add-form-button')

    if (!addFormButton) return

    addFormContainer
      ? (addFormButton.style.display = 'none')
      : (addFormButton.style.display = 'block')
  }, [carrouselCard.id])

  const onSubmit = async (data: FormValues) => {
    try {
      const { addDesktopImage, addMobileImage } = data
      setIsSubmiting(true)

      const formData = new FormData()
      formData.append('desktopImage', addDesktopImage[0])
      formData.append('mobileImage', addMobileImage[0])

      const { data: dataResponse } = await api.post(
        '/home/insert-carrousel-item',
        formData,
      )

      successToast('Carrossel adicionado com sucesso!')
      updateCarrouselCard(dataResponse)
    } catch (error: any) {
      const { data } = error.response
      if (!data) errorToast('Houve algum erro ao alterar o carrossel...')
      errorToast(data)
    } finally {
      setIsSubmiting(false)
    }
  }

  useEffect(() => {
    const labelDesktop = document.querySelector<Element>(
      '.add-form .labelDesktopImage',
    )
    const labelMobile = document.querySelector<Element>(
      '.add-form .labelMobileImage',
    )

    desktopFile?.[0]?.name
      ? labelDesktop?.classList.add('file-selected')
      : labelDesktop?.classList.remove('file-selected')

    mobileFile?.[0]?.name
      ? labelMobile?.classList.add('file-selected')
      : labelMobile?.classList.remove('file-selected')
  }, [desktopFile, mobileFile])

  return (
    <AddFormContainer onSubmit={handleSubmit(onSubmit)} className="add-form">
      <InputFile
        id={'addDesktopImage'}
        className={'labelDesktopImage'}
        title={'Imagem para desktop:'}
        disabled={isSubmiting}
        file={desktopFile}
        register={register('addDesktopImage')}
        onChange={(e) => setDesktopFile(e.target?.files)}
      />
      <ErrorMessage>
        {errors.addDesktopImage && <p>{errors.addDesktopImage.message}</p>}
      </ErrorMessage>

      <InputFile
        id={'addMobileImage'}
        className={'labelMobileImage'}
        title={'Imagem para Mobile:'}
        disabled={isSubmiting}
        file={mobileFile}
        register={register('addMobileImage')}
        onChange={(e) => setMobileFile(e.target?.files)}
      />

      <ErrorMessage>
        {errors.addMobileImage && <p>{errors.addMobileImage.message}</p>}
      </ErrorMessage>

      <button disabled={isSubmiting} type="submit">
        {isSubmiting ? (
          <div className="loader active"></div>
        ) : (
          'Enviar imagens selecionadas'
        )}
      </button>
    </AddFormContainer>
  )
}
