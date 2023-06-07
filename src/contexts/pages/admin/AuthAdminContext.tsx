import { recoverUserInformation, signInRequest } from '@/services/auth'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { api } from '@/lib/api'
import { v4 } from 'uuid'

interface AuthAdminProviderProps {
  children: ReactNode
}

type SignInData = {
  email: string
  password: string
}

type User = {
  name: string
  email: string
  avatar_url: string
}

interface AuthContextDatas {
  isAuthenticated: boolean
  user: User | null
  signIn: ({ email, password }: SignInData) => Promise<void>
}

export const AuthAdminContext = createContext<AuthContextDatas>(
  {} as AuthContextDatas,
)

export function AuthAdminProvider({ children }: AuthAdminProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({ email, password })

    setCookie(undefined, 'nextauth-admin-token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
      path: '/',
    })

    api.defaults.headers.Authorization = `Bearer ${token}`

    setUser(user)

    router.push('/admin/home/carrousel')
  }

  useEffect(() => {
    const { 'nextauth-admin-token': token } = parseCookies()

    if (token) {
      recoverUserInformation().then((response) => setUser(response.user))
    }
  }, [])

  return (
    <AuthAdminContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthAdminContext.Provider>
  )
}
