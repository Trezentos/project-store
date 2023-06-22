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
}

export default function HeaderItem({
  linkTo,
  children: headerNameItem,
}: HeaderItemProps) {
  const {
    openSubItems,
    toggleMobileHeader,
    isExpansibleHeaderItem: isExpansible,
  } = useContext(HeaderContext)

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
      <MobileLinkTo
        onClick={() => toggleMobileHeader()}
        href={`/categories/${linkTo}`}
      >
        {headerNameItem}
      </MobileLinkTo>
    )
  }

  return (
    <>
      <MobileLink />
      <DesktopLink
        onClick={() => toggleMobileHeader()}
        href={`/categories/${linkTo}`}
        className="desktop"
      >
        {headerNameItem}
      </DesktopLink>
    </>
  )
}
