import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export type Storage = {
  kubeToken?: string
  selectNamespace?: string
  setNamespace: (namespace?: string) => void
  setKubeToken: (token?: string) => void
}

export const useStore = create<Storage>()(
  devtools(
    persist(
      (set) => ({
        setNamespace: (namespace?: string) => {
          set((state) => ({ ...state, namespace: namespace }))
        },
        setKubeToken: (token?: string) => {
          set((state) => ({ ...state, kubeToken: token }))
        },
      }),
      { name: "zita-store" }
    )
  )
)
