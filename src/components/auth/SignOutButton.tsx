"use client";

import { signOut } from "@/auth";

type Props = {
  className?: string;
};

/**
 * Botón de cierre de sesión usando Auth.js
 *
 * Este componente finaliza la sesión del usuario actual.
 *
 * Decisión de implementación:
 * - Se utiliza un <form> con `action` porque `signOut` es una Server Action.
 * - En Next.js (App Router), las Server Actions deben ejecutarse desde el servidor.
 * - El formulario permite invocar correctamente la acción sin romper el flujo.
 *
 * Flujo:
 * 1. El usuario hace click en el botón
 * 2. Se ejecuta la Server Action (`signOut`)
 * 3. Auth.js elimina la sesión (cookies / JWT)
 * 4. El usuario es redirigido a `/login`
 *
 * Nota:
 * - No contiene lógica adicional: solo dispara el logout.
 * - La gestión de sesión está completamente delegada a Auth.js.
 */

// TODO: Cambiar por button de shadcn
export function SignOutButton({ className }: Props) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button type="submit" className={className}>
        Cerrar sesión
      </button>
    </form>
  );
}