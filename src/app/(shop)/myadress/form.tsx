'use client'
import { Adress } from '@/types'
import { Input, Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { useFormState, useFormStatus } from 'react-dom'
import { AddOrUpdateUserAdress } from '@/actions'
import { User } from 'lucia'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SaveIcon from '@/components/ui/icons/SaveIcon'
import { Toaster } from 'react-hot-toast'
import { toast } from '@/lib/utils'

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
  const [state, formAction] = useFormState(AddOrUpdateUserAdress.bind(null, user.userId), undefined)

  useEffect(() => {
    const checkState = () => {
      if (state?.success) {
        if (callbackUrl) {
          router.replace(`/${callbackUrl}`)
        }
        toast.success('Adress saved')
      }
      if (state?.error) toast.error(state.error)
    }
    checkState()
  }, [state, callbackUrl, router])

  return (
    <>
      <Toaster position="bottom-center" />
      <form action={formAction}>
        <section className="grid grid-cols-2 gap-2 my-2">
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
            inputMode="email"
            type="text"
            label="Email"
            name="email"
            autoComplete="off"
            defaultValue={adress?.email}
          />
          <Input
            inputMode="tel"
            type="text"
            label="Phone"
            name="phone"
            maxLength={8}
            placeholder="12345678"
            autoComplete="off"
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
            disableAutosize
            autoComplete="off"
            className="col-span-2 sm:col-auto sm:col-end-2"
            defaultValue={adress?.info?.toString()}
          />
        </section>
        <SaveAdress callbackUrl={callbackUrl} />
      </form>
    </>
  )
}

function SaveAdress({ callbackUrl }: { callbackUrl: string }) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      color="primary"
      isLoading={pending}
      startContent={!pending && <SaveIcon />}>
      {callbackUrl ? 'Continue shopping' : 'Save Adress'}
    </Button>
  )
}
