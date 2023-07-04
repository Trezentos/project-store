import {
  cleanAllContentFromRowTable,
  removeRowFromTable,
} from '@/components/admin/utils/DOMFunctions'
import { SubHeaderItem } from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import { useCallback, useRef } from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

interface SubHeaderTableRowProps {
  data: SubHeaderItem
  onDelete: (id: string) => void
  onEdit: (headerSubItem: SubHeaderItem) => void
}

export default function SubHeaderTableRow({
  data,
  onDelete,
  onEdit,
}: SubHeaderTableRowProps) {
  const { id, columnPosition, linkName, name, isHighlighted } = data
  const trRef = useRef<HTMLTableRowElement | null>(null)

  const handleDeleteRow = useCallback(() => {
    cleanAllContentFromRowTable(trRef.current?.children)

    setTimeout(() => {
      onDelete(data.id)
      removeRowFromTable(trRef.current?.children)
      // 200 must be equal on styles: transition: padding 0.2s;
    }, 200)
  }, [data.id, onDelete])

  return (
    <>
      <tr ref={trRef}>
        <td>{name}</td>
        <td>{linkName}</td>
        <td>{columnPosition + 1}</td>
        <td>{isHighlighted ? 'Sim' : 'Não'}</td>
        <td onClick={() => onEdit(data)}>
          <FaRegEdit />
        </td>
        <td>
          <FaRegTrashAlt onClick={handleDeleteRow} />
        </td>
      </tr>
    </>
  )
}
