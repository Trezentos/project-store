import {
  HighlightsProducts,
  HomeContanier,
  HighlightImage,
  InstagramContainer,
} from '@/styles/home'
import Image from 'next/image'
import Carrousel from '../components/Carrousel'
import FImage1 from '../assets/highlightsProducts/1.jpg'
import FImage2 from '../assets/highlightsProducts/2.jpg'
import FImage3 from '../assets/home/bikini-girl-desktop.jpg'
import FImage4 from '../assets/home/bikini-girl-mobile.jpg'
import FeaturedProducts from '@/components/FeaturedProducts'
import { useCallback, useEffect } from 'react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import InstagramSession from '@/components/Pages/Home/InstagramPhotos'

interface HomeProps {
  instagramPhotos: {
    imageSrc: string
  }[]
}

export default function Home(props: HomeProps) {
  const { instagramPhotos } = props
  console.log(props)

  return (
    <HomeContanier>
      <Carrousel />
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
      <FeaturedProducts />
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

      <InstagramSession instagramPhotos={instagramPhotos} />
    </HomeContanier>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fields = 'media_url, media_type'

  const url = `https://graph.instagram.com/me/media?access_token=${process.env.NEXT_INSTA_TOKEN}&fields=${fields}`

  const {
    data: { data },
  } = await axios.get(url)

  const instagramPhotos = data
    .map((item: any) => ({
      imageSrc: item.media_url,
    }))
    .filter((item: any) => !String(item.imageSrc).includes('video'))

  return {
    props: {
      instagramPhotos,
    },
  }
}
