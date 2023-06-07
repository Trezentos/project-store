import React, { ReactNode, useContext } from 'react'
import { FormContainer, Input, Button } from './styles'
import { AuthAdminContext } from '@/contexts/pages/admin/AuthAdminContext'

export default function LoginForm() {
  const { signIn } = useContext(AuthAdminContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn({
      email: 'gustavofagundes1998@hotmail.com',
      password: '1234',
    })
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Input type="text" placeholder="Usuário" />
      <Input type="password" placeholder="Senha" />
      <Button type="submit">Entrar</Button>
    </FormContainer>
  )
}

LoginForm.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}
