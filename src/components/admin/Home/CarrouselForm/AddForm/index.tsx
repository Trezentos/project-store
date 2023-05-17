import { zodResolver } from '@hookform/resolvers/zod'
import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodError } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { CarrouselItem } from '..'
import { api } from '@/lib/axios'
import { InputForm } from './styles'
import { Plus, Upload } from 'phosphor-react'
import { CarrouselContext } from '@/contexts/pages/admin/CarrouselEditionContext'
import { errorToast, successToast } from '@/utils/toast/sucessToast'

const MAX_FILE_SIZE = 3200000
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
      console.log(files)
      return files?.length === 1
    }, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  addMobileImage: z
    .any()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
})

interface FormValues {
  addDesktopImage: FileList | null
  addMobileImage: FileList | null
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
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const { addDesktopImage, addMobileImage } = data
      setIsSubmiting(true)

      if (!addDesktopImage || !addMobileImage) return

      const formData = new FormData()
      formData.append('desktopImage', addDesktopImage[0])
      formData.append('mobileImage', addMobileImage[0])

      const response = await api.post('/home/update-carrousell', formData)

      successToast('Carrossel adicionado com sucesso!')
    } catch (error: any) {
      errorToast('...')
      console.log(errors)
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

    desktopFile
      ? labelDesktop?.classList.add('file-selected')
      : labelDesktop?.classList.remove('file-selected')

    mobileFile
      ? labelMobile?.classList.add('file-selected')
      : labelMobile?.classList.remove('file-selected')
  }, [desktopFile, mobileFile])

  return (
    <InputForm onSubmit={handleSubmit(onSubmit)} className="add-form">
      <label htmlFor="addDesktopImage" className="labelDesktopImage">
        Imagem para Desktop:
        {desktopFile && desktopFile[0]?.name ? (
          <strong>{desktopFile[0].name}</strong>
        ) : (
          <Plus size={40} />
        )}
      </label>
      <input
        type="file"
        id="addDesktopImage"
        disabled={isSubmiting}
        {...register('addDesktopImage')}
        accept="image/*"
        onChange={(e) => setDesktopFile(e.target?.files)}
      />
      {errors.addDesktopImage && <p>{errors.addDesktopImage.message}</p>}

      <label htmlFor="addMobileImage" className="labelMobileImage">
        Imagem para Mobile:
        {mobileFile && mobileFile[0]?.name ? (
          <strong>{mobileFile[0].name}</strong>
        ) : (
          <Plus size={40} />
        )}
      </label>
      <input
        type="file"
        id="addMobileImage"
        {...register('addMobileImage')}
        disabled={isSubmiting}
        accept="image/*"
        onChange={(e) => setMobileFile(e.target.files)}
      />
      {errors.addMobileImage && <p>{errors.addMobileImage.message}</p>}

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
