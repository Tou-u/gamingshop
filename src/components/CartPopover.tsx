import CartIcon from '@/components/ui/icons/CartIcon'
import { Fragment, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover'
import { Button } from '@nextui-org/button'
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
        <Button isIconOnly variant="light" radius="full">
          <div className="static">
            <p className="absolute bottom-1 right-1 text-xs text-primary-500 font-semibold">
              {usercart.length}
            </p>
            <CartIcon />
          </div>
        </Button>
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
                      <div className="col-span-2 border-b">
                        <h5>{CurrencyToUSD(product.price)}</h5>
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
