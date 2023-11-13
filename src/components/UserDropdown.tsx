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
              <DropdownItem key="orders">Orders</DropdownItem>
              <DropdownItem key="adress">Adress</DropdownItem>
            </DropdownSection>
          )}
          <DropdownItem key="logout" color="danger">
            <Form action="/api/logout">
              <input type="submit" value="Log out" className="w-full text-start cursor-pointer" />
            </Form>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
