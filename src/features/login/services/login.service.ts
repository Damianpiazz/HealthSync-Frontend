import type { LoginCredentials, LoginResult } from '../types'

// llamada a la api simulada para el login
export async function loginUser(credentials: LoginCredentials): Promise<LoginResult> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (credentials.email === 'error@test.com') {
    return { success: false, error: 'Credenciales inválidas' }
  }

  return { success: true }
}