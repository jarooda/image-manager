import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import ImageCard from "./ImageCard"

export default function Content() {
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
          <ImageCard key={index} image={image} />
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
