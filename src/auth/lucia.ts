import { lucia } from 'lucia'
import { nextjs_future } from 'lucia/middleware'
import { prisma } from '@lucia-auth/adapter-prisma'
import { prisma as client } from '@/lib/prisma'
import { cache } from 'react'
import * as context from 'next/headers'

export const auth = lucia({
  adapter: prisma(client),
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false
  },
  getUserAttributes: (data) => {
    return {
      username: data.username,
      role: data.role
    }
  }
})

export type Auth = typeof auth

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest('GET', context)
  return authRequest.validate()
})
