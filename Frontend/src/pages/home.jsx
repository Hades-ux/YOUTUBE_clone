import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";



dayjs.extend(relativeTime);


const Home = () => {

  const [videos, setVideos] = useState([]);
  // const [trending, setTrending] = useState([]);
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

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/v1/video/random");
        setVideos(res.data.videos);
      } catch (error) {
        console.error("error: ", error.message);
      }finally {
        setLoading(false)
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
        
      <div className="min-h-screen flex items-center justify-center text-black">
        
        <div>

        Not  able to fatch videos

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
    <div className="min-h-screen p-6">
        <h1 className="p-4" >Random videos</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {videos.map((video) => (
      <div
        key={video._id}
        className="overflow-hidden transition w-[320px] flex flex-col cursor-pointer"
        onClick={() => {navigate(`/watch/${video._id}`)}}
      >
        <img
          src={video.thumbnail?.url}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-lg"
        />

        <div className="mt-3 flex">
          <img 
            src={video.owner.avatar.url}
            alt={video.owner.userName}
            className="w-12 h-12 rounded-full m-2 ml-0"
          />

          <div className="ml-2">
            <h2 className="font-semibold text-gray-800 line-clamp-2">
              {video.title}
            </h2>
            <h2 className="text-gray-500 truncate">{video.owner.userName}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {video.views} Views • <span>{dayjs(video.createdAt).fromNow()}</span>
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>

      {/* <h1 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Recommended for you</h1>
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
      </div> */}
    </div>
  );
}

export default Home;
