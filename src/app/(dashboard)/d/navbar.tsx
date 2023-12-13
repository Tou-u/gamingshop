'use client'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import { User } from 'lucia'
import { Logout } from '@/lib/actions/auth'

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
    <Navbar isBordered classNames={{ wrapper: 'px-0 gap-0' }}>
      <NavbarContent className="flex gap-3 sm:gap-4" justify="center">
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
            <form action={Logout}>
              <Button type="submit" color="danger" variant="flat" size="sm">
                Log out
              </Button>
            </form>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  )
}
