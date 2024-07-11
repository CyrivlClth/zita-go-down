import { KubeSphereApi } from "@/api/kubesphere"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TableBody,
  TableCaption,
  TableCell,
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeploymentModel, NamespaceModel } from "@/model/kubernetes"
import { useStore } from "@/store/store"
import { useEffect, useState } from "react"

const NamespaceComponent = () => {
  const [data, setData] = useState<NamespaceModel[]>([])
  const { selectNamespace } = useStore()

  useEffect(() => {
    setData([{ metadata: { name: "test", uid: "1" } }])
    return
    KubeSphereApi.getNamespaces().then((value) => {
      setData(value)
    })
  }, [KubeSphereApi])

  return (
    <Select defaultValue={selectNamespace}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a namespace" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Namespaces</SelectLabel>
          {data.map((namesapce) => (
            <SelectItem
              key={namesapce.metadata.uid}
              value={namesapce.metadata.name}
            >
              {namesapce.metadata.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const DeployTable: React.FC = () => {
  const [deployments, setDeployments] = useState<DeploymentModel[]>([
    { metadata: { name: "app1", namespace: "test" } },
  ])

  useEffect(() => {
    setDeployments([{ metadata: { name: "app1", namespace: "test" } }])
  }, [])

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Pod</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Tag</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deployments.map((deploy) => (
          <TableRow key={deploy.metadata.name}>
            <TableCell className="font-medium">
              {deploy.metadata.name}
            </TableCell>
            <TableCell>{deploy.metadata.name}</TableCell>
            <TableCell>{deploy.metadata.name}</TableCell>
            <TableCell>{deploy.metadata.name}</TableCell>
            <TableCell className="text-right">{deploy.metadata.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const DeployPage: React.FC = () => {
  return (
    <div className="space-y-6 m-8">
      <NamespaceComponent />
      <DeployTable />
    </div>
  )
}
