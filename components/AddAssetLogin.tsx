"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { authorizeUser } from "@/app/actions"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

type AddAssetLoginProps = {
  setAuthorized: (isAuthorized: boolean) => void
}

const formSchema = z.object({
  password: z.string().min(1, {
    message: "Must not be empty"
  })
})

export default function AddAssetLogin({ setAuthorized }: AddAssetLoginProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const password = values.password

    authorizeUser(password)
      .then((res) => {
        if (res) {
          setAuthorized(true)
        } else {
          toast({
            variant: "destructive",
            description: "Password is incorrect",
            duration: 1000
          })
        }
      })
      .catch((error) => {
        console.error(error)
        toast({
          description: "Error occurred"
        })
      })
  }

  return (
    <div className=" flex flex-col w-full">
      <h1 className="text-2xl font-bold text-center mb-4">Unlock Add Asset</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex">
                    <Input
                      className=" w-full rounded-r-none"
                      type="password"
                      placeholder="Input password"
                      {...field}
                    />
                    <Button className=" rounded-l-none" type="submit">
                      Unlock
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
