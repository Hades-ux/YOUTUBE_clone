import logo from "../assets/YouTube-Logo.png";
import { FiSearch, FiMic } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'

const Navbar = ({toggleSidebar}) => {

    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/login")
    }

  return (

    <nav 
    className=" bg-white w-full fixed flex items-center justify-between px-3 py-2 top-0 z-50 border-b border-gray-300">
      {/* Left Section */}
      <div 
      className="flex items-center gap-3">
        <button 
        onClick={toggleSidebar}
        className="cursor-pointer">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <img 
        src={logo} 
        alt="YouTube Logo" 
        className="h-15 object-contain cursor-pointer" />
      </div>

      {/* Middle Section */}
      <div 
      className="hidden md:flex items-center gap-4 flex-grow max-w-2xl">
        {/* Search Box */}
        <div className="flex w-full border border-gray-300 rounded-3xl overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow px-4 py-2 outline-none text-sm"
          />
          <button
            aria-label="Search"
            className="px-4 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
          >
            <FiSearch size={20} />
          </button>
        </div>

        {/* Mic Button */}
        <button
          aria-label="Voice Search"
          className="h-10 w-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-full"
        >
          <FiMic size={20} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        <button aria-label="More Options">
          <span class="material-symbols-outlined cursor-pointer">more_vert</span>
        </button>
        <button 
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-blue-600 rounded-3xl flex items-center gap-1 cursor-pointer "
        onClick={handleOnClick}>
          <span class="material-symbols-outlined"> person </span> <span className="hidden sm:inline">Sign in</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;