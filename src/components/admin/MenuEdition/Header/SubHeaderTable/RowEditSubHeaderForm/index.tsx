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
import InputSelectControlled from '@/components/admin/components/Inputs/InputSelectControlled'

export default function RowEditSubHeaderForm() {
  const {
    subHeaderItemToEdit,
    allCategoriesOptions,
    getCategoryOption,
    getHighlightItemDefaultValue,
    updateSubHeaderItem,
    closeSubHeaderEditionModal: closeSubHeaderModal,
    getColumnPositionDefaultValue,
  } = useContext(EditHeaderFromAdminContext)

  const categoryDefaultValue = getCategoryOption(subHeaderItemToEdit.categoryId)
  const highlightItemDefaultValue = getHighlightItemDefaultValue(
    subHeaderItemToEdit.isHighlighted,
  )
  const columnPositionDefaultValue = getColumnPositionDefaultValue(
    subHeaderItemToEdit.columnPosition,
  )

  const schema = z.object({
    subHeaderItemName: z.string().min(1, {
      message: 'Digite algum nome para o subitem do cabeçalho',
    }),
    category: z.object({ value: z.string(), label: z.string() }),
    highlightItem: z.object({ value: z.string(), label: z.string() }),
    columnPosition: z.object({ value: z.string(), label: z.string() }),
  })

  type RegisterFormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = useCallback(
    async (editFormData: RegisterFormData) => {
      try {
        const { subHeaderItemName, category, columnPosition, highlightItem } =
          editFormData

        const { data } = await api.post(
          'edit-menu/subheader/update-subheader-item',
          {
            subHeaderItemName,
            subHeaderItemId: subHeaderItemToEdit.id,
            categoryId: category.value,
            columnPosition: Number(columnPosition.value),
            highlightItem: highlightItem.value,
          },
        )

        updateSubHeaderItem(data, subHeaderItemToEdit.headerItemId)
        closeSubHeaderModal()
      } catch (error: any) {
        const { data } = error.response
        if (!data)
          errorToast('Houve algum erro ao editar o item do cabeçalho...')
        errorToast(data)
      }
    },
    [
      closeSubHeaderModal,
      subHeaderItemToEdit.headerItemId,
      subHeaderItemToEdit.id,
      updateSubHeaderItem,
    ],
  )

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <h3>Editar subitem da Header</h3>

      <div>
        <div>
          <Input
            id={'subHeaderItemName'}
            register={register('subHeaderItemName')}
            label="Editar nome do subitem do Cabeçalho"
            value={subHeaderItemToEdit.name}
            type="text"
          />
          {errors.subHeaderItemName && (
            <ErrorMessage>{`${errors.subHeaderItemName.message}`}</ErrorMessage>
          )}
        </div>

        <div>
          <p>Posição na coluna</p>
          <InputSelectControlled
            control={control}
            name="columnPosition"
            defaultValue={columnPositionDefaultValue}
            options={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
            ]}
          />
          {errors.columnPosition && (
            <ErrorMessage>{`${errors.columnPosition.message}`}</ErrorMessage>
          )}
        </div>

        <div>
          <p>Destacar Item</p>
          <InputSelectControlled
            control={control}
            name="highlightItem"
            defaultValue={highlightItemDefaultValue}
            options={[
              { label: 'Sim', value: 'true' },
              { label: 'Não', value: 'false' },
            ]}
          />
          {errors.highlightItem && (
            <ErrorMessage>{`${errors.highlightItem.message}`}</ErrorMessage>
          )}
        </div>

        <div>
          <p>Categoria</p>
          <InputSelectControlled
            control={control}
            name="category"
            defaultValue={categoryDefaultValue}
            options={allCategoriesOptions}
          />
          {errors.category && (
            <ErrorMessage>{`${errors.category.message}`}</ErrorMessage>
          )}
        </div>

        <Button isSubmitting={isSubmitting} type="submit">
          Confirmar edição
        </Button>
      </div>
    </EditForm>
  )
}
