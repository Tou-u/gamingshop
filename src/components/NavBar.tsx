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
import { FormEvent, useState } from 'react'
import { Session } from 'lucia'
import NextLink from 'next/link'
import UserDropdown from './ui/UserDropdown'
import { SearchIcon } from '@/icons/SearchIcon'
import { useRouter } from 'next/navigation'
import { Category, UserCart } from '@/types'
import CartPopover from './CartPopover'

export const NavBar = ({
  session,
  categories,
  usercart
}: {
  session: Session | null
  categories: Category[]
  usercart: UserCart | undefined
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = session?.user

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
          <p className="font-bold text-inherit">GamingShop</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <form onSubmit={handleSubmit}>
          <Input
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
        <CartPopover usercart={usercart} />
        <NavbarItem>
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <Button as={Link} color="warning" href="/login" variant="flat">
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {categories.map((category) => (
          <NavbarMenuItem key={category.name}>
            <Link
              className="w-full capitalize"
              as={NextLink}
              href={`/category/${category.name.replace(' ', '_')}`}
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
