import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Channel = () => {

    const BACKEND_URL = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setloading(true);
                const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, { withCredentials: true })
                setUser(res.data.user)
                
            } catch (error) {
                console.error("User not found:", error);
                
            }finally{
                setloading(false)
            }

        }

        fetchUser();

    },[]);

  return (
    <div className='py-5 w-screen h-screen mt-2 overflow-y-scroll'>
         <div className="flex gap-3 mb-5">
        <img 
        src={user?.avatar?.url || "image"} 
        alt={user?.userName}
        className="h-40 w-40 rounded-full border" />
        <div>
        <h1 className="ml-2 mb-2 text-3xl font-semibold mt-5">{user?.userName}</h1>
        <h1 className="ml-2 mb-2 text-[13px] text-gray-800 font-semibold">{user?.channelName || "@Channel Name"}</h1>
        <p className="ml-2 mb-2 text-[12px] text-gray-400 font-semibold">More about this channel <button className='text-gray-800 cursor-pointer' >...more</button></p>
         <button 
         className={`ml-2 px-3 py-2 bg-gray-200 rounded-3xl text-sm mr-3 cursor-pointer hover:bg-gray-300 ${loading? "cursor-not-allowed":"cursor-pointer"}`}
         
         onClick={() => navigate(`/studio/channel/${user._id}/edit/profile`)}
         disabled={loading}>
            Customise channel
         </button>
         <button 
         className= {`px-3 py-2 bg-gray-200 rounded-3xl text-sm hover:bg-gray-300 ${loading? "cursor-not-allowed":"cursor-pointer"}`}
         onClick={() => navigate(`/studio/channel/${user._id}/contents`)}
         disabled={loading}>
            Manage videos
         </button>
        </div>
        </div>
    </div>
  )
}

export default Channel