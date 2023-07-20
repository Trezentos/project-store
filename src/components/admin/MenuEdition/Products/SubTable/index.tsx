import { StyledTable } from './styles'
import { Plus } from 'phosphor-react'
import {
  EditHeaderFromAdminContext,
  SubHeaderItem,
} from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import { useCallback, useContext } from 'react'
import SubTableRow from './SubTableRow'
import { api } from '@/lib/api'
import { errorToast } from '@/utils/toast/sucessToast'
import {
  ImageProduct,
  ProductsAdminContext,
} from '@/contexts/pages/admin/ProductsAdminContext'

interface SubTableProps {
  data: {
    images: ImageProduct[]
    description: any
    rowProductId: string
    categories: {
      name: string
      id: string
    }[]
  }
}

export default function SubTable({
  data: { description, rowProductId, images, categories },
}: SubTableProps) {
  const { allProducts } = useContext(ProductsAdminContext)

  const handleOpenAddSubTableModal = useCallback((headerItemId: string) => {},
  [])

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th colSpan={2}>Descrição</th>
            <th colSpan={3}>Categorias</th>
            <th colSpan={3}>Imagens</th>
          </tr>
        </thead>
        <tbody>
          <SubTableRow data={{ description, images, categories }} />
        </tbody>
      </StyledTable>
    </>
  )
}
