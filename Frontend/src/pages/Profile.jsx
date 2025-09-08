import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate } from "react-router-dom"

const Profile = () => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    useEffect(() =>{

        const fetchProfile = async () => {
            try {

            const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, { withCredentials: true })
            setUser(res.data.user);
            console.log(res.data.user)

                
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

  return (
    <div className='w-screen h-screen p-5 mt-2'>
        <div className="flex gap-3">
        <img 
        src={user?.avatar?.url || "image"} 
        alt={user?.userName}
        className="h-40 w-40 rounded-full border" />
        <div>
        <h1 className="text-3xl font-semibold mt-5">{user?.userName}</h1>
         <button className=" p-2 bg-gray-200 rounded-3xl">
            Customise Channel
         </button>
        </div>
        </div>
        </div>
  )
}

export default Profile