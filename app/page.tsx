import { createClient } from "@/utils/supabase/server"
import { fetchAssets } from "@/lib/supabase"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Content from "@/components/Content"
import ErrorLog from "@/components/ErrorLog"

interface Props {
  searchParams: {
    search?: string
    page?: string
    format?: string
    category?: string
  }
}

export default async function Index({ searchParams }: Props) {
  const search = searchParams.search || ""
  const page = searchParams.page ? +searchParams.page : 1
  const format = searchParams.format ? searchParams.format.split(",") : []
  const category = searchParams.category || ""
  const client = createClient()

  const payload = {
    search,
    filter: {
      formats: format,
      category
    },
    page
  }
  const { data: images, status, message, count } = await fetchAssets(payload, client)

  const query = {
    page,
    search,
    format,
    category
  }

  return (
    <div>
      <Navbar query={query} />
      <ResizablePanelGroup
        direction="horizontal"
        className=" min-h-[calc(100vh-72px)]"
      >
        <ResizablePanel defaultSize={240} minSize={1} maxSize={35}>
          <Sidebar query={query} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={1000}>
          {status === 200 ? (
            <Content images={images} count={count} query={query} />
          ) : (
            <ErrorLog message={`Error: ${message}`} />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
