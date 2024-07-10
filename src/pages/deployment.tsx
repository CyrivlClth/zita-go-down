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
import { NamespaceModel } from "@/model/kubernetes"
import { useStore } from "@/store/store"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"

const NamespaceComponent = () => {
  const [data, setData] = useState<NamespaceModel[]>([])
  const { selectNamespace } = useStore()

  useEffect(() => {
    KubeSphereApi.getNamespaces().then((value) => {
      setData(value)
    })
  }, [KubeSphereApi])

  return (
    <Select
      defaultValue={selectNamespace}
    >
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

export const DeployPage: React.FC = () => {
  return (
    <div>
      <NamespaceComponent />
    </div>
  )
}
