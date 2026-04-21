import type { LoginCredentials, LoginResult } from '../types'

type AuthProvider = 'local' | 'auth0'

const AUTH_ENDPOINTS: Record<AuthProvider, string> = {
  local: '/auth/local/login',
  auth0: '/auth/auth0/login',
}

// TODO: Migrar a axios
export async function loginUser(
  credentials: LoginCredentials,
  provider: AuthProvider = 'local'
): Promise<LoginResult> {
  try {
    const res = await fetch(AUTH_ENDPOINTS[provider], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!res.ok) {
      const errorText = await res.text()
      return { success: false, error: errorText }
    }

    const data = await res.json()

    return {
      success: true,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }
  } catch {
    return {
      success: false,
      error: 'Error de red',
    }
  }
}