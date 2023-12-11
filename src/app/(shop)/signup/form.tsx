'use client'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import NextLink from 'next/link'
import { Register } from '@/lib/actions/auth'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'

export default function Form() {
  const [error, setError] = useState<string | null>(null)
  const [state, formAction] = useFormState(Register, undefined)

  useEffect(() => {
    const checkErrors = () => {
      if (state?.error) setError(state.error)
    }

    checkErrors()
  }, [state])

  return (
    <form action={formAction} className="space-y-4 md:space-y-6">
      <Input variant="bordered" type="text" autoComplete="off" label="Username" name="username" />
      <Input variant="bordered" type="password" label="Password" name="password" />
      <SubmitButton />
      <div className="h-2">{error && <p className="text-danger-500 font-bold">{error}</p>}</div>
      <p className="text-sm font-light text-gray-400">
        Do you already have an account?
        <Link as={NextLink} href="/login" className="font-medium hover:underline pl-1">
          Sign in
        </Link>
      </p>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" color="primary" variant="shadow" isLoading={pending}>
      Sign up
    </Button>
  )
}
