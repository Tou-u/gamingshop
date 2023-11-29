'use client'
import { NewOrder } from '@/actions'
import Loading from '@/components/ui/Loading'
import { Address, UserCart } from '@/types'
import { Button } from '@nextui-org/button'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/modal'
import { User } from 'lucia'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Link } from '@nextui-org/react'

export default function Checkout({
  address,
  user,
  products
}: {
  address: Address | null
  user: User
  products: UserCart[]
}) {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [finishedPurchase, setFinishedPurchase] = useState({
    status: false,
    message: 'Simulating Purchase'
  })

  async function handleCheckout() {
    if (!address) {
      router.replace('/myaddress?callbackUrl=cart')
      return
    }
    onOpen()

    const data = new FormData()
    data.append('user_id', user.userId)
    data.append('products', JSON.stringify(products))
    data.append('address', JSON.stringify(address))

    const response = await NewOrder(data)

    if (response.success) {
      setFinishedPurchase({ status: true, message: 'Order complete' })
    } else {
      setFinishedPurchase({
        status: false,
        message: response.error!
      })
    }
  }
  return (
    <>
      <Button color="primary" className="w-[50%] self-center" onClick={handleCheckout}>
        Checkout
      </Button>
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        finishedPurchase={finishedPurchase}
      />
    </>
  )
}

function ModalComponent({
  isOpen,
  onOpenChange,
  finishedPurchase
}: {
  isOpen: boolean
  onOpenChange: () => void
  finishedPurchase: { status: boolean; message: string }
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      placement="center"
      hideCloseButton>
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col justify-center items-center h-[150px]">
            {finishedPurchase.status ? (
              <>
                <h2 className="font-bold">{finishedPurchase.message}</h2>
                <Link href="/myorders">Check Orders</Link>
              </>
            ) : (
              <Loading title={finishedPurchase.message} />
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
