import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          🗿 Primeros pasos en Next.js
        </h1>
        <Link
          href="/login"
          className="flex h-10 items-center rounded-lg bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Ir al login
        </Link>
      </div>
    </div>
  )
}