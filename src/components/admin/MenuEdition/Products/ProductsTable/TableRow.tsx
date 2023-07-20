import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FaChevronDown, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { animated, useSpring } from 'react-spring'
import {
  Product,
  ProductsAdminContext,
} from '@/contexts/pages/admin/ProductsAdminContext'
import {
  cleanAllContentFromRowTable,
  removeRowFromTable,
} from '@/components/admin/utils/DOMFunctions'
import SubTable from '../SubTable'
import realFormatter from '@/utils/realFormatter'

interface TableRowProps {
  data: Product
  isExpanded: boolean
  onExpand: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  index: number
}

const TableRow: React.FC<TableRowProps> = ({
  data,
  isExpanded,
  onExpand,
  onDelete,
  onEdit,
  index,
}) => {
  const [divHeight, setDivHeight] = useState('0')
  const textHoverToImageRef = useRef<HTMLElement>(null)
  const trRef = useRef<HTMLTableRowElement | null>(null)
  //   const { imageUrl, linkTo, name: ImageName, originalName } = data.featuredImg
  //   const {} = useContext(ProductsAdminContext)

  const handleDeleteRow = useCallback(() => {
    cleanAllContentFromRowTable(trRef.current?.children)

    setTimeout(() => {
      onDelete(data.id)
      removeRowFromTable(trRef.current?.children)
      // 200 must be equal on styles: transition: padding 0.2s;
    }, 200)
  }, [data.id, onDelete])

  const rowAnimation = useSpring({
    height: isExpanded ? divHeight : '0px',
  })

  const animateRowExpansion = useCallback(() => {
    const divToAnimate = document.querySelector(`#animated-div-${data.id}`)

    if (!divToAnimate) return

    setDivHeight(`${divToAnimate.scrollHeight}px`)
  }, [data.id])

  //   const showHoveredImage = useCallback(() => {
  //     textHoverToImageRef.current?.addEventListener('mouseover', () => {
  //       updateHoveredImage(true)
  //       updateSelectedImage(imageUrl)
  //     })
  //     textHoverToImageRef.current?.addEventListener('mouseleave', () => {
  //       updateHoveredImage(false)
  //     })
  //   }, [imageUrl, updateHoveredImage, updateSelectedImage])

  useEffect(() => {
    animateRowExpansion()
    // showHoveredImage()
  }, [animateRowExpansion, data.id])

  return (
    <>
      <tr ref={trRef}>
        <td>{data.name}</td>
        <td>{realFormatter(data.price)}</td>
        <td>{data.colorName}</td>
        <td>{data.quantity}</td>

        <td onClick={() => onExpand(data.id)}>
          {isExpanded ? <AiOutlineUp /> : <AiOutlineDown />}
        </td>
        <td onClick={() => onEdit(data.id)}>
          <FaRegEdit />
        </td>
        <td>
          <FaRegTrashAlt onClick={handleDeleteRow} />
        </td>
      </tr>
      <tr>
        <td colSpan={7} style={{ padding: 0 }}>
          <animated.div style={rowAnimation} id={`animated-div-${data.id}`}>
            <SubTable
              data={{
                description: data.description,
                images: data.images,
                rowProductId: data.id,
                categories: data.categories,
              }}
            />
          </animated.div>
        </td>
      </tr>
    </>
  )
}

export default TableRow
