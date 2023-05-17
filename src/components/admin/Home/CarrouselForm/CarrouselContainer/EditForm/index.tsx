import { zodResolver } from '@hookform/resolvers/zod'
import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodError } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { CarrouselItem } from '../..'
import { api } from '@/lib/axios'
import { InputForm } from './styles'
import { Plus, Upload } from 'phosphor-react'
import { CarrouselContext } from '@/contexts/pages/admin/CarrouselEditionContext'
import { errorToast, successToast } from '@/utils/toast/sucessToast'

// import { successToast, errorToast } from '@/utils/toast/sucessToast'
const schema = z.object({
  desktopImage: z.any(),
  mobileImage: z.any(),
})

type FormValuesDataInput = z.input<typeof schema>

interface FormValues {
  desktopImage: FileList
  mobileImage: FileList
}

interface EditFormProps {}

function EditForm() {
  const [desktopFile, setDesktopFile] = useState<any>(null)
  const [mobileFile, setMobileFile] = useState<any>(null)
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

  const onSubmit = async (data: any) => {
    try {
      const filesToSend = new FormData()

      setIsSubmiting(true)

      if (desktopFile === null && mobileFile === null) {
        errorToast('Selecione pelo menos uma imagem desktop ou mobile')

        return
      }

      filesToSend.append('carrouselItemId', carrouselCard.id)

      if (desktopFile) {
        filesToSend.append('newDesktopImage', desktopFile)
      }

      if (mobileFile) {
        filesToSend.append('newMobileImage', mobileFile)
      }

      const { data } = await api.post('/home/update-carrousel', filesToSend)

      console.log(data)

      updateCarrouselCard(data)
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

  useEffect(() => {
    const labelDesktop = document.querySelector<Element>(
      '.edit-form .labelDesktopImage',
    )
    const labelMobile = document.querySelector<Element>(
      '.edit-form .labelMobileImage',
    )

    desktopFile !== null
      ? labelDesktop?.classList.add('file-selected')
      : labelDesktop?.classList.remove('file-selected')

    mobileFile !== null
      ? labelMobile?.classList.add('file-selected')
      : labelMobile?.classList.remove('file-selected')
  }, [desktopFile, mobileFile])

  return (
    <InputForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <label htmlFor="desktopImage" className="labelDesktopImage">
        Imagem para Desktop:
        {desktopFile ? <strong>{desktopFile.name}</strong> : <Plus size={40} />}
      </label>
      <input
        type="file"
        id="desktopImage"
        disabled={isSubmiting}
        {...register('desktopImage')}
        accept="image/*"
        onChange={(e: any) => {
          if (e.target?.files[0]) {
            setDesktopFile(e.target?.files[0])
          }
        }}
      />
      {errors.desktopImage && (
        <p>Por favor, selecione uma imagem para desktop.</p>
      )}

      <label htmlFor="mobileImage" className="labelMobileImage">
        Imagem para Mobile:
        {mobileFile ? <strong>{mobileFile.name}</strong> : <Plus size={40} />}
      </label>
      <input
        type="file"
        id="mobileImage"
        disabled={isSubmiting}
        {...register('mobileImage')}
        accept="image/*"
        onChange={(e: any) => {
          if (e.target?.files[0]) {
            setMobileFile(e.target?.files[0])
          }
        }}
      />
      {errors.mobileImage && (
        <p>Por favor, selecione uma imagem para mobile.</p>
      )}

      <button disabled={isSubmiting} type="submit">
        {isSubmiting ? (
          <div className="loader active"></div>
        ) : (
          'Enviar imagens selecionadas'
        )}
      </button>
      <ToastContainer />
    </InputForm>
  )
}

export default EditForm
