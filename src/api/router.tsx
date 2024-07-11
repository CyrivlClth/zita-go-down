import { NavigateFunction, useNavigate } from "react-router-dom"

export const globalRouter = { navigate: null } as {
  navigate: NavigateFunction | null
}

export const Component: React.FC<{ children: React.ReactElement }> = (
  props
) => {
  const navi = useNavigate()
  globalRouter.navigate = navi
  return <div>{props.children}</div>
}
