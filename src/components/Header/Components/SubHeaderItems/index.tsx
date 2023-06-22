import Link from 'next/link'
import { SubUlsNavigationsContainer } from '../LinksNavigation/styles'
import SubItemsHighlightImage from './SubItemsHighlightImage'
import { SubMobileOptions, SubULNavigation } from './styles'
import { use, useContext, useEffect } from 'react'
import { HeaderContext, ISubHeaderContent } from '@/contexts/HeaderContext'
import { CaretLeft, X } from 'phosphor-react'
import { StaticImageData } from 'next/image'

interface SubHeaderItemsProps {
  headerSubItems: ISubHeaderContent[]
  headerItemId: string
}

export default function SubHeaderItems({
  headerSubItems,
  headerItemId,
}: SubHeaderItemsProps) {
  const {
    toggleMobileHeader,
    closeSubItems,
    getHeaderItemProperties,
    convertToColumns,
  } = useContext(HeaderContext)
  const headerItem = getHeaderItemProperties(headerItemId)
  const { featuredImg } = headerItem

  return (
    <SubUlsNavigationsContainer className="sub-header">
      <SubItemsHighlightImage
        imageUrl={featuredImg?.imageUrl}
        linkTo={headerItem.linkTo}
        name={headerItem.name}
      />

      <SubMobileOptions>
        <button
          type="button"
          onClick={() => {
            toggleMobileHeader()
            closeSubItems()
          }}
        >
          <X size={20} />
        </button>
        <h2>{headerItem.name}</h2>
        <button type="button" onClick={(e) => closeSubItems()}>
          <CaretLeft size={20} />
          Voltar
        </button>
      </SubMobileOptions>
      {convertToColumns(headerSubItems).map((headerSubItemColum) => (
        <SubULNavigation key={headerSubItemColum[0].name}>
          {headerSubItemColum.map((subItem) => (
            <li key={subItem.name}>
              <Link
                href={`/categories/${subItem.linkTo}`}
                onClick={() => toggleMobileHeader()}
                className={subItem.isHighlighted ? 'highlighted-item' : ''}
              >
                {subItem.name}
              </Link>
            </li>
          ))}
        </SubULNavigation>
      ))}
    </SubUlsNavigationsContainer>
  )
}
