'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import { User } from 'lucia'

export default function NavBar({ user }: { user: User | undefined }) {
  const pathname = usePathname()
  const paths = [
    {
      name: 'Products',
      path: '/d/products'
    },
    {
      name: 'Orders',
      path: '/d/orders'
    }
  ]
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link as={NextLink} href="/d/products" className="font-bold text-inherit">
          Dashboard
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex gap-4" justify="center">
        {paths.map((p) => (
          <NavbarItem key={p.path} isActive={p.path === pathname}>
            <Link
              as={NextLink}
              href={p.path}
              color={p.path === pathname ? 'primary' : 'foreground'}>
              {p.name}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem key="home">
          <Link as={NextLink} href="/" color="foreground">
            Back to shop
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user && (
          <NavbarItem>
            <Button as={Link} color="danger" href="#" variant="flat">
              Log out
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  )
}
