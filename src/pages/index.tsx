import {
  HighlightsProducts,
  HomeContanier,
  HighlightImage,
  NewsletterContainer,
} from '@/styles/home'
import Image from 'next/image'
import Carrousel from '../components/Pages/Home/Carrousel'
import FImage3 from '../assets/home/bikini-girl-desktop.jpg'
import FImage4 from '../assets/home/bikini-girl-mobile.jpg'
import FeaturedProducts from '@/components/Pages/Home/FeaturedProducts'
import axios from 'axios'
import { GetServerSideProps, GetStaticProps } from 'next'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
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
import { MainBackgroundItem } from '@/contexts/pages/admin/home/MainBackgroundHomeContext'
import { HighlightItem } from '@/contexts/pages/admin/home/HighlightProductsContext'
import { CarrouselItem } from '@/components/admin/Home/CarrouselForm'

interface CarrousselImage {
  id: string
  desktopLink: string
  mobileLink: string
  active: boolean
}
interface HomeProps {
  instagramPhotos: InstagramPostProps[]
  carrousselsFromApi: CarrousselImage[]
  HighLightItem: HighlightItem
  backgroundHome: MainBackgroundItem
}

export default function Home({
  instagramPhotos,
  carrousselsFromApi,
  HighLightItem,
  backgroundHome,
}: HomeProps) {
  return (
    <HomeContanier>
      {carrousselsFromApi.length > 0 && (
        <Carrousel carrousselsFromApi={carrousselsFromApi} />
      )}

      <HighlightsProducts>
        <div>
          <Image
            src={HighLightItem.image1Link}
            alt=""
            fill
            sizes="100%, 100%"
          />
          <button>Shop This</button>
        </div>
        <div>
          <Image
            src={HighLightItem.image2Link}
            alt=""
            fill
            sizes="100%, 100%"
          />
          <button>Shop This</button>
        </div>
      </HighlightsProducts>
      {/* <FeaturedProducts /> */}
      <HighlightImage>
        <Image
          src={backgroundHome.desktopLink}
          alt=""
          className="desktop"
          fill
          sizes="100vw, 100vh"
        />
        <Image
          src={backgroundHome.mobileLink}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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

    const { data: carrousselData } = await api.get<CarrouselItem[]>(
      '/home/get-carrousel',
    )

    const { data: HighLightItem } = await api.get<HighlightItem[]>(
      '/home/highlight-images/get-hightlight-images',
    )

    const carrousselsFromApi = carrousselData
      .map((item) => ({
        id: item.id,
        desktopLink: item.desktopLink,
        mobileLink: item.mobileLink,
        active: item.active,
      }))
      .filter((item: any) => item.active)

    const { data: backgroundHome } = await api.get<MainBackgroundItem>(
      '/home/main-background-home/get-background-item',
    )

    return {
      props: {
        instagramPhotos,
        carrousselsFromApi,
        HighLightItem,
        backgroundHome,
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
