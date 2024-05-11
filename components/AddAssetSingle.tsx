"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { uploadMedia, saveAsset } from "@/app/actions"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import CategorySelect from "./CategorySelect"

const MAX_FILE_SIZE = 1000000 // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "image/webp"
]
const formSchema = z.object({
  file: z.any().refine((file) => {
    if (!file) return false
    if (file.size > MAX_FILE_SIZE) return false
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return false
    return true
  }),
  category: z.string().min(1, {
    message: "Must not be empty"
  })
})

export default function AddAssetSingle({
  setClose
}: {
  setClose: (message: string) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { file, category } = values
    const name = file.name.replace(/\s/g,'-')
    const type = file.type.split("/")[1]
    const format = type === "svg+xml" ? "svg" : type
    const fileName = `${category}/${name}`

    const formData = new FormData()
    formData.append("file", file)
    formData.append("name", fileName)

    const upload = await uploadMedia(formData)

    if (upload.status) {
      const payload: SaveAssetPayload = {
        url: upload.imageUrl,
        category,
        format
      }

      await saveAsset([payload])
    }

    setClose("Saving to database...")
  }

  return (
    <div className=" flex flex-col w-full">
      <h1 className="text-2xl font-bold text-center">Upload Single Asset</h1>
      <div className="grid items-center gap-1.5 p-4 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <Label htmlFor="file">Asset</Label>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      className=" mb-4"
                      accept="image/webp"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className=" mt-3">
                  <Label htmlFor="category">Category</Label>
                  <CategorySelect
                    field={field}
                    onSelect={(value) => {
                      form.setValue("category", value)
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className=" w-full mt-4" type="submit">
              Upload Asset
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
