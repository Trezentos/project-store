import InputFile from '@/components/admin/InputFile'
import { Container, InputForm } from './styles'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

function CardEdit() {
  const [imageFile1, setImageFile1] = useState<any>(null)
  const [imageFile2, setImageFile2] = useState<any>(null)
  const schema = z.object({})

  interface FormValues {
    imageFile1: FileList | null
    imageFile2: FileList | null
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: any) => {
    const { desktopImage, mobileImage } = data
  }

  return (
    <InputForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <InputFile
        id={'desktopImage'}
        className={'labelDesktopImage'}
        title={'Imagem para desktop:'}
        disabled={isSubmitting}
        file={imageFile1}
        register={register('imageFile1')}
        onChange={(e) => setImageFile1(e.target?.files)}
      />

      {/* {errors.desktopImage && <p>{errors.desktopImage.message}</p>} */}

      <InputFile
        id={'mobileImage'}
        className={'labelMobileImage'}
        title={'Imagem para mobile:'}
        disabled={isSubmitting}
        file={imageFile2}
        register={register('imageFile2')}
        onChange={(e) => setImageFile2(e.target?.files)}
      />

      {/* {errors.mobileImage && <p>{errors.mobileImage.message}</p>} */}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <div className="loader active"></div>
        ) : (
          'Enviar imagens selecionadas'
        )}
      </button>
      <ToastContainer />
    </InputForm>
  )
}

export default CardEdit
