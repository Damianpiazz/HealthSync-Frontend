import Link from "next/link"
import type { NavLink } from "../../types/nav"

interface HeaderNavProps {
  links: NavLink[]
}

export function HeaderNav({ links }: HeaderNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </Link>
      ))}
    </nav>
  )
}