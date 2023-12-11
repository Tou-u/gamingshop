'use server'
import { auth, getPageSession } from '@/auth/lucia'
import { AuthSchema } from './schema'
import * as context from 'next/headers'
import { LuciaError } from 'lucia'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const Login = async (prev: any, formData: FormData) => {
  const form = Object.fromEntries(formData.entries())
  const response = AuthSchema.safeParse(form)

  if (!response.success) {
    const { errors } = response.error
    return { error: errors[0].message }
  }

  const { username, password } = response.data

  try {
    const key = await auth.useKey('username', username, password)
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {}
    })
    const authRequest = auth.handleRequest('POST', context)
    authRequest.setSession(session)
    return redirect('/')
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
    ) {
      return { error: 'Incorrect username or password' }
    }
    return { error: 'An unknown error occurred' }
  }
}

export const Register = async (prev: any, formData: FormData) => {
  const form = Object.fromEntries(formData.entries())
  const response = AuthSchema.safeParse(form)

  if (!response.success) {
    const { errors } = response.error
    return { error: errors[0].message }
  }

  const { username, password } = response.data

  try {
    const user = await auth.createUser({
      key: {
        providerId: 'username',
        providerUserId: username,
        password
      },
      attributes: {
        username,
        role: 'guest'
      }
    })
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    })
    const authRequest = auth.handleRequest('POST', context)
    authRequest.setSession(session)
    return redirect('/')
  } catch (e) {
    if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
      return { error: 'Username already taken' }
    }
    return { error: 'An unknown error occurred' }
  }
}

export const Logout = async () => {
  const authRequest = auth.handleRequest('POST', context)
  const session = await authRequest.validate()
  if (!session) return
  await auth.invalidateSession(session.sessionId)
  authRequest.setSession(null)
  redirect('/')
}
