export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResult {
  success: boolean
  error?: string
}

export interface LoginFormState {
  email: string
  password: string
}