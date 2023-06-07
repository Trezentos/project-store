import axios from 'axios'
import { parseCookies } from 'nookies'

export const getAPIClient = (ctx: any) => {
  const { 'nextauth-admin-token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
  })

  api.interceptors.request.use((config) => {
    return config
  })

  if (token) {
    api.defaults.headers.Authorizations = `Bearer ${token}`
  }

  return api
}
