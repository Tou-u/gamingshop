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
import { SearchIcon } from '@/components/ui/icons/SearchIcon'
import { ChevronDownIcon } from '@/components/ui/icons/ChevronDownIcon'
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
  usercart: UserCart[] | undefined
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const router = useRouter()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchValue = formData.get('search') as string

    if (!searchValue.trim()) return

    router.push(`/search?q=${searchValue.trim()}`)
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      disableAnimation
      classNames={{ wrapper: 'px-0 gap-0' }}>
      <NavbarContent className="sm:hidden gap-3" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        <NavbarBrand>
          <Link href="/" as={NextLink} className="hidden min-[400px]:block font-bold text-inherit">
            GamingShop
          </Link>
          <Link href="/" as={NextLink} className="min-[400px]:hidden font-bold text-inherit">
            GS
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

      <NavbarContent justify="end" className="gap-1">
        <NavbarItem>
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
        </NavbarItem>
        <NavbarItem className="flex items-center gap-4 min-w-[72px]">
          {usercart === undefined ? null : <CartPopover usercart={usercart} />}
          {session === undefined ? null : session === null ? (
            <Button
              as={Link}
              color="warning"
              href="/login"
              variant="flat"
              className="h-[40px] min-w-0">
              Login
            </Button>
          ) : (
            <UserDropdown user={session.user} />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {categories.map((category) => (
          <NavbarMenuItem key={category.path}>
            <Link
              className="w-full capitalize font-bold"
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
