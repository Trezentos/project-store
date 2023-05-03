import { Container } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useSession } from 'next-auth/react'

const registerFormSchema = z
  .object({
    name: z.string().min(5, {
      message: 'O nome precisa ter pelo menos 5 letras',
    }),
    username: z
      .string()
      .min(5, {
        message: 'O sobrenome precisa ter pelo menos 5 letras',
      })
      .transform((username) => username.toLowerCase()),
    email: z.string().email({ message: 'Insira um e-mail válido' }),
    password: z.string().min(7, {
      message: 'A senha precisa ter pelo menos 7 letras',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerFormSchema>

function Register() {
  const session = useSession()

  console.log(session)

  async function handleRegister(data: RegisterFormData) {
    try {
      console.log(data)

      await api.post('/users', {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      })
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
        <h1>Crie a sua conta!</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <label>
            <h1>Nome</h1>
            <input {...register('name')} />

            {errors.name && <label>{errors.name.message}</label>}
          </label>

          <label>
            <h1>Sobrenome</h1>
            <input {...register('username')} />
            {errors.username && <label>{errors.username.message}</label>}
          </label>
          <label>
            <h1>Email</h1>
            <input type="email" {...register('email')} />
            {errors.email && <label>{errors.email.message}</label>}
          </label>
          <label>
            <h1>Senha</h1>
            <input type="password" {...register('password')} />
            {errors.password && <label>{errors.password.message}</label>}
          </label>
          <label>
            <h1>Confirmar senha</h1>
            <input type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && (
              <label>{errors.confirmPassword.message}</label>
            )}
          </label>

          <button type="submit" disabled={isSubmitting}>
            Criar conta <ArrowRight />
          </button>
        </form>
      </div>
    </Container>
  )
}

export default Register
