import Link from "next/link"

interface HeaderLogoProps {
  title: string
  subtitle?: string
  href?: string
}

export function HeaderLogo({ title, subtitle, href = "/" }: HeaderLogoProps) {
  return (
    <Link href={href} className="flex flex-col">
      <span className="text-lg font-bold text-primary leading-tight">{title}</span>
      {subtitle && (
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      )}
    </Link>
  )
}