"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { saveAsset } from "@/app/actions"

import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import TooltipIcon from "./TooltipIcon"

const formSchema = z.object({
  asset: z.string().min(1, {
    message: "Must not be empty"
  })
})

function addHttps(url: string) {
  return url.startsWith("http") ? url : `https://${url}`
}

export default function AddAssetMultiple({
  setClose
}: {
  setClose: () => void
}) {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const assets: SaveAssetPayload[] = values.asset.split("\n").map((asset) => {
      const [url, category] = asset.split("#")
      const strings = url.split(".")
      const format = strings[strings.length - 1]

      return {
        url: addHttps(url),
        category,
        format
      }
    })

    assets.forEach((asset: SaveAssetPayload) => {
      saveAsset(asset)
    })

    toast({
      duration: 1000,
      description: 'Saving to database...'
    })
    setClose()
    router.push("/")
  }

  return (
    <div className=" flex flex-col w-full">
      <h1 className="text-2xl font-bold text-center">Save Multiple Assets</h1>
      <div className="grid items-center gap-1.5 p-4 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="asset"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="asset">
                    Assets{" "}
                    <TooltipIcon tooltip="Use format url#category | category must lowercase & kebab-case" />
                  </Label>
                  <FormControl>
                    <Textarea
                      className="resize-none h-[116px]"
                      placeholder={`https://example.com/image1.jpg#error-state
https://example.com/image2.jpg`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className=" w-full mt-4" type="submit">
              Save Assets
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
