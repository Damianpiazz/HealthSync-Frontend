import Link from 'next/link'
import { LoginContainer } from '@/features/login/components/LoginContainer'
import authText from '@/features/login/config/login.json'

export default function LoginPage() {
  
  const t = authText.login

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {t.title}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t.subtitle}
            </p>
          </div>

          <LoginContainer />
        </div>
      </div>
    </main>
  )
}