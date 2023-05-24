import { ReactNode } from 'react'
import { Container } from './styles'

export default function product() {
  return (
    <Container>
      <h1>Editar Header</h1>
    </Container>
  )
}

product.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}
