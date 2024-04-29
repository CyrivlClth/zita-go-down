import { useNotificationStore } from "@/lib/notify"
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios"

interface ApiResponse<T = any> {
  code: number
  msg: string
  data?: T
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  console.log(config.url, config.method, config.params, config.data)
  return config
})

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    if (response.status !== 200) {
      useNotificationStore.getState().notify(`HTTP Error: ${response.status}`)
      return Promise.reject(new Error(`HTTP Error: ${response.status}`))
    }
    const { code, data, msg } = response.data
    if (code === 200) {
      return data
    }
    useNotificationStore.getState().notify(msg)
    return Promise.reject(new Error(msg))
  },
  (error: AxiosError) => {
    const customError = new Error(error.message)
    return Promise.reject(customError)
  }
)

export default api
