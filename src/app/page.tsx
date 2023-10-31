import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";

import Form from "@/components/form";
import { Button } from "@nextui-org/button";

const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/login");
  return (
    <>
      <h1>Profile</h1>
      <p>User id: {session.user.userId}</p>
      <p>Username: {session.user.username}</p>
      <p>Role: {session.user.role}</p>
      <Form action="/api/logout">
        <input type="submit" value="Sign out" />
      </Form>
    </>
  );
};

export default Page;
