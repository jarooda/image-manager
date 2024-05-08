import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AddAsset from "./AddAsset"

export default function Navbar() {
  return (
    <nav className=" w-screen grid grid-cols-3 p-4">
      <AddAsset />
      <div className=" flex">
        <Input
          className=" w-96 rounded-r-none"
          type="search"
          placeholder="E.g. konfirmasi"
        />
        <Button className=" rounded-l-none">Search</Button>
      </div>
      <div></div>
    </nav>
  )
}
