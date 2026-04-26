import Link from "next/link"
import { User, LogIn } from "lucide-react"
import type { NavLink } from "../../types/nav"

interface HeaderMobileNavProps {
  links: NavLink[]
  isOpen: boolean
  onClose: () => void
  isLoggedIn: boolean
}

export function HeaderMobileNav({
  links,
  isOpen,
  onClose,
  isLoggedIn,
}: HeaderMobileNavProps) {
  if (!isOpen) return null

  return (
    <nav id="mobile-nav" className="md:hidden py-4 border-t border-border">
      <div className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </Link>
        ))}

        <div className="my-2 border-t border-border" />

        {isLoggedIn ? (
          <Link
            href="/perfil"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
          >
            <User className="h-5 w-5" />
            Mi Perfil
          </Link>
        ) : (
          <Link
            href="/ingresar"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-base font-medium text-primary hover:bg-secondary rounded-md transition-colors"
          >
            <LogIn className="h-5 w-5" />
            Ingresar
          </Link>
        )}
      </div>
    </nav>
  )
}