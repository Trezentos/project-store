// SearchBar.tsx

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Container } from './styles'
import { debounce } from 'lodash'
import { X } from 'phosphor-react'

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('')

  const debouncedSearch = debounce((searchTerm: string) => {
    onSearch(searchTerm)
  }, 1000)

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value)
      debouncedSearch(event.target.value)
    },
    [debouncedSearch],
  )

  const clearSearchText = useCallback(() => {
    handleChange({
      target: {
        value: '',
      },
    } as ChangeEvent<HTMLInputElement>)
  }, [handleChange])

  return (
    <Container>
      <input
        type="text"
        placeholder="Busque aqui pelo o nome do produto..."
        onChange={handleChange}
        value={searchText}
      />
      {searchText.length > 0 && (
        <X size={24} onClick={() => clearSearchText()} />
      )}
    </Container>
  )
}

export default SearchBar
