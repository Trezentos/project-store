import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'nextauth-admin-token': token } = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

api.interceptors.request.use((config) => {
  return config
})

if (token) {
  api.defaults.headers.Authorizations = `Bearer ${token}`
}
