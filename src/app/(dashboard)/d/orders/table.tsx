'use client'
import { SearchIcon } from '@/components/ui/icons/SearchIcon'
import { ShortDate } from '@/lib/utils'
import { Chip } from '@nextui-org/chip'
import { Input } from '@nextui-org/input'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Pagination } from '@nextui-org/pagination'
import { Select, SelectItem } from '@nextui-org/select'
import { Tooltip } from '@nextui-org/tooltip'
import { Link } from '@nextui-org/link'
import { Prisma } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import EyeIcon from '@/components/ui/icons/EyeIcon2'
import NextLink from 'next/link'

type Props = {
  orders: {
    id: string
    status: string
    stage: string
    created_at: Date
    products: Prisma.JsonValue[]
    address: Prisma.JsonValue
    user_id: string
    user: {
      username: string
    }
  }[]
  pages: number
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

export default function TableComponent({ orders, pages }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentPage = Number(searchParams.get('page')) || 1
  const currentStage = searchParams.get('stage') || 'all'

  const params = new URLSearchParams(searchParams)

  const handleSearch = useDebouncedCallback((client: string) => {
    params.set('page', '1')
    if (client) {
      params.set('client', client)
    } else {
      params.delete('client')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  const createPageURL = (pageNumber: number) => {
    params.set('page', pageNumber.toString())
    const existingClient = params.get('client')
    if (existingClient) {
      params.set('client', existingClient)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const handleStage = (stage: string) => {
    params.set('stage', stage)
    const existingClient = params.get('client')
    if (existingClient) {
      params.set('client', existingClient)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <div className="flex justify-between gap-3">
        <Input
          size="sm"
          variant="bordered"
          color="primary"
          classNames={{
            base: 'w-full sm:max-w-[30%]'
          }}
          placeholder="Search by client..."
          startContent={<SearchIcon className="text-default-300" />}
          defaultValue={searchParams.get('client')?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Select
          size="sm"
          variant="bordered"
          color="primary"
          classNames={{
            base: 'w-full sm:max-w-[30%]'
          }}
          label="Stage"
          selectionMode="single"
          disallowEmptySelection
          defaultSelectedKeys={[currentStage]}
          onChange={(e) => handleStage(e.target.value)}>
          <SelectItem key="all">All</SelectItem>
          <SelectItem key="processing">Processing</SelectItem>
          <SelectItem key="processed">Processed</SelectItem>
          <SelectItem key="shipped">Shipped</SelectItem>
          <SelectItem key="refund">Refund</SelectItem>
        </Select>
      </div>
      <Table
        isCompact
        removeWrapper
        aria-label="Orders table"
        classNames={{ th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'] }}>
        <TableHeader>
          <TableColumn>CLIENT</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>STAGE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No orders found'}>
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
                <Chip
                  className="capitalize border-none gap-1"
                  size="sm"
                  variant="dot"
                  color={stages[order.stage].color}>
                  {order.stage}
                </Chip>
              </TableCell>
              <TableCell>
                <Tooltip content="Manage order">
                  <Link
                    as={NextLink}
                    href={`/d/orders/${order.id}`}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </Link>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="py-2 px-2 flex w-full justify-center">
        <Pagination
          showControls
          showShadow
          variant="light"
          page={currentPage}
          total={pages || 1}
          onChange={(e) => createPageURL(e)}
        />
      </div>
    </>
  )
}
