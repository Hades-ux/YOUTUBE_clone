import { useContext } from "react"
import {useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext"

const Profile = () => {

  const {user, loading }= useContext(UserContext)

    const navigate = useNavigate();

    const handChannelClick = () => {
      navigate(`/channel/${user?._id}`)

    }

  return (
    <div className='box-border'>
        <div className="flex gap-3 mb-5">
        <img 
        src={user?.avatar?.url || "image"} 
        alt={user?.userName}
        className="h-40 w-40 rounded-full border" />
        <div>
        <h1 className="ml-2 mb-2 text-3xl font-semibold mt-5">{user?.userName}</h1>
        <h1 className="ml-2 mb-2 text-sm text-gray-500 font-semibold">{user?.channelName || "@Channel Name"} • <button className="cursor-pointer" onClick={handChannelClick}>View Channel</button> </h1>
         <button 
           disabled={loading}
           className=" ml-2 px-3 py-2 bg-gray-200 rounded-3xl text-sm mr-3 cursor-pointer hover:bg-gray-300">
            switch account
         </button>
         <button 
           disabled={loading}
           className=" px-3 py-2 bg-gray-200 rounded-3xl text-sm cursor-pointer hover:bg-gray-300">
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