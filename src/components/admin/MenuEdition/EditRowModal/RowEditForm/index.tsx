import InputFile from '@/components/admin/InputsComponents/InputFile'
import { EditForm, ErrorMessage } from './styles'
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

export default function RowEditForm() {
  const { categoryToEdit, updateSingleCategorie, closeEditModal } = useContext(
    EditCategoriesContext,
  )
  const [imageFile, setImageFile] = useState<any>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const options = [
    { value: 'option1', label: 'Cor' },
    { value: 'option2', label: 'Preço' },
    { value: 'option3', label: 'Tamanho' },
  ]

  const schema = z.object({
    imageFile: z
      .any()
      .optional()
      .refine(
        (files) => (files[0]?.size ?? 0) <= MAX_FILE_SIZE,
        `A imagem não pode passar de 5 mb.`,
      ),
    categoryName: z.string().min(1, {
      message: 'Digite algum nome para a categoria',
    }),
    hifen: z.string().min(1, {
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

        formData.append('id', categoryToEdit.id)
        formData.append('categoryName', categoryName)
        formData.append('hifen', hifen)

        filtersOptions.forEach((item, index) =>
          formData.append(`selectedOption${index}`, item),
        )

        if (imageFile.length > 0) formData.append('imageFile', imageFile[0])

        const { data: dataResponse } = await api.put(
          'edit-menu/categories/edit-categorie',
          formData,
        )

        updateSingleCategorie(dataResponse)
        closeEditModal()
      } catch (error: any) {
        closeEditModal()
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao alterar alguma imagem...')
        errorToast(data)
      }
    },
    [categoryToEdit.id, closeEditModal, updateSingleCategorie],
  )

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <h3>Editar categoria de {categoryToEdit.name}</h3>

      <div>
        <div>
          <Input
            id={'categoryName'}
            register={register('categoryName')}
            label="Editar nome da categoria"
            value={categoryToEdit.name}
            type="text"
          />
          {errors.categoryName && (
            <ErrorMessage>{`${errors.categoryName.message}`}</ErrorMessage>
          )}
        </div>
        <div>
          <Input
            id={'hifen'}
            register={register('hifen')}
            label="Editar hifen"
            value={categoryToEdit.hifen}
            type="text"
          />
          {errors.hifen && (
            <ErrorMessage>{`${errors.hifen.message}`}</ErrorMessage>
          )}
        </div>

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

        <Checkbox
          id={'filtersOptions'}
          register={register('filtersOptions')}
          options={options}
          title={'Selecionar filtros'}
          values={categoryToEdit.filters.map((item, index) => ({
            value: `option${index + 1}`,
            label: item.name,
          }))}
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
