import SiteAdvantageBlock from '@/components/Pages/Home/SiteAdvantagesBlock'
import AccordeonDetail from '@/components/Pages/IndividualProduct/AccordeonDetail'
import ImagesSlider from '@/components/Pages/IndividualProduct/ImagesSlider'
import PropertiesProduct from '@/components/Pages/IndividualProduct/PropertiesProduct'
import prisma from '@/lib/prisma'
import { IProduct } from '@/pages/api/product'
import realFormatter from '@/utils/realFormatter'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

import {
  Breadcrumb,
  Container,
  ProductProperties,
  MainContent,
} from '../../../styles/individualProduct'

interface IndividualProductProps {
  product: IProduct
}

export default function IndividualProduct({ product }: IndividualProductProps) {
  const sizeOptions = ['PP', 'P', 'M', 'G', 'GG']
  const colorOptions = ['deepskyblue', 'crimson', 'purple', 'orange', 'pink']

  return (
    <Container>
      <Breadcrumb>
        <Link href={'/'}>Compras</Link>
        <p>Sapatos</p>
      </Breadcrumb>

      <MainContent>
        <ImagesSlider images={product.imagesSrc} />
        <ProductProperties>
          <h2>{product.name}</h2>
          <h5>{realFormatter(product.price)}</h5>
          <PropertiesProduct type="color" content={colorOptions} />
          <PropertiesProduct type="size" content={sizeOptions} />
          <Link href={'/sizes'}>Consultar tamanhos</Link>
          <button type="button">Adicionar ao Carrinho</button>

          <AccordeonDetail bodyText={product.description} />
        </ProductProperties>
      </MainContent>
      <SiteAdvantageBlock />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'prod_NGvZrRoxLoQDyx',
          color: 'purple',
        },
      },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const selectedProduct = await prisma.product.findFirst({
    where: {
      id: '1a611423-2760-43e3-9b61-622bf1a7ebf5',
    },
  })

  const productImages = await prisma.image.findMany({
    where: {
      product_id: '1a611423-2760-43e3-9b61-622bf1a7ebf5',
    },
  })

  console.log(productImages)

  const product = {
    id: selectedProduct?.id,
    name: selectedProduct?.name,
    description: selectedProduct?.description,
    price: selectedProduct?.price,
    color: selectedProduct?.color,
    size: selectedProduct?.size,
    imagesSrc: productImages.map((item) => ({
      id: String(item.id),
      src: String(item.imageSrc),
    })),
  }

  return {
    props: { product },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
