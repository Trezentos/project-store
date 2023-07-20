import React, { useCallback, useContext, useEffect, useState } from 'react'
import TableRow from './TableRow'
import { Container, StyledTable, SuspendedImage } from './styles'
import { ProductsAdminContext } from '@/contexts/pages/admin/ProductsAdminContext'
import { ModalAdminContext } from '@/contexts/pages/admin/ModalAdminContext'
import Modals from '../Modals'
import { errorToast } from '@/utils/toast/sucessToast'

export default function ProductsTable() {
  const { allProducts, selectedImage, isHoveredImage, updateProductToEdit } =
    useContext(ProductsAdminContext)
  const { openEditModal } = useContext(ModalAdminContext)

  const [expandedRows, setExpandedRows] = useState<string[]>([])
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
  const handleDeleteRow = useCallback(async (id: string) => {}, [])
  const handleEditRow = useCallback(
    (id: string) => {
      try {
        updateProductToEdit(id)
        openEditModal()
      } catch (error: any) {
        errorToast(error.message)
      }
    },
    [openEditModal, updateProductToEdit],
  )

  return (
    <>
      <Container>
        {
          <SuspendedImage
            width={400}
            height={250}
            src={selectedImage ?? ''}
            alt=""
            style={{
              top: isHoveredImage ? '5px' : '-300px',
            }}
          />
        }
        <StyledTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Cor</th>
              <th>Quatidade Disponível</th>
              <th>Expandir</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((row, index) => (
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
        <Modals />
      </Container>
    </>
  )
}
