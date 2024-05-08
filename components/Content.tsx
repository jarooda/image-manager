"use client"

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { useToast } from "@/components/ui/use-toast"

export default function Content() {
  const { toast } = useToast()

  const imageLists = [
    {
      src: "https://cdn.sekolah.mu/assets/socialmedia/linkedin.svg",
      alt: "Image 1"
    },
    {
      src: "https://cdn.sekolah.mu/assets/addon_variant/icons/radio_active.svg",
      alt: "Image 2"
    },
    {
      src: "https://cdn.sekolah.mu/assets/living/navbar/english-v2.webp",
      alt: "Image 3"
    },
    {
      src: "https://cdn.sekolah.mu/assets/v2/halaman-akun/padlock.webp",
      alt: "Image 4"
    },
    {
      src: "https://cdn.sekolah.mu/assets/v2/halaman-belajar/sudah-ditutup.png",
      alt: "Image 1"
    },
    {
      src: "https://cdn.sekolah.mu/assets/living/living-english/sd-full.webp",
      alt: "Image 2"
    },
    {
      src: "https://cdn.sekolah.mu/assets/v2/login-relation/success-register-children.png",
      alt: "Image 3"
    },
    {
      src: "https://cdn.sekolah.mu/assets/product-illustration/error-state/404-not-found.png",
      alt: "Image 4"
    },
    {
      src: "https://cdn.sekolah.mu/assets/coachmark/registrasi/daftarkan-akun-anak.webp",
      alt: "Image 1"
    },
    {
      src: "https://cdn.sekolah.mu/assets/v2/action/konfirmasi.webp",
      alt: "Image 2"
    }
  ]

  return (
    <main className=" p-4 flex flex-col justify-between h-full">
      <div className=" flex flex-wrap gap-4">
        {imageLists.map((image, index) => (
          <button
            key={index}
            className=" w-52 hover:border border-primary p-2 rounded-md cursor-copy"
            onClick={() => {
              toast({
                duration: 1000,
                description: 'Link copied to clipboard'
              })
            }}
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
          // </Button>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  )
}
