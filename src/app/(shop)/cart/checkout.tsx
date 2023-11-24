'use client'
import { Adress } from '@/types'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

export default function Checkout({ adress }: { adress: Adress | null }) {
  const router = useRouter()

  function handleCheckout() {
    if (!adress) {
      router.replace('/myadress?callbackUrl=cart')
    }
    return
  }
  return (
    <Button color="primary" className="w-[50%] self-center" onClick={handleCheckout}>
      Checkout
    </Button>
  )
}
