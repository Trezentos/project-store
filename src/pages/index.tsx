import { HighlightsProducts, HomeContanier } from '@/styles/home'
import Image from 'next/image'
import Carrousel from '../components/Carrousel'
import FImage1 from '../assets/featuredProdutcs/1.jpg'
import FImage2 from '../assets/featuredProdutcs/2.jpg'
import FeaturedProducts from '@/components/FeaturedProducts'

export default function Home() {
  return (
    <HomeContanier>
      <Carrousel />
      <HighlightsProducts>
        <div>
          <Image src={FImage1} alt="" fill />
          <button>Shop This</button>
        </div>
        <div>
          <Image src={FImage2} alt="" fill />
          <button>Shop This</button>
        </div>
      </HighlightsProducts>
      <FeaturedProducts />
    </HomeContanier>
  )
}
