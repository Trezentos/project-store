import Image from 'next/image'
import { HeaderMobile, ULNavigation } from './styles'
import LogoImg from '../../../../assets/logo2.png'
import { useContext } from 'react'
import { HeaderContext } from '@/contexts/HeaderContext'
import CloseHeaderMobileButton from '../CloseHeaderMobileButton'
import HeaderItem from '../HeaderItem'
import SubHeaderItems from '../SubHeaderItems'

export default function LinksNavigation() {
  const { mobileHeaderActive, headerContent } = useContext(HeaderContext)

  return (
    <ULNavigation mobileHeaderActive={mobileHeaderActive}>
      <HeaderMobile>
        <CloseHeaderMobileButton />
        <Image src={LogoImg} alt="" width={206} height={52} />
      </HeaderMobile>

      {headerContent.map((headerItem) => {
        const { headerSubItems } = headerItem
        return (
          <li key={headerItem.id}>
            <HeaderItem linkTo={encodeURI(headerItem.linkTo ?? '')}>
              {headerItem.name}
            </HeaderItem>
            {headerSubItems?.[0] && (
              <SubHeaderItems
                headerSubItems={headerSubItems}
                headerItemId={headerItem.id}
              />
            )}
          </li>
        )
      })}
      <li>
        <HeaderItem isNotCategory linkTo={'instashop'}>
          Instashop
        </HeaderItem>
      </li>
    </ULNavigation>
  )
}
