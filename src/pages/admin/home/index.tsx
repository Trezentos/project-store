import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('home/carrousel')
  }, [router])

  return <div>Home</div>
}

export default Home
