import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from 'react'

interface FilterType {
  type: string
  value: string
}

interface FilterContextType {
  selectedFilters: FilterType[]
  // updateFilters: (filter: string, child?: any) => void
  clearAllFilters: () => void
  clearLocalFilters: (type: string) => void
  mainTitle: (type: string) => string | undefined
  updateLocalFilter: (filterOption: { type: string; value: string }) => void
}

interface FilterContextProviderProps {
  children: ReactNode
}

export const FilterContext = createContext({} as FilterContextType)

export function FilterContextProvider({
  children,
}: FilterContextProviderProps) {
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([])

  const removeDOMSelectedFilter = useCallback((filter: FilterType) => {
    const domElement = document.querySelector(
      `ul.${filter.type}  li.${filter.type}[value="${filter.value}"] div.selected`,
    )

    if (!domElement) return

    domElement.classList.remove('selected')
  }, [])

  const addDOMSelectedFilter = useCallback((filter: FilterType) => {
    const domElement = document.querySelector(
      `ul.${filter.type}  li.${filter.type}[value="${filter.value}"] button div`,
    )

    if (!domElement) return

    domElement.classList.add('selected')
  }, [])

  const removeAllDOMSelectedFilters = useCallback(() => {
    const allFiltersTypes = ['colors', 'sizes', 'prices']
    allFiltersTypes.forEach((type) => {
      const domElements = document.querySelectorAll(
        `ul.${type}  li.${type} div.selected`,
      )
      domElements.forEach((item) => item.classList.remove('selected'))
    }, [])
  }, [])

  const clearAllFilters = useCallback(() => {
    setSelectedFilters([])
    removeAllDOMSelectedFilters()
  }, [removeAllDOMSelectedFilters])

  const updateLocalFilter = useCallback(
    (filterOption: { type: string; value: string }) => {
      if (selectedFilters.some((item) => item.value === filterOption.value)) {
        setSelectedFilters(
          selectedFilters.filter(
            (option) => option.value !== filterOption.value,
          ),
        )
        removeDOMSelectedFilter(filterOption)
        return
      }

      setSelectedFilters((prev) => [
        ...prev,
        { value: filterOption.value, type: filterOption.type },
      ])
      addDOMSelectedFilter(filterOption)
    },
    [addDOMSelectedFilter, removeDOMSelectedFilter, selectedFilters],
  )

  const clearLocalFilters = useCallback(
    (type: string) => {
      const selectedsDivs = document.querySelectorAll<HTMLDivElement>(
        `ul.${type} li.${type} div.selected `,
      )
      selectedsDivs.forEach((div) => div.classList.remove('selected'))
      setSelectedFilters(
        selectedFilters.filter(
          (selectedFilter) => selectedFilter.type !== type,
        ),
      )
    },
    [selectedFilters],
  )

  const mainTitle = (type: string) => {
    if (type === 'colors') return 'Cores'
    if (type === 'prices') return 'Preços'
    if (type === 'sizes') return 'Tamanhos'
  }

  return (
    <FilterContext.Provider
      value={{
        selectedFilters,
        updateLocalFilter,
        clearLocalFilters,
        clearAllFilters,
        mainTitle,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
