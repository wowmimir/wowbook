"use client"

import Link from "next/link"
import Image from "next/image"
import React from "react"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"

const Navbar = () => {
  const NavItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" }
  ]

  const pathname = usePathname()
  const {user} = useUser()
  return (
    <header className="w-full fixed z-50 bg-(--bg-primary)">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        
        <Link href="/" className="flex gap-0.5 items-center">
          <Image
            src="/assets/logo.png"
            alt="WowBook"
            width={42}
            height={26}
            priority
          />
          <span className="logo-text">WowBook</span>
        </Link>

        <nav className="w-fit flex gap-7 items-center">
          {NavItems.map(({ label, href }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href))

            return (
              <Link
                key={label}
                href={href}
                className={`nav-link-base ${
                  isActive ? "nav-link-active" : "text-(--text-primary)"
                }`}
              >
                {label}
              </Link>
            )
          })}
          <div className="flex gap-7 items-center">
          <SignedOut>
            <SignInButton mode = "modal"/>
          </SignedOut>
          <SignedIn>
            <div className="nav-user-link">

              <UserButton/>
              {user?.firstName && (
                <Link href = "/subscriptions" className="nav-user-name">{user.firstName}</Link>
              )}
            </div>
          </SignedIn>
          </div>
        </nav>

      </div>
    </header>
  )
}

export default Navbar