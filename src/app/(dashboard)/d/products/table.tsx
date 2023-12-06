'use client'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection
} from '@nextui-org/table'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { Chip } from '@nextui-org/chip'
import { Pagination } from '@nextui-org/pagination'
import { Tooltip } from '@nextui-org/tooltip'
import { Link } from '@nextui-org/link'
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { PlusIcon } from '@/components/ui/icons/PlusIcon'
import { ChevronDownIcon } from '@/components/ui/icons/ChevronDownIcon'
import { SearchIcon } from '@/components/ui/icons/SearchIcon'
import { EyeIcon } from '@/components/ui/icons/EyeIcon2'
import { EditIcon } from '@/components/ui/icons/EditIcon'
import NextLink from 'next/link'
import { Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure } from '@nextui-org/modal'
import { DeleteIcon } from '@/components/ui/icons/DeleteIcon'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteProduct } from '@/lib/actions/dashboard'
import { toast } from '@/lib/utils'
import { Toaster } from 'react-hot-toast'

const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'PRICE/STOCK', uid: 'price' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' }
]

const statusOptions = [
  { name: 'Published', uid: 'active' },
  { name: 'Disabled', uid: 'disabled' }
]

type Product = {
  id: string
  slug: string
  name: string
  description: string
  image: string
  price: number
  stock: number
  active: boolean
  category_id: string
  brand_id: string
}

export default function TableComponent({ products }: { products: Product[] }) {
  const [filterValue, setFilterValue] = useState('')
  const [statusFilter, setStatusFilter] = useState<Selection>('all')
  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const [pages, setPages] = useState(Math.ceil(products.length / rowsPerPage))

  const [product, setProduct] = useState<Product | null>(null)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    let filteredProducts = [...products]

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      const status = Array.from(statusFilter)[0] === 'active' ? true : false
      filteredProducts = filteredProducts.filter((product) => status === product.active)
    }

    setPages(Math.ceil(filteredProducts.length / rowsPerPage))
    return filteredProducts
  }, [products, filterValue, statusFilter, hasSearchFilter])

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const renderCell = useCallback(
    (product: Product, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof Product]

      switch (columnKey) {
        case 'name':
          return <p>{cellValue}</p>
        case 'price':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(product.price)}
              </p>
              <p className="text-bold text-tiny capitalize text-default-500">
                Stock: {product.stock}
              </p>
            </div>
          )
        case 'status':
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={product.active ? 'success' : 'danger'}
              size="sm"
              variant="dot">
              {product.active ? 'Published' : 'Disabled'}
            </Chip>
          )
        case 'actions':
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="See in store">
                <a
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  href={`/${product.slug}`}
                  target="_blank">
                  <EyeIcon />
                </a>
              </Tooltip>
              <Tooltip content="Edit">
                <Link
                  as={NextLink}
                  href={`/d/product?id=${product.id}`}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </Link>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    setProduct(product)
                    onOpen()
                  }}>
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          )
        default:
          return cellValue
      }
    },
    [onOpen]
  )

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: 'w-full sm:max-w-[44%]',
              inputWrapper: 'border-1 h-[10px]'
            }}
            placeholder="Search by name..."
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button endContent={<ChevronDownIcon size={16} />} size="sm" variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}>
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              as={NextLink}
              href="/d/product"
              className="bg-foreground text-background"
              size="sm"
              endContent={<PlusIcon />}>
              Add Product
            </Button>
          </div>
        </div>
        <span className="text-default-400 text-small">Total {products.length} products</span>
      </div>
    )
  }, [filterValue, statusFilter, onSearchChange, products.length])

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex w-full justify-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background'
          }}
          color="default"
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    )
  }, [page, pages])

  const classNames = useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        'group-data-[middle=true]:before:rounded-none',
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none'
      ]
    }),
    []
  )

  const [state, formAction] = useFormState(deleteProduct.bind(null, product?.id), undefined)

  useEffect(() => {
    const checkState = () => {
      if (state?.success) {
        onClose()
        toast.success('Product deleted')
      }
      if (state?.error) toast.error(state.error)
    }
    checkState()
  }, [state, onClose])

  return (
    <>
      <Toaster position="bottom-center" />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <p>Are you sure to delete the product ?</p>
                <p className="underline">{product?.name}</p>
              </ModalHeader>
              <ModalFooter>
                <form action={formAction}>
                  <DeleteButton />
                </form>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        isCompact
        removeWrapper
        aria-label="Table with products of gaming shop"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: 'after:bg-foreground after:text-background text-background'
          }
        }}
        classNames={classNames}
        topContent={topContent}
        topContentPlacement="outside">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No products found'} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

function DeleteButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      color="danger"
      type="submit"
      isLoading={pending}
      startContent={!pending && <DeleteIcon />}>
      Yes, Delete
    </Button>
  )
}
