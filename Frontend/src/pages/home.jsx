import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo  from "../assets/YouTube-Logo.png";
import { FiMenu, FiMoreVertical, FiSearch, FiMic, FiUser } from "react-icons/fi"


export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = async () =>{
    try{
        await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
        
    } catch (error) {
        console.error("Logout failed: ", error.message);
    } finally{
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      navigate("/login", { replace: true });
    }
  }

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("/api/videos/random"); // Replace with your API
//         setVideos(res.data);

//         const trendingRes = await axios.get("/api/videos/trending");
//         setTrending(trendingRes.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

  if (loading) {
    return (
        
      <div className="min-h-screen text-black">
        <nav className="w-screen flex items-center gap-3 mb-5">
          <FiMenu size={24} />
          <img src= { logo } alt="logo" className="h-15 w-25" />

          <div className="flex items-center border border-gray-400 bg-white rounded-3xl ">
            <input 
            type="text" 
            className=" h-10 p-3 outline-none"
            placeholder="Search"/>

            <div className="px-3 h-10 text-center rounded-r-3xl bg-gray-200">
            <FiSearch size={24} className="my-2"/>

            </div>
          </div>
          <div className=" bg-gray-200 rounded-full p-2">
            <FiMic size={24} />
          </div>

          <FiMoreVertical/>
          <div className="p-2 bg-gray-200 gap-3 text-blue-500 rounded-3xl flex items-center">
            <FiUser/> Sign in
          </div>
        </nav>
        <div>

        Loading...

        <button className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleLogout}
        >
            logout
        </button>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Trending</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trending.map((video) => (
          <div key={video._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-gray-800 truncate">{video.title}</h2>
              <p className="text-gray-500 text-sm mt-1">{video.views} views</p>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Recommended for you</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-gray-800 truncate">{video.title}</h2>
              <p className="text-gray-500 text-sm mt-1">{video.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
