'use client'

import { Loader2, Check, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { LoadingState } from '@/types'
import type { ButtonHTMLAttributes } from 'react'

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  state: LoadingState
  loadingText?: string
  successText?: string
  errorText?: string
}

export function LoadingButton({
  state,
  loadingText = 'Cargando...',
  successText = 'Completado',
  errorText = 'Error',
  children,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  const isDisabled = disabled || state === 'loading'

  return (
    <button
      disabled={isDisabled}
      aria-busy={state === 'loading'}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        state === 'success' && 'bg-green-600 text-white hover:bg-green-600',
        state === 'error' && 'bg-destructive text-destructive-foreground hover:bg-destructive',
        state === 'loading' && 'cursor-wait',
        className,
      )}
      {...props}
    >
      {state === 'loading' && (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          <span>{loadingText}</span>
        </>
      )}
      {state === 'success' && (
        <>
          <Check className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>{successText}</span>
        </>
      )}
      {state === 'error' && (
        <>
          <X className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>{errorText}</span>
        </>
      )}
      {state === 'idle' && children}
    </button>
  )
}