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
  }[]
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
        const { featuredImg } = content
        return (
          <li key={content.name}>
            <a>{content.name}</a>
            {content.subnavigation && (
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
                <SubULNavigation>
                  {content.subnavigation.map((subContent) => (
                    <li key={subContent.name}>
                      <a>{subContent.name}</a>
                    </li>
                  ))}
                </SubULNavigation>
              </SubUlsNavigationsContainer>
            )}
          </li>
        )
      })}
    </ULNavigation>
  )
}
