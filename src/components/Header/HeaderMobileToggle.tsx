import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderMobileToggleProps {
  isOpen: boolean
  onToggle: () => void
}

export function HeaderMobileToggle({ isOpen, onToggle }: HeaderMobileToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={onToggle}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  )
}