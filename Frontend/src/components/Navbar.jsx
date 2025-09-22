import { useContext } from "react";
import logo from "../assets/YouTube-Logo.png";
import { useNavigate } from 'react-router-dom'
import UserContext from "../context/UserContext";

const Navbar = ({toggleSidebar}) => {

    const navigate = useNavigate();
    const {user} = useContext(UserContext)

    const handleOnClick = () => {
        navigate(user ? `/profile/${user._id}` : "/auth/login");
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
          <span className="material-symbols-outlined mt-1">menu</span>
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
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>

        {/* Mic Button */}
        <button
          aria-label="Voice Search"
          className="p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-full"
        >
          <span className="material-symbols-outlined">mic</span>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        <button aria-label="More Options">
          <span className="material-symbols-outlined cursor-pointer mt-2">more_vert</span>
        </button>
        <button 
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-blue-600 rounded-3xl flex items-center gap-1 cursor-pointer "
        onClick={handleOnClick}>
          <span className="material-symbols-outlined"> person </span> <span className="hidden sm:inline">{user ? user.userName : "Sign in" }</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;