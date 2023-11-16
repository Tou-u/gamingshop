import { getPageSession } from '@/auth/lucia'
import { notFound } from 'next/navigation'
import api from '@/lib/data'
import Link from 'next/link'
import { Fragment } from 'react'
import { Divider } from '@nextui-org/divider'
import { currencyToUSD } from '@/utils/scripts'
import { Button } from '@nextui-org/button'

export default async function Page() {
  const session = await getPageSession().catch((session) => (session = null))

  if (!session) {
    notFound()
  }

  const products = await api.getUserCart(session.user.userId)

  let toPay = 0

  products!.forEach((product) => {
    toPay += product.price
  })

  const length = products!.length
  const itemText = length > 1 ? 'items' : 'item'
  const totalItems = `${length} ${itemText}`

  return (
    <>
      {products!.length === 0 ? (
        <div className="flex flex-col gap-2 items-center">
          <p>Add products to cart</p>
          <Link href="/">Return Home</Link>
        </div>
      ) : (
        <>
          <h1 className="text-center text-xl font-bold mb-2">Your cart ({totalItems})</h1>
          <div className="grid grid-cols-5">
            <section className="col-span-3">
              <article>
                {products!.map((product) => (
                  <Fragment key={product.slug}>
                    <div className="flex gap-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={product.name}
                        src="/placeholder.jpeg"
                        className="w-[100px] h-[100px] rounded-2xl object-cover"
                      />
                      <div>
                        <p>{product.name}</p>
                        <p>
                          Price: <span className="font-bold">{currencyToUSD(product.price)}</span>
                        </p>
                      </div>
                    </div>
                    <Divider className="m-1" />
                  </Fragment>
                ))}
              </article>
            </section>
            <section className="col-span-2 flex flex-col">
              <h2 className="text-center mb-2 font-bold">Order Summary</h2>
              <div className="flex justify-evenly mb-2">
                <p>Order total:</p>
                <p className="font-bold">{currencyToUSD(toPay)}</p>
              </div>
              <Button color="primary" className="w-[50%] self-center">
                Checkout
              </Button>
            </section>
          </div>
        </>
      )}
    </>
  )
}
