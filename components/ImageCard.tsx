"use client"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useToast } from "@/components/ui/use-toast"

type ImageCardProps = {
  image: {
    src: string
    alt: string
  }
}

export default function ImageCard({ image }: ImageCardProps) {
  const { toast } = useToast()
  const copyToClipboard = () => {
    navigator.clipboard.writeText(image.src)
    toast({
      duration: 1000,
      description: "Link copied to clipboard"
    })
  }

  return (
    <button
      className=" w-52 hover:border border-primary p-2 rounded-md cursor-copy"
      onClick={() => copyToClipboard()}
    >
      <AspectRatio ratio={1 / 1}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="rounded-md object-contain"
        />
      </AspectRatio>
      <span className=" text-xs break-all">{image.src}</span>
    </button>
  )
}
