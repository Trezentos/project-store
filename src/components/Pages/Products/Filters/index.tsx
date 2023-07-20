import { useContext } from 'react'
import { Filter } from '../components/Filter'
import SelectedFilters from '../components/Filter/SelectedFilters'
import { FilterContext } from '@/contexts/pages/products/FilterContext'

export default function Filters() {
  const { activeFilters } = useContext(FilterContext)

  const isFilterActivated = (filterName: string) => {
    return activeFilters.some((item) => item.hifen === filterName)
  }

  return (
    <>
      {isFilterActivated('colors') && <Filter type="colors" />}
      {isFilterActivated('sizes') && <Filter type="sizes" />}
      {isFilterActivated('prices') && <Filter type="prices" />}
      <SelectedFilters />
    </>
  )
}
