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
  const trRef = useRef<HTMLTableRowElement | null>(null)
  const divAnimeRef = useRef<HTMLDivElement | null>(null)
  const { allProductsVariations } = useContext(ProductsAdminContext)

  const handleDeleteRow = useCallback(() => {
    onDelete(data.id)
  }, [data.id, onDelete])

  const rowAnimation = useSpring({
    height: isExpanded ? divHeight : '0px',
  })

  const animateRowExpansion = useCallback(() => {
    if (!divAnimeRef.current) return
    setDivHeight(`${divAnimeRef.current.scrollHeight}px`)
  }, [])

  useEffect(() => {
    animateRowExpansion()
  }, [animateRowExpansion, data.id, allProductsVariations])

  return (
    <>
      <tr ref={trRef}>
        <td>{data.name}</td>
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
          <animated.div
            style={rowAnimation}
            id={`animated-div-${data.id}`}
            ref={divAnimeRef}
          >
            <SubTable productId={data.id} />
          </animated.div>
        </td>
      </tr>
    </>
  )
}

export default TableRow
