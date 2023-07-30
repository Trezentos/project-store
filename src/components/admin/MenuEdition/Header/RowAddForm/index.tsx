import { EditForm, ErrorMessage } from './styles'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/admin/components/Inputs/Input'
import InputSelect from '@/components/admin/components/Inputs/InputSelect'
import { errorToast } from '@/utils/toast/sucessToast'
import { api } from '@/lib/api'
import {
  EditHeaderFromAdminContext,
  HeaderItem,
} from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import Button from '@/components/admin/components/Button'
import InputFile from '@/components/admin/components/Inputs/InputFile'
import InputSelectControlled from '@/components/admin/components/Inputs/InputSelectControlled'

export default function RowAddForm() {
  const {
    allCategoriesOptions,
    addHeaderItem,
    closeAddHeaderModal: closeAddModal,
  } = useContext(EditHeaderFromAdminContext)

  const [imageFile, setImageFile] = useState<any>(null)

  const schema = z.object({
    headerItemName: z.string().min(1, {
      message: 'Digite algum nome para o item do cabeçalho',
    }),
    imageFile: z
      .any()
      .optional()
      .refine(
        (files) => (files?.[0]?.size ?? 0) <= 5200000,
        `A imagem não pode passar de 5 mb.`,
      ),
    category: z
      .object({
        value: z.enum(['', ...allCategoriesOptions.map((item) => item.value)]),
        label: z.enum(['', ...allCategoriesOptions.map((item) => item.label)]),
      })
      .refine((item) => {
        return item.value !== ''
      }, 'Selecione uma categoria'),
  })

  type RegisterFormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = useCallback(
    async (addFormData: RegisterFormData) => {
      try {
        const { headerItemName, category, imageFile } = addFormData
        const formData = new FormData()

        formData.append('headerItemName', headerItemName)
        formData.append('categoryId', category.value)
        formData.append('imageFile', imageFile[0])

        const { data } = await api.post(
          'edit-menu/header/add-new-header-item',
          formData,
        )

        addHeaderItem(data)
        closeAddModal()
      } catch (error: any) {
        const { data } = error.response
        if (!data)
          errorToast('Houve algum erro ao adicionar o item do cabeçalho...')
        errorToast(data)
      }
    },
    [addHeaderItem, closeAddModal],
  )

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)} className="add-form">
      <h3>Adicionar novo item no cabeçalho</h3>

      <div>
        <div>
          <Input
            id={'headerItemName'}
            register={register('headerItemName')}
            label="Editar nome do item do Cabeçalho"
            type="text"
          />
          {errors.headerItemName && (
            <ErrorMessage>{`${errors.headerItemName.message}`}</ErrorMessage>
          )}
        </div>

        <InputFile
          id={'imageFile'}
          register={register('imageFile')}
          className={`labelImageFile`}
          title={'Imagem de fundo:'}
          disabled={isSubmitting}
          file={imageFile}
          onChange={(e) => setImageFile(e.target?.files)}
        />
        {errors.imageFile && <p>{`${errors.imageFile.message}`}</p>}

        <div>
          <p>Categoria</p>
          <InputSelectControlled
            control={control}
            name="category"
            options={allCategoriesOptions}
            defaultValue={[{ label: '', value: '' }]}
          />
          {errors.category && (
            <ErrorMessage>{`${errors.category.message}`}</ErrorMessage>
          )}
        </div>

        <Button isSubmitting={isSubmitting} type="submit">
          Criar novo item
        </Button>
      </div>
    </EditForm>
  )
}
