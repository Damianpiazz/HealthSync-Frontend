import { create } from 'zustand'
import type { LoadingState } from '@/shared/types'

/**
 * En este caso el store es overkill — el estado de loading y error
 * vive bien con useState local en el hook.
 *
 * Usá un store cuando el estado necesite:
 * - Sobrevivir navegaciones entre páginas
 * - Compartirse entre componentes que no están en el mismo árbol
 *
 * Ejemplos reales donde sí tiene sentido:
 * - Estado de sesión del usuario (navbar + rutas protegidas)
 * - Toast/notificaciones globales
 * - Carrito de compras
 */
export const useLoginStore = create<LoginStore>((set) => ({
  state: 'idle',
  serverError: null,
  setState: (state) => set({ state }),
  setServerError: (serverError) => set({ serverError }),
  reset: () => set({ state: 'idle', serverError: null }),
}))

interface LoginStore {
  state: LoadingState
  serverError: string | null
  setState: (state: LoadingState) => void
  setServerError: (error: string | null) => void
  reset: () => void
}