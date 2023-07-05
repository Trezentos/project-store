import { AddForm, ErrorMessage } from './styles'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/admin/components/Inputs/Input'
import { errorToast } from '@/utils/toast/sucessToast'
import { api } from '@/lib/api'
import {
  EditHeaderFromAdminContext,
  HeaderItem,
  SubHeaderItem,
} from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import ConfirmButton from '@/components/admin/components/ConfirmButton'
import InputSelectControlled from '@/components/admin/components/Inputs/InputSelectControlled'

export default function RowAddSubHeaderForm() {
  const {
    allCategoriesOptions,
    headerItemIdToAddIn,
    addSubHeaderItem,
    closeSubHeaderAddModal,
  } = useContext(EditHeaderFromAdminContext)

  const schema = z.object({
    subHeaderItemName: z.string().min(1, {
      message: 'Digite algum nome para o subitem do cabeçalho',
    }),
    category: z
      .object({
        value: z.enum(['', ...allCategoriesOptions.map((item) => item.value)]),
        label: z.enum(['', ...allCategoriesOptions.map((item) => item.label)]),
      })
      .refine((item) => {
        return item.value !== ''
      }, 'Selecione uma categoria'),
    highlightItem: z
      .object({
        value: z.enum(['', 'true', 'false']),
        label: z.enum(['', 'Sim', 'Não']),
      })
      .refine((item) => {
        return item.value !== ''
      }, 'Selecione se vai destacar o item ou não'),
    columnPosition: z
      .object({
        value: z.enum(['', '1', '2', '3']),
        label: z.enum(['', '1', '2', '3']),
      })
      .refine((item) => {
        return item.value !== ''
      }, 'Selecione o numero da coluna'),
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
    async (addFormData: RegisterFormData) => {
      try {
        const { subHeaderItemName, category, columnPosition, highlightItem } =
          addFormData

        const { data } = await api.post<SubHeaderItem>(
          'edit-menu/subheader/add-subheader-item',
          {
            subHeaderItemName,
            categoryId: category.value,
            columnPosition: columnPosition.value,
            highlightItem: highlightItem.value,
            headerItemId: headerItemIdToAddIn,
          },
        )

        addSubHeaderItem(data, headerItemIdToAddIn)
        closeSubHeaderAddModal()
      } catch (error: any) {
        const { data } = error.response
        if (!data)
          errorToast('Houve algum erro ao adicionar o subitem do cabeçalho...')
        errorToast(data)
      }
    },
    [addSubHeaderItem, closeSubHeaderAddModal, headerItemIdToAddIn],
  )

  return (
    <AddForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <h3>Adicionar novo subitem no cabeçalho</h3>

      <div>
        <div>
          <Input
            id={'subHeaderItemName'}
            register={register('subHeaderItemName')}
            label="Nome do subitem"
            value={''}
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
            options={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
            ]}
            defaultValue={{ label: '', value: '' }}
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
            defaultValue={{ label: '', value: '' }}
            options={[
              { label: 'Não', value: 'false' },
              { label: 'Sim', value: 'true' },
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
            options={allCategoriesOptions}
            defaultValue={{ label: '', value: '' }}
          />
          {errors.category && (
            <ErrorMessage>{`${errors.category.message}`}</ErrorMessage>
          )}
        </div>

        <ConfirmButton isSubmitting={isSubmitting}>
          Adicionar novo subitem
        </ConfirmButton>
      </div>
    </AddForm>
  )
}
