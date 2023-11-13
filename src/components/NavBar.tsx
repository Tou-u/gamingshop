'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { FormEvent, useState } from 'react'
import { Session } from 'lucia'
import NextLink from 'next/link'
import UserDropdown from './UserDropdown'
import { SearchIcon } from '@/icons/SearchIcon'
import { ChevronDownIcon } from '@/icons/ChevronDownIcon'
import { useRouter } from 'next/navigation'
import { UserCart } from '@/types'
import CartPopover from './CartPopover'

const categories = [
  {
    name: 'Graphics Cards',
    path: 'graphics_cards'
  },
  {
    name: 'Processors',
    path: 'processors'
  },
  {
    name: 'Hard Drives',
    path: 'hard_drives'
  },
  {
    name: 'Ram',
    path: 'ram'
  },
  {
    name: 'Motherboards',
    path: 'motherboards'
  }
]

export const NavBar = ({
  session,
  usercart
}: {
  session: Session | null | undefined
  usercart: UserCart | undefined
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const router = useRouter()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchValue = formData.get('search') as string

    if (!searchValue.trim()) return

    router.push(`/search/${searchValue.trim()}`)
  }

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} disableAnimation>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        <NavbarBrand>
          <Link href="/" as={NextLink} className="font-bold text-inherit">
            GamingShop
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/" as={NextLink} className="font-bold text-inherit">
            GamingShop
          </Link>
        </NavbarBrand>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                size="lg"
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon size={16} />}
                radius="sm"
                variant="light">
                Hardware
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            itemClasses={{
              base: 'gap-4'
            }}>
            {categories.map((c) => (
              <DropdownItem key={c.path} as={NextLink} href={`/category/${c.path}`}>
                {c.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="flex-1"></div>
        <form onSubmit={handleSubmit}>
          <Input
            autoComplete="off"
            classNames={{
              base: 'w-[160px] h-10',
              mainWrapper: 'h-full',
              input: 'text-small',
              inputWrapper:
                'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
            }}
            placeholder="Type to search..."
            size="sm"
            name="search"
            startContent={<SearchIcon />}
          />
        </form>
        <NavbarItem>
          <div className="flex gap-3 w-[92px]">
            {usercart ? <CartPopover usercart={usercart} /> : null}
            {session === undefined ? null : session === null ? (
              <Button as={Link} color="warning" href="/login" variant="flat">
                Login
              </Button>
            ) : (
              <UserDropdown user={session.user} />
            )}
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {categories.map((category) => (
          <NavbarMenuItem key={category.path}>
            <Link
              className="w-full capitalize"
              as={NextLink}
              href={`/category/${category.path}`}
              size="lg"
              onClick={() => setIsMenuOpen(false)}>
              {category.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
