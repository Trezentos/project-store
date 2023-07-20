import { EditForm, ErrorMessage, SelectsContainer } from './styles'
import {
  InputHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/admin/components/Inputs/Input'
import { errorToast } from '@/utils/toast/sucessToast'
import ConfirmButton from '@/components/admin/components/ConfirmButton'
import { ProductsAdminContext } from '@/contexts/pages/admin/ProductsAdminContext'
import InputSelectControlled from '@/components/admin/components/Inputs/InputSelectControlled'
import ImagesInput from '@/components/admin/components/ImageList'
import { IMaskInput } from 'react-imask'
import { ModalAdminContext } from '@/contexts/pages/admin/ModalAdminContext'
import realFormatter from '@/utils/realFormatter'
import { realToNumber } from '@/components/admin/components/Inputs/Input/formattersFunctions'
import { api } from '@/lib/api'

export default function RowEditForm() {
  const {
    productToEdit,
    getCategoriesOptions,
    categoriesOptionsFromAPI,
    updateProduct,
  } = useContext(ProductsAdminContext)

  const { closeEditModal } = useContext(ModalAdminContext)
  const defaultCategoriesOptions = getCategoriesOptions(productToEdit)

  const [imageFile, setImageFile] = useState<any>(null)

  const schema = z.object({
    name: z.string().min(1, {
      message: 'Digite algum nome para o produto',
    }),
    price: z
      .string({})
      .min(1, {
        message: 'Digite algum preço para o produto',
      })
      .transform((value) => realToNumber(value)),
    color: z.string().min(1, {
      message: 'Digite alguma cor para o produto',
    }),
    colorHex: z.string().min(1, {
      message: 'Digite a cor em hexadecimal para o produto',
    }),
    quantity: z.string().min(1, {
      message: 'Digite alguma quantidade para o produto',
    }),
    description: z.string().min(1, {
      message: 'Digite alguma descrição para o produto',
    }),
    categories: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
    imagesFile: z
      .any()
      .optional()
      .transform((files) => {
        if (Array.from(files).length === 0) {
          return [
            {
              size: 0,
            },
          ]
        }
        return files
      })
      .refine(
        (files) =>
          Array.from(files).some((item: any) => (item?.size ?? 0) <= 5200000),
        `Nenhuma imagem pode passar de 5 mb.`,
      ),
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
        const {
          color,
          description,
          name,
          price,
          quantity,
          categories,
          imagesFile,
          colorHex,
        } = editFormData
        const formData = new FormData()

        formData.append('color', color)
        formData.append('colorHex', colorHex)
        formData.append('productId', productToEdit.id)
        formData.append('productVariationId', productToEdit.productVariationId)
        formData.append('description', description)
        formData.append('name', name)
        formData.append('price', String(price))
        formData.append('quantity', quantity)

        categories.forEach((category, index) => {
          formData.append(`categories[${index}]`, category.value)
        })

        if (imagesFile[0].size !== 0) {
          Array.from(imagesFile).forEach((image: any, index: any) => {
            formData.append(`images[${index}]`, image)
          })
        }
        const { data } = await api.put('products/update-product', formData)
        updateProduct(data)
        closeEditModal()
      } catch (error: any) {
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao editar o produto...')
        errorToast(data)
      }
    },
    [
      closeEditModal,
      productToEdit.id,
      productToEdit.productVariationId,
      updateProduct,
    ],
  )

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <h3>Editar Produto</h3>

      <div>
        <Input
          id={'name'}
          register={register('name')}
          label="Nome"
          value={productToEdit.name}
          type="text"
        />
        {errors.name && <ErrorMessage>{`${errors.name.message}`}</ErrorMessage>}

        <div>
          <Input
            id={'price'}
            register={register('price')}
            label="Preço"
            value={productToEdit.formattedPrice}
            type="text"
          />
          {errors.price && (
            <ErrorMessage>{`${errors.price.message}`}</ErrorMessage>
          )}
        </div>

        <Input
          id={'color'}
          register={register('color')}
          label="Cor"
          value={productToEdit.colorName}
          type="text"
        />
        {errors.color && (
          <ErrorMessage>{`${errors.color.message}`}</ErrorMessage>
        )}
        <Input
          id={'colorHex'}
          register={register('colorHex')}
          label="Cor em hexadecimal"
          value={productToEdit.colorHex}
          type="text"
        />
        {errors.colorHex && (
          <ErrorMessage>{`${errors.colorHex.message}`}</ErrorMessage>
        )}
        <Input
          id={'description'}
          register={register('description')}
          label="Descrição"
          value={productToEdit.description}
          type="text"
        />
        {errors.name && <ErrorMessage>{`${errors.name.message}`}</ErrorMessage>}
        <Input
          id={'quantity'}
          register={register('quantity')}
          label="Quantidade"
          value={productToEdit.quantity}
          type="text"
        />
        {errors.quantity && (
          <ErrorMessage>{`${errors.quantity.message}`}</ErrorMessage>
        )}

        <SelectsContainer>
          <p>Categorias</p>
          <InputSelectControlled
            control={control}
            name="categories"
            options={categoriesOptionsFromAPI}
            defaultValue={defaultCategoriesOptions}
            isMulti
          />
          {errors.categories && (
            <ErrorMessage>{`${errors.categories.message}`}</ErrorMessage>
          )}

          <ImagesInput
            images={productToEdit.images}
            register={register('imagesFile')}
            id="imagesFile"
          />
          {errors.imagesFile && (
            <ErrorMessage>{`${errors.imagesFile.message}`}</ErrorMessage>
          )}

          <ConfirmButton isSubmitting={isSubmitting}>
            Confirmar edição
          </ConfirmButton>
        </SelectsContainer>
      </div>
    </EditForm>
  )
}
