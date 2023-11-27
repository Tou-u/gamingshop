'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { EditIcon } from '@/components/ui/icons/EditIcon'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import { Adress } from '@/types'
import { useRouter } from 'next/navigation'

export default function AdressCard({ adress }: { adress: Adress }) {
  const { replace } = useRouter()
  return (
    <Card className="mb-2">
      <CardHeader className="justify-center p-1">
        <p className="font-bold text-center">Shipping Information</p>
      </CardHeader>
      <Divider />
      <CardBody className="p-1">
        <p>{`${adress.first_name} ${adress.last_name}`}</p>
        <p>{adress.adress}</p>
        <div className="flex justify-between items-center">
          <p>9 {adress.phone}</p>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            radius="full"
            onClick={() => replace('/myadress?callbackUrl=cart')}>
            <EditIcon />
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
