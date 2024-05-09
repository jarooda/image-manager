"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import AddAsset from "./AddAsset"

import { objectToQueryString } from "@/lib/utils"

type NavbarProps = {
  query: QueryParams
}

const formSchema = z.object({
  search: z.string()
})

export default function Navbar({ query }: NavbarProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.search
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newQuery = {
      ...query,
      page: 1,
      search: values.search
    }
    const queryString = objectToQueryString(newQuery)

    router.push(`/?${queryString}`)
  }

  return (
    <nav className=" w-screen grid grid-cols-3 p-4">
      <AddAsset />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex">
                    <Input
                      className=" w-96 rounded-r-none"
                      type="search"
                      placeholder="E.g. konfirmasi"
                      {...field}
                    />
                    <Button className=" rounded-l-none" type="submit">
                      Search
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div />
    </nav>
  )
}
