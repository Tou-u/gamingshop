import { getPageSession } from '@/auth/lucia'
import { notFound, redirect } from 'next/navigation'
import api from '@/lib/data'
import { Fragment } from 'react'
import { Divider } from '@nextui-org/divider'
import { currencyToUSD } from '@/utils/scripts'
import Form from './form'
import Checkout from './checkout'
import AdressCard from './card'

export default async function Page() {
  const session = await getPageSession().catch((session) => (session = null))

  if (!session) {
    notFound()
  }

  const products = await api.getUserCart(session.user.userId)

  if (products?.length === 0 || !products) {
    redirect('/')
  }

  const adress = await api.getUserAdress(session.user.userId)

  let toPay = 0

  products!.forEach((product) => {
    toPay += product.price
  })

  const length = products!.length
  const itemText = length > 1 ? 'items' : 'item'
  const totalItems = `${length} ${itemText}`

  return (
    <>
      <h1 className="text-center text-xl font-bold mb-2">Your cart ({totalItems})</h1>
      <div className="grid grid-cols-5 gap-2">
        <section className="col-span-3">
          <article>
            {products.map((product) => (
              <Fragment key={product.slug}>
                <div className="flex gap-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={product.name}
                    src="/placeholder.jpeg"
                    className="w-[100px] h-[100px] rounded-2xl object-cover"
                  />
                  <div className="flex flex-col">
                    <p>{product.name}</p>
                    <p className="flex-1">
                      Price: <span className="font-bold">{currencyToUSD(product.price)}</span>
                    </p>
                    <Form user={session.user} product={product} />
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
          {adress && <AdressCard adress={adress} />}
          <Checkout adress={adress} user={session.user} products={products} />
        </section>
      </div>
    </>
  )
}
