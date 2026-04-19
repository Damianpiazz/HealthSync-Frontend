import type { LoginCredentials, LoginResult } from '../types'

type AuthProvider = 'local' | 'auth0'

export async function loginUser(
  credentials: LoginCredentials,
  provider: AuthProvider = 'local'
): Promise<LoginResult> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const { identifier, password } = credentials

  // credenciales inválidas
  if (identifier === 'error@test.com' || password === 'wrong') {
    return {
      success: false,
      error: 'Credenciales inválidas',
    }
  }

  // usuario bloqueado
  if (identifier === 'blocked@test.com') {
    return {
      success: false,
      error: 'Usuario bloqueado',
    }
  }

  // error servidor
  if (identifier === 'server@test.com') {
    return {
      success: false,
      error: 'Error interno del servidor',
    }
  }

  // éxito
  return {
    success: true,
    accessToken: `mock_access_${Date.now()}`,
    refreshToken: `mock_refresh_${Date.now()}`,
  }
}