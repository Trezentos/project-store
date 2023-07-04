import { StyledTable } from './styles'
import { Plus } from 'phosphor-react'
import {
  EditHeaderFromAdminContext,
  SubHeaderItem,
} from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import { useCallback, useContext } from 'react'
import SubHeaderTableRow from './SubHeaderTableRow'
import { api } from '@/lib/api'
import { errorToast } from '@/utils/toast/sucessToast'

interface SubHeaderTableProps {
  headerSubItems: SubHeaderItem[]
  headerItemId: string
}

export default function SubHeaderTable({
  headerSubItems,
  headerItemId,
}: SubHeaderTableProps) {
  const {
    openSubHeaderEditionModal,
    deleteSubHeaderItem,
    openSubHeaderAddModal,
  } = useContext(EditHeaderFromAdminContext)
  const handleDeleteRow = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/edit-menu/subheader/delete-header-sub-item/${id}`)
        deleteSubHeaderItem(id, headerItemId)
      } catch (error: any) {
        const { data } = error.response
        if (!data)
          errorToast('Houve algum erro ao remover o subitem do cabeçalho...')
        errorToast(data)
      }
    },
    [deleteSubHeaderItem, headerItemId],
  )
  const handleEditRow = useCallback(
    (headerSubItem: SubHeaderItem) => {
      openSubHeaderEditionModal({
        ...headerSubItem,
        headerItemId,
      })
    },
    [headerItemId, openSubHeaderEditionModal],
  )

  const handleOpenAddSubHeaderModal = useCallback(
    (headerItemId: string) => {
      openSubHeaderAddModal(headerItemId)
    },
    [openSubHeaderAddModal],
  )

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th>Nome do item</th>
            <th>Categoria</th>
            <th>Posição na coluna</th>
            <th>Destacar item</th>
            <th>Editar</th>
            <th>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {headerSubItems.map((row) => {
            return (
              <SubHeaderTableRow
                key={row.id}
                data={row}
                onDelete={handleDeleteRow}
                onEdit={handleEditRow}
              />
            )
          })}
          <tr>
            <td colSpan={7}>
              <button
                type="button"
                onClick={() => handleOpenAddSubHeaderModal(headerItemId)}
              >
                <Plus />
              </button>
            </td>
          </tr>
        </tbody>
      </StyledTable>
    </>
  )
}
