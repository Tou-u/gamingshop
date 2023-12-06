'use client'
import EyeIcon from '@/components/ui/icons/EyeIcon2'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { Chip } from '@nextui-org/chip'
import { Tooltip } from '@nextui-org/tooltip'
import { Link } from '@nextui-org/link'
import NextLink from 'next/link'
import { Prisma } from '@prisma/client'
import { useState, Key, Fragment } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/modal'
import { CurrencyToUSD, LongDate, ShortDate } from '@/lib/utils'
import { Address } from '@/types'
import { Divider } from '@nextui-org/divider'

type Order = {
  id: string
  status: string
  stage: string
  created_at: Date
  products: Prisma.JsonValue[]
  address: Prisma.JsonValue
  user_id: string
}

type Product = {
  id: string
  name: string
  slug: string
  image: string
  price: number
}

type Stages = {
  [key: string]: {
    color: 'success' | 'default' | 'primary' | 'danger'
  }
}

const stages: Stages = {
  processing: { color: 'default' },
  processed: { color: 'primary' },
  shipped: { color: 'success' },
  refund: { color: 'danger' }
}

const columns = [
  { name: 'PRODUCTS', uid: 'products' },
  { name: 'STATUS', uid: 'status' },
  { name: 'DATE', uid: 'date' },
  { name: 'DETAILS', uid: 'details' }
]

export default function TableComponent({ orders }: { orders: Order[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedData, setSelectedData] = useState<Order | null>(null)

  function showModal(order: Order) {
    onOpen()
    setSelectedData(order)
  }

  const renderCell = (order: Order, columnKey: Key) => {
    const products = JSON.parse(JSON.stringify(order.products)) as Product[]

    switch (columnKey) {
      case 'products':
        return (
          <div className="flex flex-col gap-1">
            {products.map((product) => (
              <div key={product.id} className="flex gap-1 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={product.name}
                  src="/placeholder.jpeg"
                  className="h-[30px] w-[30px] object-cover"
                />
                <Link as={NextLink} href={`/${product.slug}`}>
                  {product.name}
                </Link>
              </div>
            ))}
          </div>
        )
      case 'status':
        return (
          <Chip className="capitalize m-auto" color="success" size="sm" variant="flat">
            {order.status}
          </Chip>
        )
      case 'date':
        return <p className="m-auto">{ShortDate(order.created_at)}</p>
      case 'details':
        return (
          <Tooltip content="See details" color="primary">
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => showModal(order)}>
              <EyeIcon />
            </span>
          </Tooltip>
        )
      default:
        return
    }
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
      <div className="grid grid-cols-6 w-full">
        {products.map((product) => (
          <Fragment key={product.id}>
            <p className="col-span-5">{product.name}</p>
            <p>{CurrencyToUSD(product.price)}</p>
          </Fragment>
        ))}
        <span className="col-span-4" />
        <p>TOTAL:</p>
        <p>{total}</p>
      </div>
    )
  }

  return (
    <>
      {selectedData && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            <ModalHeader className="pb-0 m-auto">Order ID: {selectedData.id}</ModalHeader>
            <ModalBody>
              <div className="px-2 flex flex-col gap-1">
                <p>{`Purchase Date: ${LongDate(selectedData.created_at)}`}</p>
                <div className="flex gap-2">
                  <p>Stage:</p>
                  <Chip
                    className="capitalize border-none gap-1"
                    size="sm"
                    variant="shadow"
                    color={stages[selectedData.stage].color}>
                    {selectedData.stage}
                  </Chip>
                </div>
                <Divider />
                <section className="flex flex-col items-center">
                  <h2 className="font-bold">Shipping Information</h2>
                  {renderAddress(selectedData.address as Address)}
                </section>
                <Divider />
                <section className="flex flex-col items-center">
                  <h2 className="font-bold">Purchased Items</h2>
                  {renderProducts(selectedData.products as Product[])}
                </section>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <Table
        aria-label="Orders"
        removeWrapper
        classNames={{
          th: ['bg-transparent', 'border-b', 'border-divider'],
          td: ['border-b', 'border-divider']
        }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} className="text-center p-0">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={orders} emptyContent={'No orders to display'}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="align-top">
                  <section className="min-h-[40px] flex items-center">
                    {renderCell(item, columnKey)}
                  </section>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
