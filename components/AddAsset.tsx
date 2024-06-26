import { useState } from "react"
import { useRouter } from "next/navigation"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddAssetSingle from "./AddAssetSingle"
import AddAssetMultiple from "./AddAssetMultiple"
import AddAssetLogin from "./AddAssetLogin"

import { cn } from "@/lib/utils"

export default function AddAsset() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  function closeWithMessage(text: string) {
    toast({
      duration: 1000,
      description: text
    })
    setIsOpen(false)
    router.push("/")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=" w-fit" onClick={() => setIsOpen(true)}>
          Add Asset
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn([
          {
            "w-[916px]": isAuthorized,
            "w-[400px]": !isAuthorized
          }
        ])}
      >
        {isAuthorized ? (
          <div className=" flex">
            <AddAssetSingle setClose={closeWithMessage} />
            <Separator orientation="vertical" />
            <AddAssetMultiple setClose={closeWithMessage} />
          </div>
        ) : (
          <AddAssetLogin setAuthorized={setIsAuthorized} />
        )}
      </DialogContent>
    </Dialog>
  )
}
