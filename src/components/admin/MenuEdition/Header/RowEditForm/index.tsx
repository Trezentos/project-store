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
import ConfirmButton from '@/components/admin/components/ConfirmButton'
import InputFile from '@/components/admin/components/Inputs/InputFile'
import { X } from 'phosphor-react'
import FeaturedImagePreview from './FeaturedImagePreview'

export default function RowEditForm() {
  const {
    addModalIsOpen,
    headerItemToEdit,
    allCategoriesOptions,
    updateHeaderItem,
    getCategoryOption,
    closeEditHeaderModal: closeEditModal,
  } = useContext(EditHeaderFromAdminContext)

  const categoryDefaultValue = getCategoryOption(headerItemToEdit.categoryId)
  const [imageFile, setImageFile] = useState<any>(null)
  const [thereIsImage, setThereIsImage] = useState<any>(null)
  const { featuredImg } = headerItemToEdit
  const thereIsFeaturedImage = featuredImg.name

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
    category: z.object({ value: z.string(), label: z.string() }),
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
    async (editFormData: RegisterFormData) => {
      try {
        const { headerItemName, category, imageFile } = editFormData
        const thereIsFileOnInput = imageFile.length > 0
        let changeImage = false
        const formData = new FormData()

        if (
          !allCategoriesOptions.find((item) => item.value === category.value)
        ) {
          setError('category', { message: 'Categoria inválida' })
          return
        }

        if (featuredImg.name && !thereIsFileOnInput) {
          changeImage = false
        } else if (!thereIsFileOnInput && !featuredImg.name) {
          formData.append('imageFile', imageFile[0])
          changeImage = true
        } else {
          formData.append('imageFile', imageFile[0])
          changeImage = true
        }

        formData.append('headerItemName', headerItemName)
        formData.append('newCategoryId', category.value)
        formData.append('headerItemId', headerItemToEdit.id)
        formData.append('changeImageBoolean', String(changeImage))

        const { data } = await api.put<HeaderItem>(
          `edit-menu/header/update-header-item`,
          formData,
        )

        updateHeaderItem(data)
        closeEditModal()
      } catch (error: any) {
        const { data } = error.response
        if (!data)
          errorToast('Houve algum erro ao editar o item do cabeçalho...')
        errorToast(data)
      }
    },
    [
      allCategoriesOptions,
      closeEditModal,
      featuredImg.name,
      headerItemToEdit.id,
      setError,
      updateHeaderItem,
    ],
  )

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <h3>Editar item da Header</h3>

      <div>
        <div>
          <Input
            id={'headerItemName'}
            register={register('headerItemName')}
            label="Editar nome do item do Cabeçalho"
            value={headerItemToEdit.name}
            type="text"
          />
          {errors.headerItemName && (
            <ErrorMessage>{`${errors.headerItemName.message}`}</ErrorMessage>
          )}
        </div>

        <FeaturedImagePreview thereIsFeaturedImage={thereIsFeaturedImage}>
          <strong>{featuredImg.name}</strong>
        </FeaturedImagePreview>

        <InputFile
          id={'imageFile'}
          register={register('imageFile')}
          className={`labelImageFile ${
            thereIsFeaturedImage ? 'invisible' : ''
          }`}
          title={'Imagem de fundo:'}
          disabled={isSubmitting}
          file={imageFile}
          onChange={(e) => setImageFile(e.target?.files)}
        />
        {errors.imageFile && <p>{`${errors.imageFile.message}`}</p>}

        <div>
          <p>Categoria</p>
          <Controller
            control={control}
            name="category"
            defaultValue={categoryDefaultValue}
            render={({ field }) => (
              <InputSelect
                options={allCategoriesOptions}
                defaultValue={categoryDefaultValue}
                onChange={(item) => field.onChange(item)}
              />
            )}
          />
          {errors.category && (
            <ErrorMessage>{`${errors.category.message}`}</ErrorMessage>
          )}
        </div>

        <ConfirmButton isSubmitting={isSubmitting}>
          Confirmar edição
        </ConfirmButton>
      </div>
    </EditForm>
  )
}
