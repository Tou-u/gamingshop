import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { User as LuciaUser } from "lucia";
import { useRouter } from "next/navigation";
import Form from "../Form";

export default function UserDropdown({ user }: { user: LuciaUser }) {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              name: user.username,
            }}
            className="transition-transform"
            name={user.username}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{user.username}</p>
          </DropdownItem>
          {user.role === "admin" ? (
            <DropdownItem
              key="dashboard"
              onPress={() => router.push("/dashboard")}
            >
              Dashboard
            </DropdownItem>
          ) : (
            <DropdownItem className="hidden" />
          )}
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="logout" color="danger">
            <Form action="/api/logout">
              <input
                type="submit"
                value="Log out"
                className="w-full text-start cursor-pointer"
              />
            </Form>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
