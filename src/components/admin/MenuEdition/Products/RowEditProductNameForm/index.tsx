import { EditForm, ErrorMessage, SelectsContainer } from './styles'
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

export default function RowEditProductNameForm() {
  const { productToEdit, categoriesOptionsFromAPI, updateProduct } =
    useContext(ProductsAdminContext)

  const { closeEditModal } = useContext(ModalAdminContext)

  const [imageFile, setImageFile] = useState<any>(null)

  const schema = z.object({
    name: z.string().min(2, {
      message: 'Digite algum nome válido para o produto',
    }),
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
        const { name } = editFormData

        const { data } = await api.put('products/update-main-product', {
          name,
          id: productToEdit.id,
        })
        updateProduct(data)
        closeEditModal()
      } catch (error: any) {
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao editar o produto...')
        errorToast(data)
      }
    },
    [closeEditModal, productToEdit.id, updateProduct],
  )

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <h3>Editar o nome do Produto</h3>

      <div>
        <Input
          id={'name'}
          register={register('name')}
          label="Nome"
          value={productToEdit.name}
          type="text"
        />
        {errors.name && <ErrorMessage>{`${errors.name.message}`}</ErrorMessage>}

        <Button isSubmitting={isSubmitting} type="submit">
          Confirmar edição
        </Button>
      </div>
    </EditForm>
  )
}
