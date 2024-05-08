import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import CategorySelect from "./CategorySelect"

import { Format } from "@/constants"

export default function Sidebar() {
  return (
    <div className=" p-4">
      <h2 className=" font-bold text-2xl mb-6">Filters</h2>
      <h3 className=" font-bold text-lg mb-3">File Format</h3>
      <Separator />
      <div className=" space-y-3 mt-4">
        {Format.map((item) => (
          <div key={item.key} className=" flex gap-2 items-center">
            <Checkbox key={item.key} />
            {item.label}
          </div>
        ))}
      </div>
      <h3 className=" font-bold text-lg mb-3 mt-4">Category</h3>
      <Separator className=" mb-5" />
      <CategorySelect />
    </div>
  )
}
