import { Container, MainContent, CartContent, BillContent } from './styles'

export default function Cart() {
  return (
    <Container>
      <h1>O seu carrinho</h1>
      <MainContent>
        <CartContent>
          <table>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Preço Total</th>
            </tr>
            <tr>
              <td>Exemplo de produto 1</td>
              <td>1</td>
              <td>R$ 200,00</td>
              <td>R$ 200,00</td>
            </tr>
            <tr>
              <td>Exemplo de produto 1</td>
              <td>2</td>
              <td>R$ 200,00</td>
              <td>R$ 400,00</td>
            </tr>
          </table>
        </CartContent>
        <BillContent>
          <p>300 reais</p>
        </BillContent>
      </MainContent>
    </Container>
  )
}
