import { toast } from "@/components/ui/use-toast"
import { useStore } from "@/store/store"
import axios from "axios"
import { globalRouter } from "./router"

const api = axios.create({})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (globalRouter.navigate) {
      globalRouter.navigate("/login")
    }
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
  login: async (form: { username: string; password: string }) => {
    const response = await api.post(
      "/kapi/oauth/token",
      {
        grant_type: "password",
        client_id: "kubesphere",
        client_secret: "kubesphere",
        ...form,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    useStore.getState().setKubeToken(response?.data?.access_token)
    globalRouter.navigate?.("/")
  },
}
