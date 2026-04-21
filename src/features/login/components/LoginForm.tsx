'use client'

import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { LoginSchema } from '@/features/login/validations/login.schema'
import type { LoadingState } from '@/shared/types'
import { LoadingButton } from '@/shared/components/LoadingButton'
import authText from '@/features/login/config/login.json'

interface LoginFormProps {
  form: UseFormReturn<LoginSchema, any, LoginSchema>
  state: LoadingState
  serverError: string | null
  onSubmit: () => void
}

export function LoginForm({ form, state, serverError, onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    formState: { errors },
  } = form

  const t = authText.login

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">

      {/* Error servidor */}
      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {serverError}
        </div>
      )}

      {/* Identifier: email | usuario | DNI */}
      <div className="space-y-1.5">
        <label htmlFor="identifier" className="text-sm font-medium text-foreground">
          {t.identifierLabel}
        </label>

        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

          <input
            id="identifier"
            type="text"
            autoComplete="username"
            placeholder={t.identifierPlaceholder}
            aria-invalid={!!errors.identifier}
            aria-describedby={errors.identifier ? 'identifier-error' : undefined}
            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            {...register('identifier')}
          />
        </div>

        {errors.identifier && (
          <p id="identifier-error" role="alert" className="text-xs text-destructive">
            {errors.identifier.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">

        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            {t.passwordLabel}
          </label>

          <Link
            href="/recuperar-password"
            className="text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {t.forgotPassword}
          </Link>
        </div>

        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

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

          <button
            type="button"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p id="password-error" role="alert" className="text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <LoadingButton
        type="submit"
        state={state}
        className="w-full"
        loadingText={t.loading}
        successText={t.success}
        errorText={t.error}
      >
        {t.submit}
      </LoadingButton>

      {/* Registro */}
      <p className="text-center text-sm text-muted-foreground">
        {t.noAccount}{' '}
        <Link href="/registro" className="text-primary hover:underline">
          {t.register}
        </Link>
      </p>
    </form>
  )
}