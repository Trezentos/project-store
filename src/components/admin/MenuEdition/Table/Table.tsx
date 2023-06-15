import React, { useCallback, useContext, useEffect, useState } from 'react'
import TableRow from './TableRow'
import { StyledTable, SuspendedImage } from './styles'
import {
  EditCategoriesContext,
  ProductCategory,
} from '@/contexts/pages/admin/EditCategoriesContext'
import { errorToast, successToast } from '@/utils/toast/sucessToast'
import { api } from '@/lib/api'
import EditRowModal from '../EditRowModal'
import AddNewRow from '../AddNewRow'

interface TableProps {
  productCategoriesFromApi: ProductCategory[]
}

export default function Table({ productCategoriesFromApi }: TableProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const { isHoverdImage, selectedImage, allCategories } = useContext(
    EditCategoriesContext,
  )
  const thereIsProductCategories = !!allCategories?.[0]
  const {
    closeEditModal,
    editModalIsOpen,
    openEditionModal,
    deleteSingleCategory,
    updateAllCategories,
    updateSingleCategorie,
  } = useContext(EditCategoriesContext)

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
        await api.delete(`/edit-menu/categories/delete-categorie/${id}`)
        deleteSingleCategory(id)
        successToast('Categoria removida com sucesso')
      } catch (error: any) {
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao remover a categoria...')
        errorToast(data)
      }
    },
    [deleteSingleCategory],
  )
  const handleEditRow = useCallback(
    async (id: string) => {
      openEditionModal(id)
    },
    [openEditionModal],
  )

  const handleShowHideRow = useCallback(
    async (id: string, active: boolean) => {
      try {
        const { data } = await api.put<ProductCategory>(
          `/edit-menu/categories/hide-categorie`,
          {
            id,
            active: !active,
          },
        )

        updateSingleCategorie(data)
      } catch (error: any) {
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao esconder a categoria...')
        errorToast(data)
      }
    },
    [updateSingleCategorie],
  )

  useEffect(() => {
    if (!allCategories[0]) updateAllCategories(productCategoriesFromApi)
  }, [
    allCategories,
    productCategoriesFromApi,
    deleteSingleCategory,
    updateAllCategories,
  ])

  return (
    <>
      {thereIsProductCategories && (
        <SuspendedImage
          width={400}
          height={250}
          src={selectedImage ?? allCategories[0].imageBackgroundLink}
          alt=""
          style={{
            top: isHoverdImage ? '5px' : '-300px',
          }}
        />
      )}
      <StyledTable>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Hífen</th>
            <th>Imagem de Fundo</th>
            <th>Filtros</th>
            <th>Expandir</th>
            <th>Editar</th>
            <th>Apagar</th>
            <th>Exibir/Ocultar</th>
          </tr>
        </thead>
        <tbody>
          {allCategories[0] &&
            allCategories.map((row, index) => (
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
      <EditRowModal isOpen={editModalIsOpen} closeModal={closeEditModal} />
      <AddNewRow />
    </>
  )
}
