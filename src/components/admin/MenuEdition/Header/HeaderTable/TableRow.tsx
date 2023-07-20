import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { animated, useSpring } from 'react-spring'
import {
  EditHeaderFromAdminContext,
  HeaderItem,
} from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import {
  cleanAllContentFromRowTable,
  removeRowFromTable,
} from '@/components/admin/utils/DOMFunctions'
import SubHeaderTable from '../SubHeaderTable'

interface TableRowProps {
  data: HeaderItem
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
  const { imageUrl, linkTo, name: ImageName, originalName } = data.featuredImg
  const { updateHoveredImage, updateSelectedImage, headerItems } = useContext(
    EditHeaderFromAdminContext,
  )

  const rowAnimation = useSpring({
    height: isExpanded ? divHeight : '0px',
  })

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

  const showHoveredImage = useCallback(() => {
    textHoverToImageRef.current?.addEventListener('mouseover', () => {
      updateHoveredImage(true)
      updateSelectedImage(imageUrl)
    })
    textHoverToImageRef.current?.addEventListener('mouseleave', () => {
      updateHoveredImage(false)
    })
  }, [imageUrl, updateHoveredImage, updateSelectedImage])

  useEffect(() => {
    animateRowExpansion()
    showHoveredImage()
  }, [animateRowExpansion, data.id, showHoveredImage])

  return (
    <>
      <tr ref={trRef}>
        <td>{data.name}</td>
        <td>
          <strong ref={textHoverToImageRef}>{originalName}</strong>
        </td>
        <td>{data.linkName}</td>
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
            {headerItems && (
              <SubHeaderTable
                headerSubItems={data.headerSubItems}
                headerItemId={data.id}
              />
            )}
          </animated.div>
        </td>
      </tr>
    </>
  )
}

export default TableRow
