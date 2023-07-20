import {
  ImageProduct,
  ProductsAdminContext,
} from '@/contexts/pages/admin/ProductsAdminContext'
import { useCallback, useContext, useEffect, useRef } from 'react'
import { StyledSubTableRow, TDImages } from './styles'
import { X, Upload } from 'phosphor-react'

interface SubHeaderTableRowProps {
  data: {
    description: string
    images: ImageProduct[]
    categories: {
      name: string
      id: string
    }[]
  }
}

export default function SubTableRow({
  data: { description, images, categories },
}: SubHeaderTableRowProps) {
  const trRef = useRef<HTMLTableRowElement | null>(null)
  const tdHoverToImageRef = useRef<HTMLTableCellElement>(null)
  const { updateHoveredImage, updateSelectedImage } =
    useContext(ProductsAdminContext)

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

  const handleDeleteImage = useCallback((id: string) => {}, [])

  return (
    <>
      <StyledSubTableRow ref={trRef}>
        <td colSpan={2}>
          <p>{description}</p>
        </td>
        <td colSpan={3}>
          {categories.map((category) => (
            <p key={category.id}>{category.name}</p>
          ))}
        </td>
        <TDImages ref={tdHoverToImageRef} colSpan={3}>
          {images.map((image) => (
            <strong
              onMouseOver={() => handleOnMouseOver(image.imageSrc)}
              onMouseLeave={() => handleOnMouseLeave()}
              key={image.id}
            >
              <div>{image.originalName}</div>
            </strong>
          ))}
        </TDImages>
      </StyledSubTableRow>
    </>
  )
}
