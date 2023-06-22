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

export default function RowEditForm() {
  const {
    addModalIsOpen,
    headerItemToEdit,
    allCategoriesOptions,
    updateSingleHeaderItem,
    getCategoryOption,
  } = useContext(EditHeaderFromAdminContext)

  const categoryDefaultValue = getCategoryOption(headerItemToEdit.categoryId)

  const schema = z.object({
    headerItemName: z.string().min(1, {
      message: 'Digite algum nome para a categoria',
    }),
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
    async (formData: RegisterFormData) => {
      try {
        const { headerItemName, category } = formData

        if (
          !allCategoriesOptions.find((item) => item.value === category.value)
        ) {
          setError('category', { message: 'Categoria inválida' })
          return
        }

        const { data } = await api.put<HeaderItem>(
          `edit-menu/header/update-header-item`,
          {
            headerItemName,
            newCategoryId: category.value,
            headerItemId: headerItemToEdit.id,
          },
        )

        updateSingleHeaderItem(data)
        console.log('returned:', data)
      } catch (error: any) {
        const { data } = error.response
        if (!data)
          errorToast('Houve algum erro ao editar o item do cabeçalho...')
        errorToast(data)
      }
    },
    [
      allCategoriesOptions,
      headerItemToEdit.id,
      setError,
      updateSingleHeaderItem,
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

        <ConfirmButton isSubmitting={isSubmitting} />
      </div>
    </EditForm>
  )
}
