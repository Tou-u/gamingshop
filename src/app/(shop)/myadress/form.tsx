'use client'
import { Adress } from '@/types'
import { Input, Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { useFormState, useFormStatus } from 'react-dom'
import { AddUserAdress } from '@/actions'
import { User } from 'lucia'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Form({
  adress,
  user,
  callbackUrl
}: {
  adress: Adress | null
  user: User
  callbackUrl: string
}) {
  const router = useRouter()
  const [state, formAction] = useFormState(AddUserAdress.bind(null, user.userId), undefined)

  useEffect(() => {
    const checkState = () => {
      if (state?.success) {
        if (callbackUrl) {
          router.replace(`/${callbackUrl}`)
        }
      }
      // if (state?.error) toast.error(state.error)
    }
    checkState()
  }, [state, callbackUrl, router])

  return (
    <form action={formAction}>
      <section className="flex flex-col gap-3">
        <Input
          type="text"
          label="First Name"
          name="first_name"
          autoComplete="off"
          defaultValue={adress?.first_name}
        />
        <Input
          type="text"
          label="Last Name"
          name="last_name"
          autoComplete="off"
          defaultValue={adress?.last_name}
        />
        <Input
          type="text"
          label="Adress"
          name="adress"
          autoComplete="off"
          defaultValue={adress?.adress}
        />
        <Input
          type="email"
          label="Email"
          name="email"
          autoComplete="off"
          defaultValue={adress?.email}
        />
        <Input
          type="number"
          label="Phone"
          name="phone"
          placeholder="12345678"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">+569</span>
            </div>
          }
          defaultValue={adress?.phone.toString()}
        />
        <Textarea
          label="Additional Information (optional)"
          name="info"
          autoComplete="off"
          defaultValue={adress?.info?.toString()}
        />
        <SaveAdress callbackUrl={callbackUrl} />
      </section>
    </form>
  )
}

function SaveAdress({ callbackUrl }: { callbackUrl: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" isLoading={pending}>
      {callbackUrl ? 'Continue shopping' : 'Save Adress'}
    </Button>
  )
}
