'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Algo salió mal
        </h1>
        <p className="text-sm text-muted-foreground">
          {error.message ?? 'Ocurrió un error inesperado.'}
        </p>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex h-10 items-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="flex h-10 items-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}