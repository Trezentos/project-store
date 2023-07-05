import crypto from 'node:crypto'

export default function generateRandomString(size: number) {
  return crypto.randomBytes(size).toString('hex').slice(0, size)
}
