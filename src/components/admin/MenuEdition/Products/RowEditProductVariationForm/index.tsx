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
import Button from '@/components/admin/components/Button'
import { ProductsAdminContext } from '@/contexts/pages/admin/ProductsAdminContext'
import InputSelectControlled from '@/components/admin/components/Inputs/InputSelectControlled'
import ImagesInput from '@/components/admin/components/ImageList'
import { IMaskInput } from 'react-imask'
import { ModalAdminContext } from '@/contexts/pages/admin/ModalAdminContext'
import realFormatter from '@/utils/realFormatter'
import formatToCurrency, {
  realToNumber,
} from '@/components/admin/components/Inputs/Input/formattersFunctions'
import { api } from '@/lib/api'
import ColorPicker from '@/components/admin/components/ColorPicker'

export default function RowEditProductVariationForm() {
  const {
    productVariationToEdit,
    categoriesOptionsFromAPI,
    updateProductVariation,
  } = useContext(ProductsAdminContext)

  const { closeSubEditModal } = useContext(ModalAdminContext)

  const [imageFile, setImageFile] = useState<any>(null)

  const schema = z.object({
    price: z
      .string()
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
          description,
          price,
          quantity,
          categories,
          imagesFile,
          color,
          colorHex,
        } = editFormData
        const formData = new FormData()

        formData.append('color', color)
        formData.append('colorHex', colorHex)
        formData.append('productVariationId', productVariationToEdit.id)
        formData.append('productId', productVariationToEdit.productId)
        formData.append('description', description)
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
        const { data } = await api.put(
          'products/update-product-variation',
          formData,
        )
        updateProductVariation(data)
        closeSubEditModal()
      } catch (error: any) {
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao editar o produto...')
        errorToast(data)
      }
    },
    [
      closeSubEditModal,
      productVariationToEdit.id,
      productVariationToEdit.productId,
      updateProductVariation,
    ],
  )

  useEffect(() => {
    console.log(productVariationToEdit.price)
  }, [productVariationToEdit.price])

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <h3>Editar Produto</h3>

      <div>
        <div>
          <Input
            id={'price'}
            register={register('price')}
            label="Preço"
            value={realFormatter(productVariationToEdit.price)}
            type="text"
          />
          {errors.price && (
            <ErrorMessage>{`${errors.price.message}`}</ErrorMessage>
          )}
        </div>

        <Input
          id={'description'}
          register={register('description')}
          label="Descrição"
          value={productVariationToEdit.description}
          type="text"
        />
        {errors.description && (
          <ErrorMessage>{`${errors.description.message}`}</ErrorMessage>
        )}

        <div>
          <Input
            id={'color'}
            register={register('color')}
            label="Apelido para a cor"
            type="text"
            value={productVariationToEdit.colorName}
          />
          {errors.color && (
            <ErrorMessage>{`${errors.color.message}`}</ErrorMessage>
          )}
        </div>

        <Input
          id={'quantity'}
          register={register('quantity')}
          label="Quantidade"
          value={productVariationToEdit.quantity}
          type="text"
        />
        {errors.quantity && (
          <ErrorMessage>{`${errors.quantity.message}`}</ErrorMessage>
        )}

        <div>
          <ColorPicker
            name="colorHex"
            control={control}
            defaultColor={productVariationToEdit.colorHex}
          />
        </div>

        <SelectsContainer>
          <p>Categorias</p>
          <InputSelectControlled
            control={control}
            name="categories"
            options={categoriesOptionsFromAPI}
            defaultValue={productVariationToEdit.categoriesOptions}
            isMulti
          />
          {errors.categories && (
            <ErrorMessage>{`${errors.categories.message}`}</ErrorMessage>
          )}

          <ImagesInput register={register('imagesFile')} id="imagesFile" />
          {errors.imagesFile && (
            <ErrorMessage>{`${errors.imagesFile.message}`}</ErrorMessage>
          )}

          <Button isSubmitting={isSubmitting} type="submit">
            Confirmar edição
          </Button>
        </SelectsContainer>
      </div>
    </EditForm>
  )
}
