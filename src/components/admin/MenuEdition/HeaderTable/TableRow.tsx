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
  EditCategoriesContext,
  ProductCategory,
} from '@/contexts/pages/admin/EditCategoriesContext'

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

  const rowAnimation = useSpring({
    height: isExpanded ? divHeight : '0px',
  })

  const animateRowExpansion = useCallback(() => {
    const divToAnimate = document.querySelector(`#animated-div-${data.id}`)

    if (!divToAnimate) return

    setDivHeight(`${divToAnimate.scrollHeight}px`)
  }, [data.id])

  const handleDeleteRow = useCallback(() => {
    Array.from(trRef.current?.children as ArrayLike<Element>).forEach(
      (item) => {
        item.innerHTML = ''
        // @ts-ignore
        item.style.padding = '0px'
      },
    )

    setTimeout(() => {
      onDelete(data.id)
      // 200 must be equal on styles: transition: padding 0.2s;
    }, 200)
  }, [data.id, onDelete])

  useEffect(() => {
    animateRowExpansion()
  }, [animateRowExpansion, data.id, data.imageBackgroundLink, showHoveredImage])

  return (
    <>
      <tr ref={trRef}>
        <td>{data.name}</td>
        <td>{data.hifen}</td>

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
