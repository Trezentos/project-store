import { Container } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import Link from 'next/link'

const registerFormSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z.string(),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

function Login() {
  const router = useRouter()

  async function handleRegister(data: RegisterFormData) {
    try {
      console.log(data)

      //   await api.post('/users', {
      //     name: data.name,
      //     username: data.username,
      //   })
    } catch (error: any) {
      console.log(error.message)
      if (error instanceof AxiosError && error.response?.data.message) {
        alert(error.response?.data.message)
        return
      }

      console.error(error)
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  return (
    <Container>
      <header>
        <h1>Redefina a sua senha!</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <label>
            <h1>Email</h1>
            <input {...register('email')} />

            {errors.email && <label>{errors.email.message}</label>}
          </label>

          <button type="submit" disabled={isSubmitting}>
            Entrar <ArrowRight />
          </button>
          <Link href={'/login'}>Cancelar</Link>
        </form>
      </div>
    </Container>
  )
}

export default Login
