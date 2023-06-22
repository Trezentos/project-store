import InputFile from '@/components/admin/components/Inputs/InputFile'
import { Container, InputForm } from './styles'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { errorToast, successToast } from '@/utils/toast/sucessToast'
import { api } from '@/lib/api'
import { MainBackgroundHomeContext } from '@/contexts/pages/admin/Home/MainBackgroundHomeContext'

const MAX_FILE_SIZE = 5200000

function CardEdit() {
  const [imageFile1State, setImageFile1] = useState<any>(null)
  const [imageFile2State, setImageFile2] = useState<any>(null)
  const { backgroundItem, updateBackgroundItem, toggleEditMode } = useContext(
    MainBackgroundHomeContext,
  )

  interface FormValues {
    imageFile1: FileList | null
    imageFile2: FileList | null
  }

  const fileSchema = z
    .any()
    .refine(
      (files) => (files[0]?.size ?? 0) <= MAX_FILE_SIZE,
      `A imagem não pode passar de 5 mb.`,
    )

  const schema = z.object({
    imageFile1: fileSchema,
    imageFile2: fileSchema,
  })

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
      const { imageFile1, imageFile2 } = data
      const filesToSend = new FormData()

      if (!imageFile1?.[0] && !imageFile2?.[0]) {
        errorToast('Selecione pelo menos uma imagem.')
        return
      }

      filesToSend.append('backgroundImageId', backgroundItem.id)

      if (imageFile1?.[0]) {
        filesToSend.append('newimageFile1', imageFile1[0])
      }

      if (imageFile2?.[0]) {
        filesToSend.append('newimageFile2', imageFile2[0])
      }

      const { data: dataResponse } = await api.patch(
        '/home/main-background-home/update-background-item',
        filesToSend,
      )

      successToast('Imagens editadas com sucesso!')
      updateBackgroundItem(dataResponse)
      toggleEditMode()
    } catch (error: any) {
      const { data } = error.response
      if (!data) errorToast('Houve algum erro ao alterar alguma imagem...')
      errorToast(data)
    }
  }

  return (
    <InputForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <InputFile
        id={'imageFile1'}
        className={'labelImageFile1'}
        title={'Imagem para desktop:'}
        disabled={isSubmitting}
        file={imageFile1State}
        register={register('imageFile1')}
        onChange={(e) => setImageFile1(e.target?.files)}
      />

      {errors.imageFile1 && <p>{errors.imageFile1.message}</p>}

      <InputFile
        id={'imageFile2'}
        className={'labelImageFile2'}
        title={'Imagem para mobile:'}
        disabled={isSubmitting}
        file={imageFile2State}
        register={register('imageFile2')}
        onChange={(e) => setImageFile2(e.target?.files)}
      />

      {errors.imageFile2 && <p>{errors.imageFile2.message}</p>}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <div className="loader active"></div>
        ) : (
          'Enviar imagens selecionadas'
        )}
      </button>
    </InputForm>
  )
}

export default CardEdit
