import CartIcon from '@/components/ui/icons/CartIcon'
import { Fragment, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { UserCart } from '@/types'
import NextLink from 'next/link'
import { CurrencyToUSD } from '@/lib/utils'

export default function CartPopover({ usercart }: { usercart: UserCart[] }) {
  const [isOpen, setIsOpen] = useState(false)

  let toPay = 0

  usercart.forEach((product) => {
    toPay += product.price
  })

  return (
    <Popover
      placement="bottom"
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <span className="relative cursor-pointer">
          <p className="absolute -bottom-2 -right-2 text-xs bg-primary-400 h-[16px] w-[16px] text-center rounded-full">
            {usercart.length}
          </p>
          <CartIcon size={24} />
        </span>
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <Card shadow="none" className="max-w-[300px] max-h-[400px] border-none bg-transparent">
          {usercart.length > 0 ? (
            <>
              <CardHeader className="justify-between ">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Your cart
                </h4>
              </CardHeader>
              <CardBody className="px-3 py-0">
                <section className="grid grid-cols-6 gap-y-2">
                  {usercart.map((product) => (
                    <Fragment key={product.slug}>
                      <div className="col-span-4 border-b">
                        <h5>{product.name}</h5>
                      </div>
                      <div className="col-span-2 border-b pl-2">
                        <h5 className="font-bold">{CurrencyToUSD(product.price)}</h5>
                      </div>
                    </Fragment>
                  ))}
                </section>
              </CardBody>
              <CardFooter className="flex flex-col">
                <p>Total: {CurrencyToUSD(toPay)}</p>
                <Link as={NextLink} href="/cart" onClick={() => setIsOpen(!isOpen)}>
                  Proceed to payment
                </Link>
              </CardFooter>
            </>
          ) : (
            <CardHeader className="justify-between ">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Your cart is empty
              </h4>
            </CardHeader>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  )
}
