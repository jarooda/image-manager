"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { saveAsset } from "@/app/actions"

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

import { addHttps } from "@/lib/utils"

const formSchema = z.object({
  asset: z.string().min(1, {
    message: "Must not be empty"
  })
})

export default function AddAssetMultiple({
  setClose
}: {
  setClose: (message: string) => void
}) {
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

    saveAsset(assets)
    setClose('Saving to database...')
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
                      className="resize-none h-[124px]"
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
