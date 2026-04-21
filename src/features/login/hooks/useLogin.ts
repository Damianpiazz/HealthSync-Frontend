'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { loginSchema, type LoginSchema } from '../validations/login.schema'
import { loginUser } from '../services/login.service.mock'
import type { LoadingState } from '@/types'

export function useLogin() {
  const router = useRouter()

  const [state, setState] = useState<LoadingState>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<LoginSchema, any, LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginSchema) => {
    setServerError(null)
    setState('loading')

    const normalizedData = {
      ...data,
      identifier: data.identifier.trim().toLowerCase(),
    }

    const result = await loginUser(normalizedData)

    if (result.success) {
      setState('success')

      // Solo demo
      localStorage.setItem('accessToken', result.accessToken)
      localStorage.setItem('refreshToken', result.refreshToken)

      setTimeout(() => router.push('/'), 500)
    } else {
      setState('error')
      setServerError(result.error)
      setTimeout(() => setState('idle'), 2000)
    }
  }

  return {
    form,
    state,
    serverError,
    onSubmit: form.handleSubmit(onSubmit),
  }
}