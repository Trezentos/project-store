import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { api } from '@/lib/api'
import { InputForm } from './styles'
import { CarrouselContext } from '@/contexts/pages/admin/Home/CarrouselEditionContext'
import { errorToast, successToast } from '@/utils/toast/sucessToast'
import InputFile from '../../../../components/Inputs/InputFile'
import Button from '@/components/admin/components/Button'

const MAX_FILE_SIZE = 5200000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const ImageSchema = z
  .any()
  .refine(
    (files) => (files[0]?.size ?? 0) <= MAX_FILE_SIZE,
    `A imagem não pode passar de 5 mb.`,
  )

const schema = z.object({
  desktopImage: ImageSchema,
  mobileImage: ImageSchema,
})

interface FormValues {
  desktopImage: FileList | null
  mobileImage: FileList | null
}

interface EditFormProps {}

function EditForm() {
  const [desktopFileState, setDesktopFileState] = useState<any>(null)
  const [mobileFileState, setMobileFileState] = useState<any>(null)
  const [isSubmiting, setIsSubmiting] = useState(false)

  const { toggleEditMode, updateCarrouselCard, carrouselCard } =
    useContext(CarrouselContext)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const { desktopImage, mobileImage } = data
      const filesToSend = new FormData()
      setIsSubmiting(true)

      if (!desktopImage?.[0] && !mobileImage?.[0]) {
        errorToast('Selecione pelo menos uma imagem.')
        return
      }

      filesToSend.append('carrouselItemId', carrouselCard.id)

      if (desktopImage?.[0]) {
        filesToSend.append('newDesktopImage', desktopImage[0])
      }

      if (mobileImage?.[0]) {
        filesToSend.append('newMobileImage', mobileImage[0])
      }

      const { data: dataResponse } = await api.post(
        '/home/update-carrousel',
        filesToSend,
      )

      updateCarrouselCard(dataResponse)
      successToast('Carrossel alterado com sucesso!')
      toggleEditMode()
    } catch (error: any) {
      const { data } = error.response
      if (!data) errorToast('Houve algum erro ao alterar o carrossel...')
      errorToast(data)
    } finally {
      setIsSubmiting(false)
    }
  }

  return (
    <InputForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <InputFile
        id={'desktopImage'}
        className={'labelDesktopImage'}
        title={'Imagem para desktop:'}
        disabled={isSubmiting}
        file={desktopFileState}
        register={register('desktopImage')}
        onChange={(e) => setDesktopFileState(e.target?.files)}
      />

      {errors.desktopImage && <p>{errors.desktopImage.message}</p>}

      <InputFile
        id={'mobileImage'}
        className={'labelMobileImage'}
        title={'Imagem para mobile:'}
        disabled={isSubmiting}
        file={mobileFileState}
        register={register('mobileImage')}
        onChange={(e) => setMobileFileState(e.target?.files)}
      />

      {errors.mobileImage && <p>{errors.mobileImage.message}</p>}

      <Button isSubmitting={isSubmiting} type="submit">
        Enviar imagens selecionadas
      </Button>
      <ToastContainer />
    </InputForm>
  )
}

export default EditForm
