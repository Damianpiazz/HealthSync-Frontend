'use client'

import { useLogin } from '@/features/login/hooks/useLogin'
import { LoginForm } from '@/features/login/components/LoginForm'
/**
* LoginContainer conecta el hook useLogin (lógica de negocio)
* con el componente LoginForm (UI pura).
* Este es el único límite de 'usar cliente' necesario para el flujo de inicio de sesión.
*/
export function LoginContainer() {
  const { form, state, serverError, onSubmit } = useLogin()

  return (
    <LoginForm
      form={form}
      state={state}
      serverError={serverError}
      onSubmit={onSubmit}
    />
  )
}