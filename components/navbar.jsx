"use client";
// components/NavBar.js
import React, { useState } from "react";
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
import ThemeSwitcher from "./ThemeSwitcher";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Popup from "./popUp";

export default function NavBar() {
  const [showPopup, setShowPopup] = useState(false);

  const menuItems = ["about", "features", "pricing", "team"];

  return (
    <>
      <Navbar isBlurred maxWidth="xl">
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <span className="font-light tracking-tighter text-inherit text-lg">
              Quickstart
            </span>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-5" justify="center">
          <NavbarBrand className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Quickstart Logo"
              href="/"
              width={57}
              height={57}
              className="object-contain"
            />
          </NavbarBrand>
          <NavbarItem>
            <Link href="/about">
              <Button variant="light">About</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button endContent={<ChevronDown size={16} />} variant="light">
                  Features
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{ base: "gap-4" }}
              >
                <DropdownItem>Autoscaling</DropdownItem>
                <DropdownItem>Usage Metrics</DropdownItem>
                <DropdownItem>Production Ready</DropdownItem>
                <DropdownItem>+99% Uptime</DropdownItem>
                <DropdownItem>+Supreme Support</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pricing">
              <Button variant="light">Pricing</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/faq">
              <Button variant="light">FAQ</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/team">
              <Button variant="light">Team</Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <Button color="primary" onClick={() => setShowPopup(true)} variant="solid">
              Get Started
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full" href={`/${item}`} size="lg" color="foreground">
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}
