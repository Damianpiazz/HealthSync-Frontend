"use client";

import { signIn } from "@/auth";

type Props = {
  callbackUrl?: string;
  className?: string;
};

/**
 * Botón de login con Google usando Auth.js
 *
 * Este componente inicia el flujo de autenticación OAuth con Google.
 *
 * Decisión de implementación:
 * - Se utiliza un <form> con `action` porque `signIn` es una Server Action.
 * - En Next.js (App Router), las Server Actions solo pueden ejecutarse desde el servidor.
 * - El formulario permite invocar esa acción correctamente sin romper el flujo.
 *
 * Flujo:
 * 1. El usuario hace click en el botón
 * 2. Se ejecuta la Server Action (`signIn`)
 * 3. Auth.js redirige a Google
 * 4. Luego del login, vuelve a `callbackUrl`
 *
 * Nota:
 * - No se abstrae más lógica porque este componente solo actúa como disparador.
 * - Toda la lógica de autenticación está delegada a Auth.js.
 */

// TODO: Cambiar por button de shadcn
export function SignInGoogleButton({
  callbackUrl = "/",
  className,
}: Props) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: callbackUrl });
      }}
    >
      <button type="submit" className={className}>
        Continuar con Google
      </button>
    </form>
  );
}