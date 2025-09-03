import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (

    <div className="flex flex-col h-[100vh]">
      {/* Navbar */}
      <Navbar
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Body: Sidebar + Content */}
      <div 
      className="flex flex-1">
        <Sidebar 
        isOpen={isSidebarOpen} />

        {/* Main Content */}
        <main 
          className={`pt-14 fixed flex-grow transition-all duration-300 p-4 ${isSidebarOpen ? "ml-60" : "ml-20"} `}
          >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
