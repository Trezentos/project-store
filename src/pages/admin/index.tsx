import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Admin() {
  const router = useRouter()

  useEffect(() => {
    router.push('admin/home/carrousel')
  }, [router])

  return (
    <>
      <h1>Painel Admin</h1>
    </>
  )
}

Admin.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}
