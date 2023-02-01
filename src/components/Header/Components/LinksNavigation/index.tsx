import Image, { StaticImageData } from 'next/image'
import {
  ImageContainer,
  SubULNavigation,
  SubUlsNavigationsContainer,
  ULNavigation,
} from './styles'

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
}

export default function LinksNavigation({
  headerContents,
}: LinksNavigationProps) {
  return (
    <ULNavigation>
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
