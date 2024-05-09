import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddAssetSingle from "./AddAssetSingle"
import AddAssetMultiple from "./AddAssetMultiple"

export default function AddAsset() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=" w-fit" onClick={() => setIsOpen(true)}>
          Add Asset
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[916px]">
        <div className=" flex">
          <AddAssetSingle />
          <Separator orientation="vertical" />
          <AddAssetMultiple
            setClose={() => {
              setIsOpen(false)
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
