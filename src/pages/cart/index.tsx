import { Minus, Plus, X } from 'phosphor-react'
import {
  Container,
  MainContent,
  CartContent,
  BillContent,
  Product,
  Description,
  QuantityControl,
  MobileHead,
} from './styles'
import Image from 'next/image'
import productEx from '../../assets/product-ex4.png'
import { useContext, useMemo } from 'react'
import { CartContext } from '@/contexts/CartContext'
import realFormatter from '@/utils/realFormatter'
import Link from 'next/link'

export default function Cart() {
  const {
    products,
    removeProduct,
    decreaseAmountByOne,
    increaseAmountByOne,
    quantityItems,
  } = useContext(CartContext)

  const isEmptyCart = products.length === 0

  const subtotal = useMemo(() => {
    return realFormatter(
      products.reduce<number>((acum, prev) => {
        return acum + Number(prev.quantity) * prev.price
      }, 0),
    )
  }, [products])

  return (
    <Container>
      {isEmptyCart ? <h1>O seu carrinho está vazio</h1> : <h1>Seu Carrinho</h1>}
      <MainContent>
        {isEmptyCart ? (
          <Link href={'/products'}>
            Clique aqui para ver os nossos produtos!
          </Link>
        ) : (
          <>
            <CartContent>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      <p>Quantidade</p>
                    </th>
                    <th>
                      <p>Preço Unitário</p>
                    </th>
                    <th>
                      <p>Preço Total</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    return (
                      <tr
                        key={
                          product.productColorId + '-' + product.selectedSize
                        }
                      >
                        <td>
                          <Product>
                            <div>
                              <button onClick={() => removeProduct(product)}>
                                <X />
                              </button>
                              <Image
                                src={product.imagesSrc[0].src}
                                alt=""
                                width={110}
                                height={140}
                              />
                            </div>
                            <Description>
                              <h4>{product.name}</h4>
                              <p>
                                Color: <span>{product.colorName}</span>
                              </p>
                              {product.selectedSize && (
                                <p>
                                  Tamanho: <span>{product.selectedSize}</span>
                                </p>
                              )}
                            </Description>
                          </Product>
                        </td>
                        <td>
                          <MobileHead>Quantidade</MobileHead>
                          <QuantityControl>
                            <button
                              type="button"
                              onClick={() => decreaseAmountByOne(product)}
                            >
                              <Minus />
                            </button>
                            <p>{product.quantity}</p>
                            <button
                              type="button"
                              onClick={() => increaseAmountByOne(product)}
                            >
                              <Plus />
                            </button>
                          </QuantityControl>
                        </td>
                        <td>
                          <MobileHead>Preço unitário</MobileHead>
                          <p>{realFormatter(product.price)}</p>
                        </td>
                        <td>
                          <MobileHead>Preço total</MobileHead>

                          <p>
                            {realFormatter(
                              product.price * Number(product.quantity),
                            )}
                          </p>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CartContent>
            <BillContent>
              <h2>Resumo dos pedidos</h2>
              <p>{quantityItems} items no total</p>

              <div>
                <p>Preço total estimado </p>
                <p>{subtotal}</p>
              </div>

              <button>Ir para o checkout</button>
            </BillContent>
          </>
        )}
      </MainContent>
    </Container>
  )
}
