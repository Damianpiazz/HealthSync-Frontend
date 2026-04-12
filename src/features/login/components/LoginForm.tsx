'use client'

import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { LoginSchema } from '@/features/login/validations/login.schema'
import type { LoadingState } from '@/shared/types'
import { LoadingButton } from '@/shared/components/LoadingButton'

interface LoginFormProps {
  form: UseFormReturn<LoginSchema>
  state: LoadingState
  serverError: string | null
  onSubmit: () => void
}

/**
 * Componente de formulario de login.
 * Encargado de renderizar inputs, validaciones y UI de autenticacion.
 * Recibe control del formulario desde react-hook-form y estado externo del hook useLogin.
 */
export function LoginForm({ form, state, serverError, onSubmit }: LoginFormProps) {
  // Estado local para mostrar/ocultar password
  const [showPassword, setShowPassword] = useState(false)

  // Extrae funciones y errores del formulario
  const { register, formState: { errors } } = form

  return (
    // Formulario principal de login
    <form onSubmit={onSubmit} noValidate className="space-y-5">

      {/* Error general del servidor (login fallido) */}
      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {serverError}
        </div>
      )}

      {/* Campo Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>

        <div className="relative">
          {/* Icono decorativo */}
          <Mail
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

          {/* Input de email controlado por react-hook-form */}
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            {...register('email')}
          />
        </div>

        {/* Mensaje de error de email */}
        {errors.email && (
          <p id="email-error" role="alert" className="text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Campo Password */}
      <div className="space-y-1.5">

        {/* Label + link de recuperacion */}
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Contraseña
          </label>

          {/* Link a recuperacion de password */}
          <Link
            href="/recuperar-password"
            className="text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="relative">
          {/* Icono de lock */}
          <Lock
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

          {/* Input de password con toggle de visibilidad */}
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            {...register('password')}
          />

          {/* Boton para mostrar/ocultar password */}
          <button
            type="button"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Error de password */}
        {errors.password && (
          <p id="password-error" role="alert" className="text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Boton de submit con estados de loading/success/error */}
      <LoadingButton
        type="submit"
        state={state}
        className="w-full"
        loadingText="Iniciando sesión..."
        successText="¡Bienvenido!"
        errorText="Error al iniciar sesión"
      >
        Iniciar sesión
      </LoadingButton>

      {/* Link a registro */}
      <p className="text-center text-sm text-muted-foreground">
        ¿No tienes cuenta?{' '}
        <Link href="/registro" className="text-primary hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  )
}