import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import TooltipIcon from "./TooltipIcon"

export default function AddAssetMultiple() {
  return (
    <div className=" flex flex-col w-full">
      <h1 className="text-2xl font-bold text-center">Save Multiple Assets</h1>
      <div className="grid items-center gap-1.5 p-4 w-full">
        <Label htmlFor="asset">
          Assets{" "}
          <TooltipIcon tooltip="Use format url#category | category must lowercase & kebab-case" />
        </Label>
        <Textarea
          id="asset"
          className=" h-[122px]"
          placeholder={`https://example.com/image1.jpg#error-state
https://example.com/image2.jpg`}
        />

        <Button className=" w-full mt-4">Save Assets</Button>
      </div>
    </div>
  )
}
