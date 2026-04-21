import { handlers } from "@/auth";

/**
 * Auth Route Handlers (Next.js App Router)
 *
 * Este archivo expone los handlers HTTP necesarios para que Auth.js funcione
 * dentro del sistema de rutas de Next.js (App Router).
 *
 * Qué hace:
 * - Conecta Auth.js con las rutas API de Next.js
 * - Maneja automáticamente todas las operaciones de autenticación:
 *   - login (sign in)
 *   - logout (sign out)
 *   - callbacks de providers
 *   - manejo de sesión (JWT / cookies)
 *
 * Cómo funciona:
 * - NextAuth() devuelve un objeto llamado `handlers`
 * - Ese objeto contiene funciones HTTP listas para usar: GET y POST
 * - Next.js las usa automáticamente según el tipo de request
 *
 * Ejemplo de endpoints generados:
 * - GET  /api/auth/session
 * - POST /api/auth/signin/google
 * - POST /api/auth/signout
 * - GET  /api/auth/callback/google
 *
 * Importante:
 * - No necesitas implementar lógica acá
 * - Todo el comportamiento está definido en `src/auth/index.ts`
 * - Este archivo solo actúa como "puente" entre Next.js y Auth.js
 *
 * Ubicación esperada:
 * src/app/api/auth/[...nextauth]/route.ts
 *
 * Esto permite que Auth.js capture todas las rutas bajo /api/auth/*
 */
export const { GET, POST } = handlers;