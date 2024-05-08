import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import CategorySelect from "./CategorySelect"

export default function AddAssetSingle() {
  return (
    <div className=" flex flex-col w-full">
      <h1 className="text-2xl font-bold text-center">Upload Single Asset</h1>
      <div className="grid items-center gap-1.5 p-4 w-full">
        <Label htmlFor="asset">Asset</Label>
        <Input id="asset" type="file" className=" mb-4" accept="image/*" />

        <Label htmlFor="category">Category</Label>
        <CategorySelect />

        <Button className=" w-full mt-4">Upload Asset</Button>
      </div>
    </div>
  )
}
