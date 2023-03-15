import { FilterContext } from '@/contexts/pages/products/FilterContext'
import { Minus, Plus } from 'phosphor-react'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
}

export function Filter({ type, colorContent }: FilterProps) {
  const asideOptionRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const { updateLocalFilter, selectedFilters, clearLocalFilters, mainTitle } =
    useContext(FilterContext)

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

  const selectedLocalOptions = useMemo(
    () => selectedFilters.filter((item) => item.type === type),
    [selectedFilters, type],
  )

  return (
    <div>
      <AsideHeader>
        <button onClick={() => expandAccordion()}>
          <h3>{mainTitle(type)}</h3>
          <div>
            {selectedLocalOptions.length > 0 && (
              <small
                onClick={(e) => {
                  e.stopPropagation()
                  clearLocalFilters(type)
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
                <li key={filter.id} className={type} value={filter.color}>
                  <button
                    type="button"
                    onClick={(e) => {
                      updateLocalFilter({
                        value: filter.color,
                        type: 'colors',
                      })
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
                <li key={filter.id} className={type} value={filter.size}>
                  <button
                    type="button"
                    onClick={(e) => {
                      updateLocalFilter({
                        value: filter.size,
                        type: 'sizes',
                      })
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
                <li key={filter.id} className={type} value={filter.price}>
                  <button
                    type="button"
                    onClick={(e) => {
                      updateLocalFilter({
                        value: filter.price,
                        type: 'prices',
                      })
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
