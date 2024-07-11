import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { KubeSphereApi } from "@/api/kubesphere"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const LoginSchema = z.object({
  username: z.string().min(2, { message: "最少2个字符。" }),
  password: z.string().min(2, { message: "最少2个字符。" }),
})

export function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  function onSubmit(data: z.infer<typeof LoginSchema>) {
    setLoading(true)
    KubeSphereApi.login(data).finally(() => setLoading(false))
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto w-[350px] max-w-sm">
            <CardHeader>
              <CardTitle>登录以继续</CardTitle>
              <CardDescription>更快捷地维护Kubernetes。</CardDescription>
            </CardHeader>
            <CardContent className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input placeholder="输入登录的用户名或邮箱" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="输入登录的密码"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-row-reverse justify-between">
              <Button disabled={loading} type="submit">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                登录
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
