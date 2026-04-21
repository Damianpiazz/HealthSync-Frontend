import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy (Next.js 16)
 *
 * Este archivo actúa como punto de entrada global para interceptar requests
 * antes de que lleguen a tus rutas o páginas.
 *
 * Responsabilidad principal:
 * - Obtener la sesión actual del usuario usando Auth.js (auth())
 * - Permitir o bloquear el acceso a rutas según autenticación
 * - Mantener la sesión activa (refresh automático en cada request)
 *
 * Cómo funciona:
 * 1. Next.js ejecuta esta función en cada request que matchee el config.matcher
 * 2. auth() lee la sesión (cookie/JWT) y devuelve:
 *    - null → usuario no autenticado
 *    - session → usuario autenticado
 * 3. Con esa información podés:
 *    - proteger rutas privadas
 *    - redirigir usuarios
 *    - aplicar lógica global (headers, logging, etc.)
 *
 * Ejemplo típico:
 * - Bloquear acceso a rutas privadas si no hay sesión
 * - Redirigir a /login
 *
 * Importante:
 * - Este archivo reemplaza middleware.ts en Next.js 16
 * - Solo se ejecuta en el servidor (Edge Runtime)
 * - Debe ser liviano (evitar lógica pesada)
 *
 * Posibles extensiones:
 * - Validación de roles (admin/user)
 * - Validación de JWT de backend (FastAPI)
 * - Inyección de headers con tokens
 * - Logging o métricas
 */

export async function proxy(request: NextRequest) {
  const session = await auth();

  const isPrivateRoute = request.nextUrl.pathname.startsWith("/(private)");

  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

/*
 * Configuración del matcher
 *
 * Define en qué rutas se ejecuta este proxy.
 *
 * Ejemplo:
 * matcher: ["/((?!api|_next|favicon.ico).*)"]
 *
 * Significa:
 * - Se ejecuta en todas las rutas
 * - Excepto:
 *   - /api
 *   - archivos estáticos (_next)
 *   - favicon
 *
 * Alternativas:
 * - Solo privadas: ["/(private)/:path*"]
 * - Todo el sitio: ["/*"]
 */
export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};