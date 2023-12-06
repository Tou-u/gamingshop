'use client'
import { SearchIcon } from '@/components/ui/icons/SearchIcon'
import { ShortDate } from '@/lib/utils'
import { Chip } from '@nextui-org/chip'
import { Input } from '@nextui-org/input'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Prisma } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

type Props = {
  orders: {
    id: string
    status: string
    created_at: Date
    products: Prisma.JsonValue[]
    address: Prisma.JsonValue
    user_id: string
    user: {
      username: string
    }
  }[]
}

export default function TableComponent({ orders }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((client: string) => {
    const params = new URLSearchParams(searchParams)
    if (client) {
      params.set('client', client)
    } else {
      params.delete('client')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <>
      <Input
        classNames={{
          base: 'w-full sm:max-w-[44%]',
          inputWrapper: 'border-1 h-[10px]'
        }}
        placeholder="Search by client..."
        startContent={<SearchIcon className="text-default-300" />}
        variant="bordered"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('client')?.toString()}
      />
      <Table aria-label="Orders table">
        <TableHeader>
          <TableColumn>CLIENT</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>SEND</TableColumn>
          <TableColumn>DETAILS</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.user.username}</TableCell>
              <TableCell>{ShortDate(order.created_at)}</TableCell>
              <TableCell>
                <Chip className="capitalize m-auto" color="success" size="sm" variant="flat">
                  {order.status}
                </Chip>
              </TableCell>
              <TableCell>
                <p>Send</p>
              </TableCell>
              <TableCell>
                <p>Det</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
