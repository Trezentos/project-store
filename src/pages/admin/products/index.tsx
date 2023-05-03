import { ReactNode } from 'react'

export default function Products() {
  return (
    <>
      <h1>Products</h1>
    </>
  )
}

Products.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}
