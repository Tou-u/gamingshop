import CartIcon from '@/icons/CartIcon'
import { Fragment, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover'
import { Button } from '@nextui-org/button'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { UserCart } from '@/types'
import NextLink from 'next/link'

export default function CartPopover({ usercart }: { usercart: UserCart | undefined }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Popover
      placement="bottom"
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <Button isIconOnly variant="light" radius="full">
          <CartIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <Card shadow="none" className="max-w-[300px] max-h-[400px] border-none bg-transparent">
          <CardHeader className="justify-between ">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {usercart ? 'Your cart' : 'Your cart is empty'}
            </h4>
          </CardHeader>
          {usercart && (
            <>
              <CardBody className="px-3 py-0">
                <section className="grid grid-cols-6 gap-y-2">
                  {usercart.map((product) => (
                    <Fragment key={product.id}>
                      <div className="col-span-4 border-b">
                        <h5>{product.name}</h5>
                      </div>
                      <div className="col-span-2 border-b">
                        <h5>
                          {Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(product.price)}
                        </h5>
                      </div>
                    </Fragment>
                  ))}
                </section>
              </CardBody>
              <CardFooter className="gap-3">
                <Link as={NextLink} href="/cart" onClick={() => setIsOpen(!isOpen)}>
                  Proceed to payment
                </Link>
              </CardFooter>
            </>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  )
}
