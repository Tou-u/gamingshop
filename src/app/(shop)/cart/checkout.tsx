'use client'
import { NewOrder } from '@/actions'
import Loading from '@/components/ui/Loading'
import { Adress, Product } from '@/types'
import { Button } from '@nextui-org/button'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/modal'
import { User } from 'lucia'
import { useRouter } from 'next/navigation'

export default function Checkout({
  adress,
  user,
  products
}: {
  adress: Adress | null
  user: User
  products: Product[]
}) {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  async function handleCheckout() {
    if (!adress) {
      router.replace('/myadress?callbackUrl=cart')
      return
    }
    onOpen()
    const data = new FormData()
    data.append('user_id', user.userId)
    data.append('products', JSON.stringify(products.map((product) => product.slug)))
    const { first_name, last_name, email, phone, info, adress: adressData } = adress
    const formAdress = {
      first_name,
      last_name,
      email,
      phone,
      info,
      adressData
    }
    data.append('adress', JSON.stringify(formAdress))
    await NewOrder(data)
  }
  return (
    <>
      <Button color="primary" className="w-[50%] self-center" onClick={handleCheckout}>
        Checkout
      </Button>
      <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}

function ModalComponent({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: () => void }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      placement="center"
      hideCloseButton>
      <ModalContent>
        <ModalBody>
          <Loading title="Simulating Purchase" />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
