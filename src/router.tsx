import { createHashRouter } from "react-router-dom"
import { DeployPage } from "./pages/deployment"

export const router = createHashRouter([
  {
    path: "/",
    element: <DeployPage />,
  },
])
