import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Content from "@/components/Content"

export default function Index() {
  return (
    <div>
      <Navbar />
      <ResizablePanelGroup
        direction="horizontal"
        className=" min-h-[calc(100vh-72px)]"
      >
        <ResizablePanel defaultSize={240} minSize={1} maxSize={35}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={1000}>
          <Content />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
