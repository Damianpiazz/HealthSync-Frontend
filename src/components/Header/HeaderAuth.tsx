import Link from "next/link"
import { User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderAuthProps {
  isLoggedIn: boolean
  renderLoggedIn?: React.ReactNode
  renderLoggedOut?: React.ReactNode
}

function DefaultLoggedIn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">Menú de usuario</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
        <DropdownMenuItem>Mis Turnos</DropdownMenuItem>
        <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DefaultLoggedOut() {
  return (
    <Button asChild>
      <Link href="/ingresar" className="flex items-center gap-2">
        <LogIn className="h-4 w-4" />
        Ingresar
      </Link>
    </Button>
  )
}

export function HeaderAuth({
  isLoggedIn,
  renderLoggedIn,
  renderLoggedOut,
}: HeaderAuthProps) {
  return (
    <div className="hidden md:flex items-center gap-2">
      {isLoggedIn
        ? (renderLoggedIn ?? <DefaultLoggedIn />)
        : (renderLoggedOut ?? <DefaultLoggedOut />)}
    </div>
  )
}