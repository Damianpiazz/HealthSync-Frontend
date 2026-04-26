import { Home, Calendar, MapPin } from "lucide-react"
import type { NavLink } from "@/types/nav"

export const defaultNavLinks: NavLink[] = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/turnos", label: "Sacar Turno", icon: Calendar },
  { href: "/ubicacion", label: "Donde Estamos", icon: MapPin },
]