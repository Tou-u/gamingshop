'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { EditIcon } from '@/components/ui/icons/EditIcon'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import { Address } from '@/types'
import { useRouter } from 'next/navigation'

export default function AddressCard({ address }: { address: Address }) {
  const { replace } = useRouter()
  return (
    <Card className="mb-2">
      <CardHeader className="justify-center p-1">
        <p className="font-bold text-center">Shipping Information</p>
      </CardHeader>
      <Divider />
      <CardBody className="p-1">
        <p>{`${address.first_name} ${address.last_name}`}</p>
        <p>{address.address}</p>
        <div className="flex justify-between items-center">
          <p>9 {address.phone}</p>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            radius="full"
            onClick={() => replace('/myaddress?callbackUrl=cart')}>
            <EditIcon />
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
