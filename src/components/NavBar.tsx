"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Session } from "lucia";
import NextLink from "next/link";
import Form from "./Form";

type Categories = {
  id: string;
  name: string;
}[];

export const NavBar = ({
  session,
  categories,
}: {
  session: Session | null;
  categories: Categories;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = session?.user;

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      disableAnimation
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <Link href="/" as={NextLink} className="font-bold text-inherit">
            ACME
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">ACME</p>
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
        <NavbarItem>
          {user ? (
            <Form action="/api/logout">
              <Button type="submit" color="danger" variant="flat">
                Log Out
              </Button>
            </Form>
          ) : (
            <Button as={Link} color="warning" href="/login" variant="flat">
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {categories.map((category) => (
          <NavbarMenuItem key={category.id}>
            <Link
              className="w-full capitalize"
              as={NextLink}
              href={`/category/${category.name.replace(" ", "_")}`}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {category.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
