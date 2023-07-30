import InputFile from '@/components/admin/components/Inputs/InputFile'
import { EditForm, ErrorMessage } from './styles'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/admin/components/Inputs/Input'
import Checkbox from '@/components/admin/components/Inputs/InputCheckbox'
import { errorToast } from '@/utils/toast/sucessToast'
import { EditCategoriesContext } from '@/contexts/pages/admin/EditCategoriesContext'
import { api } from '@/lib/api'
import Button from '@/components/admin/components/Button'

export default function RowEditForm() {
  const { categoryToEdit, updateCategory, closeEditModal, options, filters } =
    useContext(EditCategoriesContext)
  const [imageFile, setImageFile] = useState<any>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const schema = z.object({
    imageFile: z
      .any()
      .optional()
      .refine(
        (files) => (files[0]?.size ?? 0) <= 5200000,
        `A imagem não pode passar de 5 mb.`,
      ),
    categoryName: z.string().min(1, {
      message: 'Digite algum nome para a categoria',
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
        const { categoryName, filtersOptions, imageFile } = data
        const formData = new FormData()

        formData.append('id', categoryToEdit.id)
        formData.append('categoryName', categoryName)

        filtersOptions.forEach((item, index) => {
          formData.append(`filter[${index}]`, item)
        })

        if (imageFile.length > 0) formData.append('imageFile', imageFile[0])

        const { data: dataResponse } = await api.put(
          'edit-menu/categories/edit-categorie',
          formData,
        )

        updateCategory(dataResponse)
        closeEditModal()
      } catch (error: any) {
        closeEditModal()
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao alterar alguma imagem...')
        errorToast(data)
      }
    },
    [categoryToEdit.id, closeEditModal, updateCategory],
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
          values={categoryToEdit.filters.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />

        <Button isSubmitting={isSubmitting} type="submit">
          Confirmar edição
        </Button>
      </div>
    </EditForm>
  )
}
