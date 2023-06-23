import React, { useCallback, useContext, useEffect, useState } from 'react'
import TableRow from './TableRow'
import { Container, StyledTable, SuspendedImage } from './styles'
import { ProductCategory } from '@/contexts/pages/admin/EditCategoriesContext'
import { errorToast, successToast } from '@/utils/toast/sucessToast'
import { api } from '@/lib/api'
import { EditHeaderFromAdminContext } from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import Modal from '../../../components/Modal'
import RowEditForm from '../RowEditForm'

export default function HeaderTable() {
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const {
    allCategories,
    headerItems,
    editModalIsOpen,
    closeEditModal,
    openEditionModal,
  } = useContext(EditHeaderFromAdminContext)

  const handleExpandRow = useCallback(
    (id: string) => {
      const isRowExpanded = expandedRows.includes(id)

      if (isRowExpanded) {
        setExpandedRows(expandedRows.filter((rowId) => rowId !== id))
      } else {
        setExpandedRows([...expandedRows, id])
      }
    },
    [expandedRows],
  )

  const handleDeleteRow = useCallback(async (id: string) => {
    try {
      await api.delete(`/edit-menu/categories/delete-categorie/${id}`)
      // deleteSingleCategory(id)
      successToast('Categoria removida com sucesso')
    } catch (error: any) {
      const { data } = error.response
      if (!data) errorToast('Houve algum erro ao remover a categoria...')
      errorToast(data)
    }
  }, [])
  const handleEditRow = useCallback(
    async (id: string) => {
      openEditionModal(id)
    },
    [openEditionModal],
  )

  const handleShowHideRow = useCallback(async (id: string, active: boolean) => {
    try {
      const { data } = await api.put<ProductCategory>(
        `/edit-menu/categories/hide-categorie`,
        {
          id,
          active: !active,
        },
      )

      // updateSingleCategorie(data)
    } catch (error: any) {
      const { data } = error.response
      if (!data) errorToast('Houve algum erro ao esconder a categoria...')
      errorToast(data)
    }
  }, [])

  useEffect(() => {
    console.log('headerItems: ', headerItems)
  }, [headerItems])

  return (
    <Container>
      <StyledTable>
        <thead>
          <tr>
            <th>Nome do item</th>
            <th>Categoria do item</th>
            <th>Expandir</th>
            <th>Editar</th>
            <th>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {headerItems.map((row, index) => (
            <TableRow
              key={row.id}
              data={row}
              isExpanded={expandedRows.includes(row.id)}
              onExpand={handleExpandRow}
              onDelete={handleDeleteRow}
              onShowHide={handleShowHideRow}
              onEdit={handleEditRow}
              index={index}
            />
          ))}
        </tbody>
      </StyledTable>
      <Modal isOpen={editModalIsOpen} closeModal={closeEditModal}>
        <RowEditForm />
      </Modal>
      {/* <AddNewRow /> */}
    </Container>
  )
}
