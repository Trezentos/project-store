import Image from 'next/image'
import { Minus, Plus, X } from 'phosphor-react'
import { Container, EditButton, ProductAmount, ProductDetail } from './styles'
import { CartContext, IProductItem } from '@/contexts/CartContext'
import realFormatter from '@/utils/realFormatter'
import { useContext } from 'react'

interface ProductProps {
  product: IProductItem
}

export default function Product({ product }: ProductProps) {
  const { decreaseAmountByOne, increaseAmountByOne, removeProduct, closeCart } =
    useContext(CartContext)

  return (
    <Container>
      <button
        type="button"
        onClick={() => {
          removeProduct(product)
        }}
      >
        <X />
      </button>
      <Image src={product.imagesSrc[0].src} alt="" width={90} height={120} />
      <div>
        <ProductDetail>
          <h4>{product.name}</h4>
          <p>
            Color <span>{product.colorName}</span>
          </p>

          {product.selectedSize && (
            <p>
              Size <span>{product.selectedSize}</span>
            </p>
          )}
        </ProductDetail>
        <ProductAmount>
          <div>
            <button onClick={() => decreaseAmountByOne(product)}>
              <Minus size={18} />
            </button>
            <p>{product.quantity}</p>
            <button onClick={() => increaseAmountByOne(product)}>
              <Plus size={18} />
            </button>
          </div>
          <p>{realFormatter(Number(product.quantity) * product.price)}</p>
        </ProductAmount>
        <EditButton href="/cart" onClick={closeCart}>
          Editar
        </EditButton>
      </div>
    </Container>
  )
}
