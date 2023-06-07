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

interface TableProps {
  productCategoriesFromApi: ProductCategory[]
}

export default function Table({ productCategoriesFromApi }: TableProps) {
  const [productCategories, setProductCategories] = useState(
    productCategoriesFromApi,
  )
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const { isHoverdImage, selectedImage } = useContext(EditCategoriesContext)
  const thereIsProductCategories = !!productCategories?.[0]
  const { closeModal, modalIsOpen, openModal } = useContext(
    EditCategoriesContext,
  )

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
        setProductCategories(productCategories.filter((row) => row.id !== id))
        successToast('Categoria removida com sucesso')
      } catch (error: any) {
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao remover a categoria...')
        errorToast(data)
      }
    },
    [productCategories],
  )
  const handleEditRow = useCallback(
    async (id: string) => {
      try {
        openModal()
      } catch (error: any) {
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao remover a categoria...')
        errorToast(data)
      }
    },
    [openModal],
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

        setProductCategories(
          productCategories.map((item) => {
            if (item.id === data.id) return data
            return item
          }),
        )
      } catch (error: any) {
        const { data } = error.response
        if (!data) errorToast('Houve algum erro ao esconder a categoria...')
        errorToast(data)
      }
    },
    [productCategories],
  )

  return (
    <>
      {thereIsProductCategories && (
        <SuspendedImage
          width={400}
          height={250}
          src={selectedImage ?? productCategories[0].imageBackgroundLink}
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
            <th>Imagem de Fundo</th>
            <th>Filtros</th>
            <th>Expandir</th>
            <th>Editar</th>
            <th>Apagar</th>
            <th>Exibir/Ocultar</th>
          </tr>
        </thead>
        <tbody>
          {productCategories.map((row, index) => (
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
      <EditRowModal isOpen={modalIsOpen} closeModal={closeModal} />
    </>
  )
}
