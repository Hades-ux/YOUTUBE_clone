import { useEffect, useState } from "react"
import axios from "axios"
import {useNavigate } from "react-router-dom"

const Profile = () => {

  const BACKEND_URL = import.meta.env.VITE_API_URL;

    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    useEffect(() =>{

        const fetchProfile = async () => {
            try {

            const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, { withCredentials: true })
            setUser(res.data.user);
                
            } catch (error) {

            if (error.response && error.response.status === 401) {
              alert("Login required to view your profile.");
              navigate("/login");
            } else {
             console.error("Unexpected error:", error.message);
            }
                
            }
            
        }

        fetchProfile();

    },[])

    const handChannelClick = () => {
      navigate(`/channel/${user?._id}`)

    }

  return (
    <div className='w-screen h-screen py-5 mt-2 overflow-y-scroll'>
        <div className="flex gap-3 mb-5">
        <img 
        src={user?.avatar?.url || "image"} 
        alt={user?.userName}
        className="h-40 w-40 rounded-full border" />
        <div>
        <h1 className="ml-2 mb-2 text-3xl font-semibold mt-5">{user?.userName}</h1>
        <h1 className="ml-2 mb-2 text-sm text-gray-500 font-semibold">{user?.channelName || "@Channel Name"} • <button className="cursor-pointer" onClick={handChannelClick}>View Channel</button> </h1>
         <button className=" ml-2 px-3 py-2 bg-gray-200 rounded-3xl text-sm mr-3 cursor-pointer hover:bg-gray-300">
            switch account
         </button>
         <button className=" px-3 py-2 bg-gray-200 rounded-3xl text-sm cursor-pointer hover:bg-gray-300">
            Google account
         </button>
        </div>
        </div>

        {/* history */}
          <h1 className="text-2xl font-bold">History</h1>
          <div className="w-full border p-2 h-60 mb-5">
          <h1>History detail</h1>
          </div>

        {/* Playlist */}
         <h1 className="text-2xl font-bold">Playlist</h1>
         <div className="w-full border mb-5 p-2 h-60">
         <h1>Playlist Deatil</h1>
         </div>

          {/* Watch later */}
          <h1 className="text-2xl font-bold">Watch Later</h1>
          <div className="w-full border mb-5 p-2 h-60">
          <h1>Watch Later</h1>
          </div>

          {/* like Videos */}
          <h1 className="text-2xl font-bold">Like Video</h1>
          <div className="w-full border mb-5 p-2 h-60">
          <h1>Like Vides</h1>
          </div>

          {/* your clip */}
          <h1 className="text-2xl font-bold">Your Clip</h1>
          <div className="w-full border mb-5 p-2 h-60">
          <h1>Your Clip</h1>
          </div>

          {/* Podcast */}
          <h1 className="text-2xl font-bold">Podcast</h1>
          <div className="w-full border mb-5 p-2 h-60">
          <h1>Podcast</h1>
          </div>

        </div>
  )
}

export default Profile