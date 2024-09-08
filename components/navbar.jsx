"use client";
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
import { AnimatePresence, motion } from "framer-motion";

export default function NavBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Added state for loading
  const [isSubmitting, setIsSubmitting] = useState(false); // Added state for submission status
  const [error, setError] = useState(""); // Added state for error messages

  const menuItems = ["about", "features", "pricing", "team"];

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to add email to waitlist");
      }

      setShowThankYou(true);
      setEmail("");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

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

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full"
            >
              <h2 className="text-3xl font-bold mb-4 text-teal-600 dark:text-teal-400">
                Join Our Waitlist
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition duration-300"
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
              {error && <p className="text-red-600">{error}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-teal-600 dark:text-teal-400">
                Thank You!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We've added you to our waitlist. We'll notify you as soon as we launch!
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="px-6 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
