import { useSession, signOut } from 'next-auth/react'
import { Container, Content, TabNavigation } from './styles'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Profile() {
  const { status } = useSession()
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    await signOut()
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [router, status])

  return (
    <Container>
      <h1>Minha Conta</h1>
      <TabNavigation>
        <button>Histórico de Pedidos</button>
        <button onClick={() => handleLogout()}>Sair</button>
      </TabNavigation>
      <Content>
        <h4>Histórico de Pedidos</h4>
        <p>Você ainda não tem nenhum produto no seu histórico de compras</p>
      </Content>
    </Container>
  )
}
