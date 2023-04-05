import { CartContext } from '@/contexts/CartContext'
import Image from 'next/image'
import { Minus, Plus, X } from 'phosphor-react'
import { useContext, useMemo, useState } from 'react'
import Product from './ProductCart'
import { Cart, Overlay, Header, ProductsContent, Footer } from './styles'
import realFormatter from '@/utils/realFormatter'

function Cartside() {
  const { open, closeCart, products } = useContext(CartContext)

  const subtotal = useMemo(() => {
    return products.reduce<number>((acum, prev) => {
      return acum + Number(prev.quantity) * prev.price
    }, 0)
  }, [products])

  return (
    <>
      <Overlay showOverlay={open} onClick={closeCart} />
      <Cart openCart={open}>
        <Header>
          <button type="button" onClick={closeCart}>
            <X />
          </button>
          <h2>Seu Carrinho</h2>
        </Header>
        <ProductsContent>
          {products.map((product) => (
            <Product
              key={`${product.productColorId}-${product.selectedSize ?? ''}`}
              product={product}
            />
          ))}
          {products.length === 0 && <h3>Seu carrinho está vazio</h3>}
        </ProductsContent>
        <Footer>
          <div>
            <h4>Subtotal</h4>
            <h4>{realFormatter(subtotal)}</h4>
          </div>
          <button>Ir para o checkout</button>
        </Footer>
      </Cart>
    </>
  )
}

export default Cartside
