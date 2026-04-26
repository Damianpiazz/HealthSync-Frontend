"use client"

import { useState } from "react"
import { HeaderLogo } from "./HeaderLogo"
import { HeaderNav } from "./HeaderNav"
import { HeaderAuth } from "./HeaderAuth"
import { HeaderMobileToggle } from "./HeaderMobileToggle"
import { HeaderMobileNav } from "./HeaderMobileNav"
import { defaultNavLinks } from "./config"  
import type { NavLink } from "../../types/nav"

interface HeaderProps {
  links?: NavLink[]
  isLoggedIn: boolean
  logo?: {
    title: string
    subtitle?: string
    href?: string
  }
  onMobileMenuChange?: (open: boolean) => void
}

export function Header({
  links = defaultNavLinks,
  isLoggedIn,
  logo = { title: "Policlínica Tiscornia", subtitle: "Centermed S.A." },
  onMobileMenuChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleToggle = () => {
    const next = !mobileMenuOpen
    setMobileMenuOpen(next)
    onMobileMenuChange?.(next)
  }

  const handleClose = () => {
    setMobileMenuOpen(false)
    onMobileMenuChange?.(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <HeaderLogo
            title={logo.title}
            subtitle={logo.subtitle}
            href={logo.href}
          />

          <HeaderNav links={links} />

          <HeaderAuth isLoggedIn={isLoggedIn} />

          <HeaderMobileToggle isOpen={mobileMenuOpen} onToggle={handleToggle} />
        </div>

        <HeaderMobileNav
          links={links}
          isOpen={mobileMenuOpen}
          onClose={handleClose}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </header>
  )
}