export type NamespaceModel = {
  metadata: {
    name: string
    uid: string
  }
}
export type DeploymentModel = {
  metadata: {
    name: string
    namespace: string
  }
}
