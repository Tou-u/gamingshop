import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection
} from '@nextui-org/dropdown'
import { Avatar } from '@nextui-org/avatar'
import { User as LuciaUser } from 'lucia'
import { useRouter } from 'next/navigation'
import AddressIcon from './ui/icons/AddressIcon'
import OrdersIcons from './ui/icons/OrdersIcon'
import LogoutIcon from './ui/icons/LogoutIcon'
import NextLink from 'next/link'
import AdminIcon from './ui/icons/AdminIcon'
import { Logout } from '@/lib/actions/auth'

export default function UserDropdown({ user }: { user: LuciaUser }) {
  const router = useRouter()
  return (
    <div className="cursor-pointer">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Avatar color="primary" name={user.username} isBordered size="sm" />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          {user.role === 'admin' ? (
            <DropdownSection title="Admin options" showDivider>
              <DropdownItem
                key="dashboard"
                startContent={<AdminIcon />}
                onPress={() => router.push('/d/products')}>
                Dashboard
              </DropdownItem>
            </DropdownSection>
          ) : (
            <DropdownSection title="Your account" showDivider>
              <DropdownItem
                key="orders"
                startContent={<OrdersIcons />}
                as={NextLink}
                href="/myorders">
                Orders
              </DropdownItem>
              <DropdownItem
                key="address"
                startContent={<AddressIcon />}
                as={NextLink}
                href="/myaddress">
                Address
              </DropdownItem>
            </DropdownSection>
          )}
          <DropdownItem key="logout" color="danger" startContent={<LogoutIcon />}>
            <form action={Logout}>
              <input type="submit" value="Log out" className="w-full text-start cursor-pointer" />
            </form>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
