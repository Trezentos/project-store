import { HeaderContext } from '@/contexts/HeaderContext'
import Link from 'next/link'
import { CaretRight, X } from 'phosphor-react'
import { ReactNode, useContext } from 'react'
import {
  DesktopLink,
  MobileItemButtonExpandItems,
  MobileLinkTo,
} from './styles'

interface HeaderItemProps {
  linkTo?: string
  children: string
  isNotCategory?: boolean
}

export default function HeaderItem({
  linkTo,
  children: headerNameItem,
  isNotCategory = false,
}: HeaderItemProps) {
  const {
    openSubItems,
    toggleMobileHeader,
    isExpansibleHeaderItem: isExpansible,
  } = useContext(HeaderContext)
  const hrefLink = isNotCategory ? `/${linkTo}` : `/categories/${linkTo}`

  const MobileLink = () => {
    // There are two kind of button in this header
    // MobileItemButtonExpandItems => Open the subNavigation items
    // MobileLinkTo => Redirect to selected link

    return isExpansible(headerNameItem) ? (
      <MobileItemButtonExpandItems
        onClick={(e) => {
          openSubItems(e.currentTarget)
        }}
      >
        {headerNameItem}
        <CaretRight size={24} />
      </MobileItemButtonExpandItems>
    ) : (
      <MobileLinkTo onClick={() => toggleMobileHeader()} href={hrefLink}>
        {headerNameItem}
      </MobileLinkTo>
    )
  }

  return (
    <>
      <MobileLink />
      <DesktopLink
        onClick={() => toggleMobileHeader()}
        href={hrefLink}
        className="desktop"
      >
        {headerNameItem}
      </DesktopLink>
    </>
  )
}
