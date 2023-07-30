import { AddForm, ErrorMessage, SelectsContainer } from './styles'
import { useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/admin/components/Inputs/Input'
import { errorToast } from '@/utils/toast/sucessToast'
import Button from '@/components/admin/components/Button'
import { ProductsAdminContext } from '@/contexts/pages/admin/ProductsAdminContext'
import { ModalAdminContext } from '@/contexts/pages/admin/ModalAdminContext'
import { api } from '@/lib/api'

export default function RowAddProductMainForm() {
  const { addProductMain } = useContext(ProductsAdminContext)

  const { closeAddModal } = useContext(ModalAdminContext)

  const schema = z.object({
    name: z.string().min(1, {
      message: 'Digite algum nome para o produto',
    }),
  })

  type RegisterFormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = useCallback(
    async (editFormData: RegisterFormData) => {
      try {
        const { name } = editFormData
        const { data } = await api.post('products/add-new-product-main', {
          name,
        })

        addProductMain(data)
        closeAddModal()
      } catch (error: any) {
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao adicionar o produto...')
        errorToast(data)
      }
    },
    [addProductMain, closeAddModal],
  )

  return (
    <AddForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <h3>Adicionar Produto</h3>

      <div>
        <div>
          <Input
            id={'name'}
            register={register('name')}
            label="Nome"
            type="text"
          />
          {errors.name && (
            <ErrorMessage>{`${errors.name.message}`}</ErrorMessage>
          )}
        </div>

        <Button isSubmitting={isSubmitting} type="submit">
          Adicionar
        </Button>
      </div>
    </AddForm>
  )
}
