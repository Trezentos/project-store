import React, { useCallback, useContext, useEffect, useState } from 'react'
import TableRow from './TableRow'
import { Container, StyledTable, SuspendedImage } from './styles'
import { ProductCategory } from '@/contexts/pages/admin/EditCategoriesContext'
import { errorToast, successToast } from '@/utils/toast/sucessToast'
import { api } from '@/lib/api'
import { EditHeaderFromAdminContext } from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import Modal from '../../../components/Modal'
import RowEditForm from '../RowEditForm'
import AddNewRowModal from '../AddNewRowModal'
import RowEditSubHeaderForm from '../SubHeaderTable/RowEditSubHeaderForm'
import RowAddSubHeaderForm from '../SubHeaderTable/RowAddSubHeaderForm'

export default function HeaderTable() {
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const {
    isHoveredImage: isHoverdImage,
    selectedImage,
    allCategories,
    headerItems,
    editModalIsOpen,
    closeEditHeaderModal,
    openEditionModal,
    deleteHeaderItem,
    subHeaderModalOpen,
    addSubHeaderModalIsOpen,
    closeSubHeaderEditionModal,
    closeSubHeaderAddModal,
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

  const handleDeleteRow = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/edit-menu/header/delete-header-item/${id}`)
        deleteHeaderItem(id)
      } catch (error: any) {
        const { data } = error.response
        if (!data)
          errorToast('Houve algum erro ao remover o item do cabeçalho...')
        errorToast(data)
      }
    },
    [deleteHeaderItem],
  )
  const handleEditRow = useCallback(
    (id: string) => {
      openEditionModal(id)
    },
    [openEditionModal],
  )

  useEffect(() => {
    console.log(headerItems)
  }, [headerItems])

  return (
    <>
      <Container>
        {
          <SuspendedImage
            width={400}
            height={250}
            src={selectedImage ?? allCategories[0]?.imageBackgroundLink}
            alt=""
            style={{
              top: isHoverdImage ? '5px' : '-300px',
            }}
          />
        }
        <StyledTable>
          <thead>
            <tr>
              <th>Nome do item</th>
              <th>Imagem de destaque</th>
              <th>Categoria</th>
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
                onEdit={handleEditRow}
                index={index}
              />
            ))}
          </tbody>
        </StyledTable>
      </Container>
      <Modal isOpen={editModalIsOpen} closeModal={closeEditHeaderModal}>
        <RowEditForm />
      </Modal>
      <AddNewRowModal />
      <Modal
        isOpen={subHeaderModalOpen}
        closeModal={closeSubHeaderEditionModal}
      >
        <RowEditSubHeaderForm />
      </Modal>
      <Modal
        isOpen={addSubHeaderModalIsOpen}
        closeModal={closeSubHeaderAddModal}
      >
        <RowAddSubHeaderForm />
      </Modal>
    </>
  )
}
