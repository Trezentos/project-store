import { useContext } from 'react'
import { Filter } from '../components/Filter'
import SelectedFilters from '../components/Filter/SelectedFilters'
import { FilterContext } from '@/contexts/pages/products/FilterContext'
import { ProductFilter } from '@/contexts/pages/admin/EditCategoriesContext'

export default function Filters() {
  const { activeFilters } = useContext(FilterContext)

  const isFilterActivated = (filterName: string) => {
    return activeFilters.some((item) => item.hifen === filterName)
  }

  return (
    <>
      {isFilterActivated('color') && <Filter type="colors" />}
      {isFilterActivated('size') && <Filter type="sizes" />}
      {isFilterActivated('price') && <Filter type="prices" />}
      <SelectedFilters />
    </>
  )
}
