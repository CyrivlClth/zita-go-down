import { toast } from "@/components/ui/use-toast"
import { useStore } from "@/store/store"
import axios from "axios"

const api = axios.create({})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    toast({ title: "error", description: error?.message })
    return Promise.reject(error)
  }
)

export const KubeSphereApi = {
  getNamespaces: async () => {
    return (
      (
        await api.get("/kapi/api/v1/namespaces", {
          headers: {
            Authorization: `Bearer ${useStore.getState().kubeToken}`,
          },
        })
      ).data.items || []
    )
  },
}
