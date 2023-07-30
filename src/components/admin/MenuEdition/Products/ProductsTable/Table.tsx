import React, { useCallback, useContext, useEffect, useState } from 'react'
import TableRow from './TableRow'
import { Container, StyledTable, SuspendedImage } from './styles'
import { ProductsAdminContext } from '@/contexts/pages/admin/ProductsAdminContext'
import { ModalAdminContext } from '@/contexts/pages/admin/ModalAdminContext'
import Modals from '../Modals'
import { errorToast } from '@/utils/toast/sucessToast'
import { api } from '@/lib/api'
import SearchBar from '@/components/admin/components/SearchBar'

export default function ProductsTable() {
  const {
    allProducts,
    selectedImage,
    isHoveredImage,
    updateProductToEdit,
    deleteProductMain,
    updateAllMainProducts,
  } = useContext(ProductsAdminContext)
  const { openEditModal, openWarningModal, closeWarningModal } =
    useContext(ModalAdminContext)

  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
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
      openWarningModal(async () => {
        try {
          await api.delete(`/products/delete-main-product/${id}`)
          closeWarningModal()
          deleteProductMain(id)
        } catch (err) {
          console.error(err)
          errorToast('Houve algum erro ao apagar o produto')
        }
      })
    },
    [openWarningModal, closeWarningModal, deleteProductMain],
  )
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

  const handleSearchProduct = useCallback(
    async (name: string) => {
      try {
        const { data } = await api.get(
          `/products/search-products/?name=${name}`,
        )

        updateAllMainProducts(data)
      } catch (err: any) {
        console.log(err.message)
      } finally {
        setIsSearching(false)
      }
    },
    [updateAllMainProducts],
  )

  useEffect(() => {
    console.log(isSearching)
  }, [isSearching])

  return (
    <>
      <Container>
        <SuspendedImage
          width={400}
          height={250}
          src={selectedImage ?? ''}
          alt=""
          style={{
            top: isHoveredImage ? '5px' : '-300px',
          }}
        />
        <SearchBar onSearch={(e) => handleSearchProduct(e)} />
        <StyledTable>
          <thead>
            <tr>
              <th>Nome</th>
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
