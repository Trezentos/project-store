import InputFile from '@/components/admin/InputsComponents/InputFile'
import { EditForm } from './styles'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/admin/InputsComponents/Input'
import Select, {
  SelectOption,
} from '@/components/admin/InputsComponents/InputSelect'
import { errorToast } from '@/utils/toast/sucessToast'

const MAX_FILE_SIZE = 5200000

export default function RowEditForm() {
  const [imageFile, setImageFile] = useState<any>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const options = [
    { value: 'option1', label: 'Tamanho' },
    { value: 'option2', label: 'Preço' },
    { value: 'option3', label: 'Cores' },
    { value: 'option4', label: 'Tamanho 1' },
    { value: 'option5', label: 'Preço 1' },
    { value: 'option6', label: 'Cores 1' },
  ]

  const schema = z.object({
    imageFile: z
      .any()
      .refine(
        (files) => (files[0]?.size ?? 0) <= MAX_FILE_SIZE,
        `A imagem não pode passar de 5 mb.`,
      ),
    categoryName: z.string(),
    filtersOptions: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .refine((values) => values.length > 0, {
        message: 'Selecione pelo menos uma opção.',
      }),
  })

  type RegisterFormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    console.log(errors)
    console.log(watch('filtersOptions'))
  }, [errors, watch])

  const onSubmit = useCallback((data: RegisterFormData) => {
    try {
      console.log(data)
    } catch (error: any) {
      console.log(error)

      const { data } = error.response
      if (!data) errorToast('Houve algum erro ao alterar alguma imagem...')
      errorToast(data)
    }
  }, [])

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <h3>Editar categoria de Blusas</h3>

      <div>
        <Input
          id={'categoryName'}
          register={register('categoryName')}
          label="Editar nome da categoria"
          value={'Blusas'}
          type="text"
        />

        <InputFile
          id={'imageFile'}
          register={register('imageFile')}
          className={'labelImageFile'}
          title={'Imagem de fundo:'}
          disabled={isSubmitting}
          file={imageFile}
          onChange={(e) => setImageFile(e.target?.files)}
        />
        {errors.imageFile && <p>{`${errors.imageFile.message}`}</p>}

        <Select
          id={'filtersOptions'}
          register={register('filtersOptions')}
          options={options}
          title={'Selecionar filtros'}
          values={[{ value: 'option1', label: 'Opção 1' }]}
        />

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <div className="loader active"></div>
          ) : (
            'Confirmar edição'
          )}
        </button>
      </div>
    </EditForm>
  )
}
