import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog"
import AddAssetSingle from "./AddAssetSingle"
import AddAssetMultiple from "./AddAssetMultiple"

export default function AddAsset() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" w-fit">Add Asset</Button>
      </DialogTrigger>
      <DialogContent className="w-[916px]">
        <div className=" flex">
          <AddAssetSingle />
          <Separator orientation="vertical" />
          <AddAssetMultiple />
        </div>
      </DialogContent>
    </Dialog>
  )
}
