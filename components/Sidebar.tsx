"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import CategorySelect from "./CategorySelect"

import { Format } from "@/constants"
import { objectToQueryString } from "@/lib/utils"

type SidebarProps = {
  query: QueryParams
}

const formSchema = z.object({
  formats: z.array(z.string()),
  category: z.string()
})

export default function Sidebar({ query }: SidebarProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formats: query.format,
      category: query.category
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newQuery = {
      page: 1,
      search: query.search,
      format: values.formats,
      category: values.category
    }
    const queryString = objectToQueryString(newQuery)
    router.push(`/?${queryString}`)
  }

  return (
    <div className=" p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2 className=" font-bold text-2xl mb-6">Filters</h2>
          <h3 className=" font-bold text-lg mb-3">File Format</h3>
          <Separator />
          <div className=" space-y-3 mt-4">
            {Format.map((item) => (
              <FormField
                key={item.key}
                control={form.control}
                name="formats"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.key}
                      className="flex flex-row items-start space-x-3 space-y-0 mt-4"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.key)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.key])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.key
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <h3 className=" font-bold text-lg mb-3 mt-4">Category</h3>
          <Separator className=" mb-5" />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <CategorySelect
                field={field}
                onSelect={(value) => {
                  form.setValue("category", value)
                }}
              />
            )}
          />
          <Button className=" w-full mt-5" type="submit">
            Filter
          </Button>
        </form>
      </Form>
    </div>
  )
}
