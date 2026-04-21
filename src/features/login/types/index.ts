export interface LoginCredentials {
  identifier: string
  password: string
}

export type LoginResult =
  | {
      success: true
      accessToken: string
      refreshToken: string
    }
  | {
      success: false
      error: string
    }