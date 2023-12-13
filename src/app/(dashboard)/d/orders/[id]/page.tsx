import api from '@/lib/data/dashboard'
import { CurrencyToUSD, LongDate } from '@/lib/utils'
import { Chip } from '@nextui-org/chip'
import { Divider } from '@nextui-org/divider'
import { Address } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import Form from './form'
import { Link } from '@nextui-org/link'
import ArrowLeftIcon from '@/components/ui/icons/ArrowLeftIcon'
import NextLink from 'next/link'

type Props = {
  params: { id: string }
}

type Product = {
  id: string
  name: string
  slug: string
  image: string
  price: number
}

export default async function OrderPage({ params }: Props) {
  const order = await api.getOrder(params.id)
  if (!order) notFound()

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <Link as={NextLink} href="/d/orders">
          <ArrowLeftIcon />
        </Link>
        <h1 className="p-1 font-bold text-lg text-center mx-auto">Order {order.id}</h1>
      </div>
      <p className="font-bold">User: {order.user.username}</p>
      <p>{`Purchase Date: ${LongDate(order.created_at)}`}</p>
      <div className="flex gap-2">
        <p>Status:</p>
        <Chip className="capitalize border-none gap-1" size="sm" variant="flat" color="primary">
          {order.status}
        </Chip>
      </div>
      <Form order_id={order.id} stage={order.stage} />
      <Divider />
      <section className="flex flex-col items-center">
        <h2 className="font-bold">Shipping Information</h2>
        {renderAddress(order.address as Address)}
      </section>
      <Divider />
      <section className="flex flex-col items-center">
        <h2 className="font-bold">Purchased Items</h2>
        {renderProducts(order.products as Product[])}
      </section>
    </div>
  )
}

const renderAddress = (address: Address) => {
  return (
    <div className="grid grid-cols-5 w-full">
      <h2 className="col-span-1">Buyer:</h2>
      <p className="capitalize col-span-4">{`${address.first_name} ${address.last_name}`}</p>
      <h2 className="col-span-1">Email:</h2>
      <p className="col-span-4">{address.email}</p>
      <h2 className="col-span-1">Phone:</h2>
      <p className="col-span-4">9 {address.phone}</p>
      <h2 className="col-span-1">Address:</h2>
      <p className="col-span-4">{address.address}</p>
      <h2 className="col-span-1">Info:</h2>
      <p className="col-span-4">
        {address.info === '' ? 'No additional information' : address.info}
      </p>
    </div>
  )
}

const renderProducts = (products: Product[]) => {
  const total = CurrencyToUSD(products.reduce((acc, p) => acc + p.price, 0))
  return (
    <div className="grid grid-cols-6 w-full gap-x-2">
      {products.map((product) => (
        <Fragment key={product.id}>
          <Link href={`/${product.slug}`} className="col-span-4">
            {product.name}
          </Link>
          <p>{CurrencyToUSD(product.price)}</p>
          <p className="col-span-6 text-sm">ID: {product.id}</p>
        </Fragment>
      ))}
      <span className="col-span-3" />
      <p className="text-end">TOTAL:</p>
      <p>{total}</p>
    </div>
  )
}
