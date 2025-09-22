import { useState} from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <div className="box-border">

      {/* Navbar */}
      <Navbar toggleSidebar={ () => setIsOpen(!isOpen) }/>

      {/* Body: Sidebar + Content */}
      <div className="flex">
        <Sidebar isOpen={ isOpen }/>

        {/* Main Content */}
        <main className={`flex-1 mt-20 transition-all duration-300 ${isOpen ? "pl-20" : "pl-48"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
