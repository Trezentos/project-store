import { Container } from './styles'
import { ReactNode } from 'react'

export default function Products() {
  return (
    <Container>
      <h1>Products</h1>
    </Container>
  )
}

Products.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}
