'use client'
import EyeIcon from '@/components/ui/icons/EyeIcon'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { Chip } from '@nextui-org/chip'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import NextLink from 'next/link'
import { Prisma } from '@prisma/client'
import { useState, Key } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/modal'

type Order = {
  id: string
  status: string
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
        return (
          <p className="m-auto">
            {new Intl.DateTimeFormat('es-MX', {
              dateStyle: 'short',
              timeZone: 'America/Santiago'
            }).format(order.created_at)}
          </p>
        )
      case 'details':
        return (
          <Button
            isIconOnly
            variant="light"
            radius="full"
            className="m-auto"
            onPress={() => showModal(order)}>
            <EyeIcon />
          </Button>
        )
      default:
        return
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Order ID: {selectedData?.id}</ModalHeader>
          <ModalBody>
            <p>{JSON.stringify(selectedData?.address)}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Table
        aria-label="Orders"
        removeWrapper
        classNames={{
          th: ['bg-transparent', 'border-b', 'border-divider'],
          td: ['border-b', 'border-divider']
        }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} className="text-center">
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
