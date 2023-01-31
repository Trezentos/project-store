import { ReactNode } from 'react'

export default function Admin() {
  return (
    <>
      <h1>header do admin</h1>
      <h1>Admin</h1>
    </>
  )
}

Admin.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}
