import { StyledTable } from './styles'
import { Plus } from 'phosphor-react'
import {
  EditHeaderFromAdminContext,
  SubHeaderItem,
} from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import { useCallback, useContext, useEffect, useRef } from 'react'
import SubTableRow from './SubTableRow'
import { api } from '@/lib/api'
import { errorToast } from '@/utils/toast/sucessToast'
import {
  ProductVariation,
  ProductsAdminContext,
} from '@/contexts/pages/admin/ProductsAdminContext'
import { ModalAdminContext } from '@/contexts/pages/admin/ModalAdminContext'
import { cleanAllContentFromRowTable } from '@/components/admin/utils/DOMFunctions'

interface SubTableProps {
  productId: string
}

export default function SubTable({ productId }: SubTableProps) {
  const {
    getProductsVariations,
    updateProductVariationToEdit,
    updateProductIdToAdd,
    deleteProductVariation,
  } = useContext(ProductsAdminContext)
  const { openSubEditModal, openSubAddModal } = useContext(ModalAdminContext)
  const productsVariations = getProductsVariations(productId)
  const trRef = useRef<HTMLTableRowElement | null>(null)

  const handleOpenAddSubTableModal = useCallback(
    (productVariationId: string) => {},
    [],
  )

  const handleDeleteRow = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/products/delete-product-variation/${id}`)
        deleteProductVariation(id)
      } catch (err: any) {
        errorToast('Houve algum erro ao apagar o produto')
      }
    },
    [deleteProductVariation],
  )

  const handleAddRow = useCallback(
    async (id: string) => {
      openSubAddModal()
      updateProductIdToAdd(id)
    },
    [openSubAddModal, updateProductIdToAdd],
  )

  const handleEditRow = useCallback(
    (id: string) => {
      updateProductVariationToEdit(id)
      openSubEditModal()
    },
    [openSubEditModal, updateProductVariationToEdit],
  )

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th colSpan={2}>Preço</th>
            <th colSpan={2}>Cor</th>
            <th colSpan={1}>Quantidade</th>
            <th colSpan={2}>Descrição</th>
            <th colSpan={3}>Categorias</th>
            <th colSpan={3}>Imagens</th>
            <th colSpan={1}>Editar</th>
            <th colSpan={1}>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {productsVariations.map((productVariation) => {
            return (
              <SubTableRow
                onDelete={handleDeleteRow}
                onEdit={handleEditRow}
                productVariation={productVariation}
                onAdd={handleAddRow}
                key={productVariation.id}
              />
            )
          })}
          <tr>
            <td colSpan={14}>
              <button onClick={() => handleAddRow(productId)}>
                <Plus />
              </button>
            </td>
          </tr>
        </tbody>
      </StyledTable>
    </>
  )
}
