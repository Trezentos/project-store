import InputFile from '@/components/admin/InputsComponents/InputFile'
import { AddForm, ErrorMessage } from './styles'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/admin/InputsComponents/Input'
import Checkbox, {
  SelectOption,
} from '@/components/admin/InputsComponents/InputSelect'
import { errorToast } from '@/utils/toast/sucessToast'
import { EditCategoriesContext } from '@/contexts/pages/admin/EditCategoriesContext'
import { api } from '@/lib/api'

const MAX_FILE_SIZE = 5200000

export default function RowAddForm() {
  const [imageFile, setImageFile] = useState<any>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const { addNewCategorie, closeAddModal } = useContext(EditCategoriesContext)

  const options = [
    { value: 'option1', label: 'Cor' },
    { value: 'option2', label: 'Preço' },
    { value: 'option3', label: 'Tamanho' },
  ]

  const schema = z.object({
    imageFile: z
      .any()
      .refine((files) => files.length === 1, `Insira alguma imagem.`)
      .refine(
        (files) => (files[0]?.size ?? 0) <= MAX_FILE_SIZE,
        `A imagem não pode passar de 5 mb.`,
      ),
    categoryName: z.string().min(2, {
      message: 'Digite algum nome para a categoria',
    }),
    hifen: z.string().min(2, {
      message: 'Digite algum nome para o hifen',
    }),
    filtersOptions: z.array(z.string()).refine((values) => values.length > 0, {
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

  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      try {
        const { categoryName, filtersOptions, imageFile, hifen } = data
        const formData = new FormData()

        formData.append('categoryName', categoryName)

        formData.append('hifen', hifen)

        filtersOptions.forEach((item, index) =>
          formData.append(`selectedOption${index}`, item),
        )

        if (imageFile.length > 0) formData.append('imageFile', imageFile[0])

        const { data: dataResponse } = await api.post(
          'edit-menu/categories/add-new-categorie',
          formData,
        )

        addNewCategorie(dataResponse)
        closeAddModal()
      } catch (error: any) {
        closeAddModal()
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao alterar alguma imagem...')
        errorToast(data)
      }
    },
    [closeAddModal, addNewCategorie],
  )

  return (
    <AddForm onSubmit={handleSubmit(onSubmit)} className="add-form">
      <h3>Adicione uma nova categoria</h3>

      <div>
        <div>
          <Input
            id={'categoryName'}
            register={register('categoryName')}
            label="Nome da categoria"
            type="text"
            value=""
          />
          {errors.categoryName && (
            <ErrorMessage>{`${errors.categoryName.message}`}</ErrorMessage>
          )}
        </div>
        <div>
          <Input
            id={'hifen'}
            register={register('hifen')}
            label="Nome do hifen"
            type="text"
            value=""
          />
          {errors.hifen && (
            <ErrorMessage>{`${errors.hifen.message}`}</ErrorMessage>
          )}
        </div>

        <div>
          <InputFile
            id={'imageFile'}
            register={register('imageFile')}
            className={'labelImageFile'}
            title={'Imagem de fundo:'}
            disabled={isSubmitting}
            file={imageFile}
            onChange={(e) => setImageFile(e.target?.files)}
          />
          {errors.imageFile && (
            <ErrorMessage>{`${errors.imageFile.message}`}</ErrorMessage>
          )}
        </div>

        <Checkbox
          id={'filtersOptions'}
          register={register('filtersOptions')}
          options={options}
          title={'Selecionar filtros'}
          values={[{ value: 'option2', label: 'Preço' }]}
        />

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <div className="loader active"></div>
          ) : (
            'Adicionar categoria'
          )}
        </button>
      </div>
    </AddForm>
  )
}
