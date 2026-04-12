'use server'

import { redirect } from 'next/navigation'
import { loginSchema } from '../validations/login.schema'

/**
 * Server Action para el login.
 *
 * Al tener 'use server', esta función corre exclusivamente en el servidor.
 * Nunca se expone al cliente — ni la lógica ni las credenciales que maneja.
 *
 * Se puede invocar de dos formas:
 * - Directamente como action de un <form action={loginAction}>
 * - Desde un hook con useTransition para tener feedback de loading
 *
 * Recibe un FormData porque así es como Next.js pasa los datos
 * cuando se usa como action de formulario nativo.
 */
export async function loginAction(formData: FormData) {
  // Extraemos los campos del FormData como strings crudos
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  // Validamos con el mismo schema de Zod que usa el cliente,
  // porque nunca hay que confiar en que el frontend ya validó
  const parsed = loginSchema.safeParse(raw)

  if (!parsed.success) {
    // Devolvemos el primer error de validación para mostrarlo en el formulario.
    // No hacemos redirect — el componente que llamó a la action
    // es responsable de manejar este caso
    return { error: parsed.error.issues[0].message }
  }

  // Acá iría la llamada al backend real, por ejemplo:
  // const result = await loginUser(parsed.data)
  // if (!result.success) return { error: result.error }

  // redirect() lanza una excepción internamente que Next.js intercepta,
  // por eso tiene que estar fuera de cualquier try/catch
  redirect('/')
}