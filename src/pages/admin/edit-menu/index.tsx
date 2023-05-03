import { ReactNode } from 'react'

export default function product() {
  return (
    <>
      <h1>Edit menu</h1>
    </>
  )
}

product.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}
