import Image, { StaticImageData } from 'next/image'
import {
  ImageContainer,
  MobileContent,
  SubULNavigation,
  SubUlsNavigationsContainer,
  ULNavigation,
} from './styles'
import LogoImg from '../../../../assets/logo2.png'
import { X } from 'phosphor-react'
export interface IHeaderContent {
  name: string
  featuredImg?: {
    name: string
    imageUrl: StaticImageData
  }
  subnavigation?: {
    name: string
  }[][]
}

interface LinksNavigationProps {
  headerContents: IHeaderContent[]
  mobileHeaderActive: boolean
  toggleMobileHeader: () => void
}

export default function LinksNavigation({
  headerContents,
  mobileHeaderActive,
  toggleMobileHeader,
}: LinksNavigationProps) {
  return (
    <ULNavigation mobileHeaderActive={mobileHeaderActive}>
      <MobileContent>
        <button type="submit" onClick={() => toggleMobileHeader()}>
          <X size={20} />
        </button>
        <Image src={LogoImg} alt="" width={206} height={52} />
      </MobileContent>

      {headerContents.map((content) => {
        const { featuredImg, subnavigation } = content
        return (
          <li key={content.name}>
            <a>{content.name}</a>
            {subnavigation && (
              <SubUlsNavigationsContainer>
                {featuredImg && (
                  <ImageContainer>
                    <Image
                      src={featuredImg.imageUrl}
                      alt=""
                      height={350}
                      width={250}
                    />
                    <p>{featuredImg.name}</p>
                  </ImageContainer>
                )}

                {subnavigation.map((ulItem) => (
                  <SubULNavigation key={ulItem[0].name}>
                    {ulItem.map((liItem) => (
                      <li key={liItem.name}>
                        <a>{liItem.name}</a>
                      </li>
                    ))}
                  </SubULNavigation>
                ))}
              </SubUlsNavigationsContainer>
            )}
          </li>
        )
      })}
    </ULNavigation>
  )
}
