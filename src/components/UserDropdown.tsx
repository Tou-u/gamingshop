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
import Form from './Form'
import AddressIcon from './ui/icons/AddressIcon'
import OrdersIcons from './ui/icons/OrdersIcon'
import LogoutIcon from './ui/icons/LogoutIcon'
import NextLink from 'next/link'

export default function UserDropdown({ user }: { user: LuciaUser }) {
  const router = useRouter()
  return (
    <div className="cursor-pointer">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Avatar isBordered color="primary" name={user.username} />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          {user.role === 'admin' ? (
            <DropdownSection title="Admin options" showDivider>
              <DropdownItem key="dashboard" onPress={() => router.push('/dashboard')}>
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
            <Form action="/api/logout">
              <input type="submit" value="Log out" className="w-full text-start cursor-pointer" />
            </Form>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
