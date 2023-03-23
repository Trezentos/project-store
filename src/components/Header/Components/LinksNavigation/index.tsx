import Image, { StaticImageData } from 'next/image'
import {
  ImageContainer,
  MobileContent,
  SubMobileOptions,
  SubULNavigation,
  SubUlsNavigationsContainer,
  ULNavigation,
} from './styles'
import LogoImg from '../../../../assets/logo2.png'
import { CaretLeft, CaretRight, X } from 'phosphor-react'
import { useContext } from 'react'
import { HeaderContext } from '@/contexts/HeaderContext'
import Link from 'next/link'

export default function LinksNavigation() {
  const { toggleMobileHeader, mobileHeaderActive, headerContents } =
    useContext(HeaderContext)

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
                <Link
                  onClick={() => toggleMobileHeader()}
                  href="/products"
                  className="desktop"
                >
                  {content.name}
                </Link>
              </>
            )) || (
              <Link
                onClick={() => toggleMobileHeader()}
                href={content.link ?? '/products'}
              >
                {content.name}
              </Link>
            )}
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
                        <Link
                          href="/products"
                          onClick={() => toggleMobileHeader()}
                        >
                          {liItem.name}
                        </Link>
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
