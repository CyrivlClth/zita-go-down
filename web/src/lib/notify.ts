import { create } from "zustand"

interface NotificationStoreState {
  notify: (msg: string) => void
}

export const useNotificationStore = create<NotificationStoreState>(() => ({
  notify: (msg: string) => {
    // 这里添加通知逻辑
    console.error("API Error:", msg)
  },
}))
