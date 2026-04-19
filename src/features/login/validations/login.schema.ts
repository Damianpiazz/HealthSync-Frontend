import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'El usuario es requerido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export type LoginSchema = z.infer<typeof loginSchema>