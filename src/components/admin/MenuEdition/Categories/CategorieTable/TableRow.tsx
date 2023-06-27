import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  FaRegEdit,
  FaRegTrashAlt,
  FaRegEye,
  FaEyeSlash,
  FaRegEyeSlash,
} from 'react-icons/fa'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { animated, useSpring } from 'react-spring'
import {
  EditCategoriesContext,
  ProductCategory,
} from '@/contexts/pages/admin/EditCategoriesContext'
import {
  cleanAllContentFromRowTable,
  removeRowFromTable,
} from '@/components/admin/utils/DOMFunctions'

interface TableRowProps {
  data: ProductCategory
  isExpanded: boolean
  onExpand: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onShowHide: (id: string, active: boolean) => void
  index: number
}

const TableRow: React.FC<TableRowProps> = ({
  data,
  isExpanded,
  onExpand,
  onDelete,
  onShowHide,
  onEdit,
  index,
}) => {
  const [divHeight, setDivHeight] = useState('0')
  const textHoverToImageRef = useRef<HTMLElement>(null)
  const trRef = useRef<HTMLTableRowElement | null>(null)

  const { updateSelectedImage, updateHoveredImage, selectedImage } = useContext(
    EditCategoriesContext,
  )

  const rowAnimation = useSpring({
    height: isExpanded ? divHeight : '0px',
  })

  const showHoveredImage = useCallback(() => {
    textHoverToImageRef.current?.addEventListener('mouseover', () => {
      updateHoveredImage(true)
      updateSelectedImage(data.imageBackgroundLink)
    })
    textHoverToImageRef.current?.addEventListener('mouseleave', () => {
      updateHoveredImage(false)
    })
  }, [data.imageBackgroundLink, updateHoveredImage, updateSelectedImage])

  const animateRowExpansion = useCallback(() => {
    const divToAnimate = document.querySelector(`#animated-div-${data.id}`)

    if (!divToAnimate) return

    setDivHeight(`${divToAnimate.scrollHeight}px`)
  }, [data.id])

  const handleDeleteRow = useCallback(() => {
    cleanAllContentFromRowTable(trRef.current?.children)

    setTimeout(() => {
      onDelete(data.id)
      removeRowFromTable(trRef.current?.children)
      // 200 must be equal on styles: transition: padding 0.2s;
    }, 200)
  }, [data.id, onDelete])

  useEffect(() => {
    showHoveredImage()
    animateRowExpansion()
  }, [animateRowExpansion, data.id, data.imageBackgroundLink, showHoveredImage])

  return (
    <>
      <tr ref={trRef}>
        <td>{data.name}</td>
        <td>
          <strong ref={textHoverToImageRef}>{data.imageBackgroundName}</strong>
        </td>
        <td>{data.filters.map((item) => item.name).join(', ')}</td>
        <td onClick={() => onExpand(data.id)}>
          {isExpanded ? <AiOutlineUp /> : <AiOutlineDown />}
        </td>
        <td onClick={() => onEdit(data.id)}>
          <FaRegEdit />
        </td>
        <td>
          <FaRegTrashAlt onClick={handleDeleteRow} />
        </td>
        <td onClick={() => onShowHide(data.id, data.active)}>
          {data.active ? (
            <FaRegEye title="Clique para esconder a categoria do site" />
          ) : (
            <FaEyeSlash title="Clique para aparecer a categoria do site" />
          )}
        </td>
      </tr>
      <tr>
        <td colSpan={7} style={{ padding: 0 }}>
          <animated.div style={rowAnimation} id={`animated-div-${data.id}`}>
            <>
              <h3>Produtos:</h3>
              {/* <ul>
                {data.products.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul> */}
            </>
          </animated.div>
        </td>
      </tr>
    </>
  )
}

export default TableRow
