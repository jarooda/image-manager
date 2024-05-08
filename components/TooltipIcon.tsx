import { CircleHelp } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"

type TooltipIconProps = {
  tooltip: string
}

export default function TooltipIcon({ tooltip }: TooltipIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CircleHelp className=" w-3 h-3 font-bold" />
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-sm">{tooltip}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
