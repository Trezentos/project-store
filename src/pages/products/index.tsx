import { InstagramContext } from '@/context/instagramContext'
import { useContext } from 'react'

export default function Products() {
  const { instagramMedias: instainsta } = useContext(InstagramContext)
  console.log(instainsta)

  return <pre>{JSON.stringify(instainsta)}</pre>
}
