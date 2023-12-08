'use client'
import { useEffect } from 'react'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { Button } from '@nextui-org/button'
import SaveIcon from '@/components/ui/icons/SaveIcon'
import { useFormState, useFormStatus } from 'react-dom'
import { updateOrderStage } from '@/lib/actions/dashboard'
import { toast } from '@/lib/utils'
import { Toaster } from 'react-hot-toast'

const stages = [
  { name: 'processing' },
  { name: 'processed' },
  { name: 'shipped' },
  { name: 'refund' }
]

export default function Form({ order_id, stage }: { order_id: string; stage: string }) {
  const [state, formAction] = useFormState(updateOrderStage.bind(null, order_id), undefined)

  useEffect(() => {
    const checkState = () => {
      if (state?.success) toast.success('Stage saved')
      if (state?.error) toast.error(state.error)
    }
    checkState()
  }, [state])

  return (
    <>
      <Toaster position="bottom-center" />
      <form action={formAction}>
        <section className="flex flex-col justify-center items-center p-2 gap-2 text-center">
          <RadioGroup
            label="Update Stage"
            orientation="horizontal"
            defaultValue={stage}
            name="stage">
            {stages.map((stage) => (
              <Radio key={stage.name} value={stage.name} className="capitalize">
                {stage.name}
              </Radio>
            ))}
          </RadioGroup>
          <SaveStage />
        </section>
      </form>
    </>
  )
}

function SaveStage() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      color="primary"
      variant="shadow"
      isLoading={pending}
      startContent={!pending && <SaveIcon />}>
      Save Stage
    </Button>
  )
}
