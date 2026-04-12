'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { loginSchema, type LoginSchema } from '../validations/login.schema'
import { loginUser } from '../services/login.service'
import type { LoadingState } from '@/shared/types'

/**
 * Hook personalizado que encapsula toda la logica del login.
 * Maneja formulario, validacion, estado de carga y redireccion.
 */
export function useLogin() {
  // Router de Next.js para navegacion programatica
  const router = useRouter()

  // Estado del proceso de login: idle | loading | success | error
  const [state, setState] = useState<LoadingState>('idle')

  // Error devuelto por el backend (si el login falla)
  const [serverError, setServerError] = useState<string | null>(null)

  /**
   * Configuracion del formulario usando React Hook Form
   * con validacion basada en Zod
   */
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  /**
   * Funcion que se ejecuta al enviar el formulario
   * Maneja llamada al backend y control de estados
   */
  const onSubmit = async (data: LoginSchema) => {
    setServerError(null)
    setState('loading')

    // Llamada al backend para autenticar usuario
    const result = await loginUser(data)

    // Si el login es exitoso
    if (result.success) {
      setState('success')

      // Redirige al home luego de un pequeno delay
      setTimeout(() => router.push('/'), 500)
    } else {
      // Si ocurre un error en el login
      setState('error')

      // Guarda el mensaje de error del servidor o uno por defecto
      setServerError(result.error ?? 'Error al iniciar sesion')

      // Vuelve al estado inicial luego de mostrar error
      setTimeout(() => setState('idle'), 2000)
    }
  }

  /**
   * Retorna todo lo necesario para usar el login en un componente:
   * - form: control de React Hook Form
   * - state: estado de carga
   * - serverError: error del backend
   * - onSubmit: handler listo para el form
   */
  return {
    form,
    state,
    serverError,
    onSubmit: form.handleSubmit(onSubmit),
  }
}