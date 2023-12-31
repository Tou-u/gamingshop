import { getPageSession } from '@/auth/lucia'
import { notFound, redirect } from 'next/navigation'
import api from '@/lib/data/shop'
import { Fragment } from 'react'
import Form from './form'
import Checkout from './checkout'
import AddressCard from './card'
import { CurrencyToUSD } from '@/lib/utils'
import { PUBLIC_URL } from '@/lib/r2'

export default async function Page() {
  const session = await getPageSession().catch((session) => (session = null))

  if (!session) {
    notFound()
  }

  const products = await api.getUserCart(session.user.userId)

  if (products.length === 0) {
    redirect('/')
  }

  const address = await api.getUserAddress(session.user.userId)

  let toPay = 0

  products!.forEach((product) => {
    toPay += product.price
  })

  const length = products!.length
  const itemText = length > 1 ? 'items' : 'item'
  const totalItems = `${length} ${itemText}`

  return (
    <div>
      <h1 className="text-center text-xl font-bold mb-2">Your cart ({totalItems})</h1>
      <div className="grid grid-cols-5 gap-2">
        <section className="col-span-3">
          <article>
            {products.map((product) => (
              <Fragment key={product.id}>
                <div className="flex gap-1 pb-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={product.name}
                    src={`${PUBLIC_URL}/${product.image}`}
                    className="w-[100px] h-[100px] rounded-2xl object-cover"
                  />
                  <div className="flex flex-col">
                    <p>{product.name}</p>
                    <p className="flex-1">
                      Price: <span className="font-bold">{CurrencyToUSD(product.price)}</span>
                    </p>
                    <Form user={session.user} product={product} />
                  </div>
                </div>
              </Fragment>
            ))}
          </article>
        </section>
        <section className="col-span-2 flex flex-col">
          <h2 className="text-center mb-2 font-bold">Order Summary</h2>
          <div className="flex justify-evenly mb-2">
            <p>Order total:</p>
            <p className="font-bold">{CurrencyToUSD(toPay)}</p>
          </div>
          {address && <AddressCard address={address} />}
          <Checkout address={address} user={session.user} products={products} />
        </section>
      </div>
    </div>
  )
}
