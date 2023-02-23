import Image, { StaticImageData } from 'next/image'
import {
  ImageContainer,
  MobileContent,
  SubMobileContent as SubMobileOptions,
  SubULNavigation,
  SubUlsNavigationsContainer,
  ULNavigation,
} from './styles'
import LogoImg from '../../../../assets/logo2.png'
import { CaretLeft, CaretRight, X } from 'phosphor-react'

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
  const openSubItems = function (e: HTMLElement | null) {
    e?.parentElement?.lastElementChild?.classList.toggle('active')
  }
  const closeSubItems = function () {
    const allSubItems = document.querySelectorAll('.sub-header')
    allSubItems.forEach((item) => item.classList.remove('active'))
  }

  return (
    <ULNavigation mobileHeaderActive={mobileHeaderActive}>
      <MobileContent>
        <button
          type="submit"
          onClick={() => {
            toggleMobileHeader()
          }}
        >
          <X size={20} />
        </button>
        <Image src={LogoImg} alt="" width={206} height={52} />
      </MobileContent>

      {headerContents.map((content) => {
        const { featuredImg, subnavigation } = content
        return (
          <li key={content.name}>
            {(subnavigation && (
              <>
                <button
                  onClick={(e) => {
                    openSubItems(e.currentTarget)
                  }}
                >
                  {content.name}
                  <CaretRight size={24} />
                </button>
                <a href="" className="desktop">
                  {content.name}
                </a>
              </>
            )) || <a>{content.name}</a>}
            {subnavigation && (
              <SubUlsNavigationsContainer className="sub-header">
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
                  <h2>{content.name}</h2>
                  <button type="button" onClick={(e) => closeSubItems()}>
                    <CaretLeft size={20} />
                    Voltar
                  </button>
                </SubMobileOptions>
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
