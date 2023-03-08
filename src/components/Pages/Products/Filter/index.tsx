import { Minus, Plus } from 'phosphor-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AsideHeader,
  AsideOptions,
  CheckBoxButton,
  CircleColorOption,
  CircleSizeOption,
} from './styles'

interface FilterProps {
  type: 'colors' | 'sizes' | 'prices'
  colorContent?: {
    id: number
    color: string
  }[]
  updateFilters: (filter: string, child?: any) => void
  clearFilters: (options: string[]) => void
}

export function Filter({
  type,
  colorContent,
  updateFilters,
  clearFilters,
}: FilterProps) {
  const asideOptionRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const expandAccordion = useCallback(() => {
    if (!asideOptionRef || !asideOptionRef.current) return

    if (
      asideOptionRef.current?.style.maxHeight === '0px' ||
      asideOptionRef.current?.style.maxHeight === ''
    ) {
      setIsExpanded(true)
      asideOptionRef.current.style.maxHeight =
        asideOptionRef.current.scrollHeight + 'px'
    } else {
      setIsExpanded(false)
      asideOptionRef.current.style.maxHeight = 0 + 'px'
    }
  }, [])

  const updateLocalFilter = useCallback(
    (filterOption: string) => {
      if (selectedOptions.includes(filterOption)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== filterOption),
        )
        return
      }

      setSelectedOptions((prev) => [...prev, filterOption])
    },
    [selectedOptions],
  )

  const clearLocalFilters = useCallback(() => {
    const selectedsDivs = document.querySelectorAll<HTMLDivElement>(
      `ul.${type} li.${type} div.selected `,
    )

    if (!selectedsDivs) return

    selectedsDivs.forEach((div) => div.classList.remove('selected'))

    clearFilters(selectedOptions)
    setSelectedOptions([])
  }, [clearFilters, selectedOptions, type])

  const sizesContent = [
    {
      id: 1,
      size: 'PP',
    },
    {
      id: 2,
      size: 'P',
    },
    {
      id: 3,
      size: 'M',
    },
    {
      id: 4,
      size: 'G',
    },
    {
      id: 5,
      size: 'GG',
    },
  ]
  const pricesContent = [
    {
      id: 1,
      price: 'R$ 0,00 - R$ 50,00',
    },
    {
      id: 2,
      price: 'R$ 50,00 - R$ 100,00',
    },
    {
      id: 3,
      price: 'R$ 100,00 - R$ 150,00',
    },
    {
      id: 4,
      price: 'R$ 150,00 - R$ 200,00',
    },
    {
      id: 5,
      price: 'Acima de R$ 250,00',
    },
  ]

  const MainTitle = () => {
    if (type === 'colors') return 'Cores'
    if (type === 'prices') return 'Preços'
    if (type === 'sizes') return 'Tamanhos'
  }

  return (
    <div>
      <AsideHeader>
        <button onClick={() => expandAccordion()}>
          <h3>{MainTitle()}</h3>
          <div>
            {selectedOptions.length > 0 && (
              <small
                onClick={(e) => {
                  e.stopPropagation()
                  clearLocalFilters()
                }}
              >
                limpar
              </small>
            )}
            {isExpanded ? <Minus size={22} /> : <Plus size={22} />}
          </div>
        </button>
      </AsideHeader>
      <AsideOptions ref={asideOptionRef}>
        <ul className={type}>
          {type === 'colors' &&
            colorContent?.map((filter) => {
              return (
                <li key={filter.id} className={type}>
                  <button
                    type="button"
                    onClick={(e) => {
                      updateLocalFilter(filter.color)
                      updateFilters(
                        filter.color,
                        e.currentTarget.firstElementChild,
                      )
                    }}
                  >
                    <CircleColorOption color={filter.color} />
                  </button>
                </li>
              )
            })}
          {type === 'sizes' &&
            sizesContent?.map((filter) => {
              return (
                <li key={filter.id} className={type}>
                  <button
                    type="button"
                    onClick={(e) => {
                      updateLocalFilter(filter.size)
                      updateFilters(
                        filter.size,
                        e.currentTarget.firstElementChild,
                      )
                    }}
                  >
                    <CircleSizeOption>
                      <small>{filter.size}</small>
                    </CircleSizeOption>
                  </button>
                </li>
              )
            })}
          {type === 'prices' &&
            pricesContent?.map((filter) => {
              return (
                <li key={filter.id} className={type}>
                  <button
                    type="button"
                    onClick={(e) => {
                      updateLocalFilter(filter.price)
                      updateFilters(
                        filter.price,
                        e.currentTarget.lastElementChild,
                      )
                    }}
                  >
                    <small>{filter.price}</small>
                    <CheckBoxButton />
                  </button>
                </li>
              )
            })}
        </ul>
      </AsideOptions>
    </div>
  )
}
