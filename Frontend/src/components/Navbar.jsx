import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import logo from "../assets/YouTube-Logo.png";
import axios from "axios";
import { useUser } from "../context/UserContext";

const Navbar = ({toggleSidebar}) => {

    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("")
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useUser();

    const BACKEND_URL = import.meta.env.VITE_API_URL;

    const handleOnClick = () => {
      navigate("/auth/login");
    }

    const handleSearch = async () =>{
         if(!searchValue.trim()){
          alert("Enter Some Text For Search")
          return;
         }
         setLoading(true)
         
         try {
          const res = await axios.get(`${BACKEND_URL}/api/v1/video/query?value=${encodeURIComponent(searchValue)}`)

          if(res.data.success){
           if(res.data.videos.length === 0){
            alert("No videos found");
            setVideos([]);
          }else{
            console.log(res.data.videos)
            setVideos(res.data.videos)
          }
        }
          
         } catch (error) {
          alert(error)
         }finally{
          setLoading(false)
         }
    }

    const handleLogout = async () =>{
    try{
        await axios.post(`${BACKEND_URL}/api/v1/auth/logout`, {}, { withCredentials: true });
        
    } catch (error) {
        console.error("Logout failed: ", error.message);
    } finally{
      setUser(null)
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      navigate("/", { replace: true });
    }
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
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            className="flex-grow px-4 py-2 outline-none text-sm"
          />
          <button
            aria-label="Search"
            onClick={handleSearch}
            className="px-4 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
          >
            {loading ? "searching...":<span className="material-symbols-outlined">search</span>
}</button>
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
        <button aria-label="More Options" onClick={handleLogout}>
          <span className="material-symbols-outlined cursor-pointer mt-2">more_vert</span>
        </button>
        <button 
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-blue-600 rounded-3xl flex items-center gap-1 cursor-pointer "
        onClick={handleOnClick}>
          <span className="material-symbols-outlined"> person </span> <span className="hidden sm:inline">{ user?.userName || "Sign in" }</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;