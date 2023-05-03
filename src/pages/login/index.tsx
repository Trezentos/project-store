import { Container } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import Link from 'next/link'
import { signIn, useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'

const registerFormSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z.string().min(2, { message: 'Insira uma senha' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

function Login() {
  const router = useRouter()
  const { status } = useSession()

  async function handleLogin(data: RegisterFormData) {
    try {
      await signIn()

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
  async function connectGoogle() {
    try {
      await signIn('google')
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/profile')
    }
  }, [router, status])

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
        <h1>Entre na sua conta!</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <label>
            <h1>Email</h1>
            <input {...register('email')} />
            {errors.email && <label>{errors.email.message}</label>}
          </label>

          <label>
            <h1>Senha</h1>
            <input {...register('password')} />
            {errors.password && <label>{errors.password.message}</label>}
          </label>

          <button type="submit" disabled={isSubmitting}>
            Entrar <ArrowRight />
          </button>
          <Link href={'/forgot-password'}>Esqueci a minha senha</Link>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => connectGoogle()}
            className="google-button"
          >
            Conectar com a conta do Google <ArrowRight />
          </button>
        </form>
      </div>
    </Container>
  )
}

export default Login
