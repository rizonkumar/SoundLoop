import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";

const MainLayout = () => {
  console.log("1");
  const isMobile = false;
  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex h-full flex-1 overflow-hidden p-2"
      >
        {/* Left Panel */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSideBar />
        </ResizablePanel>

        <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />
        {/* Main Content Panel */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

        {/* Right Panel */}
        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        >
          friends activity
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
