import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import bcrypt from 'bcryptjs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
    // pra setar que nada vai dar certo além de post
  }

  const { name, username, email, password } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    return res.status(400).json({
      message: 'Username already exists',
    })
  }

  const salt = await bcrypt.genSalt(10)

  const cryptedPass = await bcrypt.hash(password, salt)

  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: cryptedPass,
    },
  })

  setCookie({ res }, '@store-commerce:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  })

  return res.status(201).json(user)
}
