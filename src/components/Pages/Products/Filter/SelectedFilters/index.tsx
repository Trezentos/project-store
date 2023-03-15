import { FilterContext } from '@/contexts/pages/products/FilterContext'
import { X } from 'phosphor-react'
import { useCallback, useContext } from 'react'
import { Container, Content } from './styles'

export default function SelectedFilters() {
  const { selectedFilters, updateLocalFilter, clearAllFilters } =
    useContext(FilterContext)

  return (
    <Container theresContent={selectedFilters.length > 0}>
      <header>
        <h4>Procurar por</h4>
        <small onClick={() => clearAllFilters()}>limpar</small>
      </header>
      <Content>
        {selectedFilters.map((filter) => (
          <button key={filter.value} onClick={() => updateLocalFilter(filter)}>
            {filter.value}
            <X size={14} />
          </button>
        ))}
      </Content>
    </Container>
  )
}
