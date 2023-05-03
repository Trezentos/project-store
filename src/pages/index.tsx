import {
  HighlightsProducts,
  HomeContanier,
  HighlightImage,
  NewsletterContainer,
} from '@/styles/home'
import Image from 'next/image'
import Carrousel from '../components/Pages/Home/Carrousel'
import FImage1 from '../assets/highlightsProducts/1.jpg'
import FImage2 from '../assets/highlightsProducts/2.jpg'
import FImage3 from '../assets/home/bikini-girl-desktop.jpg'
import FImage4 from '../assets/home/bikini-girl-mobile.jpg'
import FeaturedProducts from '@/components/Pages/Home/FeaturedProducts'
import axios from 'axios'
import { GetStaticProps } from 'next'
import InstagramSession, {
  InstagramPostProps,
} from '@/components/Pages/Home/InstagramPhotos'
import {
  InstagramContext,
  InstagramContextProvider,
} from '@/contexts/pages/home/InstagramContext'
import Newsletter from '@/components/Pages/Home/Newsletter'
import SiteAdvantageBlock from '@/components/Pages/Home/SiteAdvantagesBlock'
import { api } from '@/lib/axios'

interface CarrousselImage {
  id: string
  desktopLink: string
  mobileLink: string
}
interface HomeProps {
  instagramPhotos: InstagramPostProps[]
  carouselImages: CarrousselImage[]
}

export default function Home({ instagramPhotos, carouselImages }: HomeProps) {
  console.log(carouselImages)

  return (
    <HomeContanier>
      {carouselImages.length > 1 && (
        <Carrousel carrouselImages={carouselImages} />
      )}
      <HighlightsProducts>
        <div>
          <Image src={FImage1} alt="" fill sizes="100%, 100%" />
          <button>Shop This</button>
        </div>
        <div>
          <Image src={FImage2} alt="" fill sizes="100%, 100%" />
          <button>Shop This</button>
        </div>
      </HighlightsProducts>
      {/* <FeaturedProducts /> */}
      <HighlightImage>
        <Image
          src={FImage3}
          alt=""
          className="desktop"
          fill
          sizes="100vw, 100vh"
        />
        <Image
          src={FImage4}
          loading="lazy"
          alt=""
          fill
          sizes="100vw, 100vh"
          className="mobile"
        />
      </HighlightImage>
      <InstagramContextProvider>
        <InstagramSession instagramMedias={instagramPhotos} />
      </InstagramContextProvider>

      <SiteAdvantageBlock />
      <NewsletterContainer>
        <h1>
          Não perca nenhuma novidade de promoções semanais das nossas vendas
        </h1>
        <Newsletter />
      </NewsletterContainer>
    </HomeContanier>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const fields = 'media_url, media_type, caption, timestamp'
    const url = `https://graph.instagram.com/me/media?access_token=${process.env.NEXT_INSTA_TOKEN}&fields=${fields}`

    const {
      data: { data },
    } = await axios.get(url)

    const instagramPhotos = data
      .map((item: any) => ({
        imageSrc: item.media_url,
        description: item.caption,
        id: item.id,
        timestamp: item.timestamp,
      }))
      .filter((item: any) => !String(item.imageSrc).includes('video'))

    const { data: carrousselData } = await api.get('/home/get-carrousel')

    const carouselImages = carrousselData.map((item: any) => ({
      id: item.id,
      desktopLink: item.desktopLink,
      mobileLink: item.mobileLink,
    }))

    return {
      props: {
        instagramPhotos,
        carouselImages,
      },
    }
  } catch (error) {
    console.log(error)

    return {
      props: {
        instagramPhotos: [],
      },
    }
  }
}
