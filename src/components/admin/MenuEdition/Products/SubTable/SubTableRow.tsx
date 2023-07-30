import {
  ImageProduct,
  Product,
  ProductVariation,
  ProductsAdminContext,
} from '@/contexts/pages/admin/ProductsAdminContext'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { StyledSubTableRow, TDImages } from './styles'
import { X, Upload, Plus } from 'phosphor-react'
import { errorToast } from '@/utils/toast/sucessToast'
import { api } from '@/lib/api'
import formatToCurrency from '@/components/admin/components/Inputs/Input/formattersFunctions'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import realFormatter from '@/utils/realFormatter'
import {
  cleanAllContentFromRowTable,
  removeRowFromTable,
} from '@/components/admin/utils/DOMFunctions'

interface SubHeaderTableRowProps {
  productVariation: ProductVariation
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onAdd: (id: string) => void
}

export default function SubTableRow({
  productVariation,
  onDelete,
  onEdit,
  onAdd,
}: SubHeaderTableRowProps) {
  const trRef = useRef<HTMLTableRowElement | null>(null)
  const tdHoverToImageRef = useRef<HTMLTableCellElement>(null)
  const [isDeletingImg, setIsDeletingImg] = useState(false)
  const {
    updateHoveredImage,
    updateSelectedImage,
    deleteImageFromProductVariation,
    allProductsVariations,
  } = useContext(ProductsAdminContext)

  const handleOnMouseOver = useCallback(
    (imgSrc: string) => {
      updateHoveredImage(true)
      updateSelectedImage(imgSrc)
    },
    [updateHoveredImage, updateSelectedImage],
  )
  const handleOnMouseLeave = useCallback(() => {
    updateHoveredImage(false)
  }, [updateHoveredImage])

  const handleDeleteRow = useCallback(
    (id: string) => {
      cleanAllContentFromRowTable(trRef.current?.children)

      console.log('row: ', id)

      setTimeout(() => {
        onDelete(id)
        removeRowFromTable(trRef.current?.children)
        // 200 must be equal on styles: transition: padding 0.2s;
      }, 200)
    },
    [onDelete],
  )

  useEffect(() => {
    console.log(allProductsVariations)
  }, [allProductsVariations])

  const handleDeleteImage = useCallback(
    async (imageId: string, productVariationId: string) => {
      try {
        setIsDeletingImg(true)
        await api.delete(`/products/delete-image-product/${imageId}`)
        deleteImageFromProductVariation(imageId, productVariationId)
      } catch (err: any) {
        errorToast(err.message)
      } finally {
        setIsDeletingImg(false)
      }
    },
    [deleteImageFromProductVariation],
  )

  return (
    <>
      <StyledSubTableRow ref={trRef} key={productVariation.id}>
        <td colSpan={2}>
          <p>{realFormatter(productVariation.price)}</p>
        </td>
        <td colSpan={2}>
          <p>{productVariation.colorName}</p>
        </td>
        <td colSpan={1}>
          <p>{productVariation.quantity}</p>
        </td>
        <td colSpan={2}>
          <p>{productVariation.description}</p>
        </td>
        <td colSpan={3}>
          {productVariation.categoriesOptions.map((category) => (
            <p key={category.value}>{category.label}</p>
          ))}
        </td>

        <TDImages ref={tdHoverToImageRef} colSpan={3}>
          {productVariation.images.map((image) => (
            <strong
              onMouseOver={() => handleOnMouseOver(image.imageSrc)}
              onMouseLeave={() => handleOnMouseLeave()}
              key={image.id}
            >
              <p>{image.originalName}</p>
              <X
                size={24}
                onClick={() => handleDeleteImage(image.id, productVariation.id)}
              />
            </strong>
          ))}
        </TDImages>
        <td onClick={() => onEdit(productVariation.id)} colSpan={1}>
          <FaRegEdit />
        </td>
        <td colSpan={1}>
          <FaRegTrashAlt onClick={() => handleDeleteRow(productVariation.id)} />
        </td>
      </StyledSubTableRow>
    </>
  )
}
