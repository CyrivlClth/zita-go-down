import { createHashRouter } from "react-router-dom"
import { DeployPage } from "./pages/deployment"
import { Component } from "./api/router"
import { LoginPage } from "./pages/login"

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <Component>
        <DeployPage />
      </Component>
    ),
  },
  {
    path: "/login",
    element: (
      <Component>
        <LoginPage />
      </Component>
    ),
  },
])
