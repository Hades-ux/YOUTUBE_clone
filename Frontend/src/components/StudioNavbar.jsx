import logo from "../assets/yt_studio_logo.svg"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const StudioNavbar = ({toggle}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState()
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
  const  fetchUser = async() => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, { withCredentials: true })
        setUser(res.data.user)
        console.log(res.data.user)
        
      } catch (error) {
        console.log("error: user not found "+error.message)
        
      }

    }
    fetchUser();
  }, [])
  

  return (
    <div className='bg-white shadow-lg w-full h-16 flex items-center justify-between p-2'>

        {/* memu and logo */}
        <div className='flex items-center gap-5'>
        <button 
        className='outline-none cursor-pointer ml-5'
        onClick={toggle}>
        <span className="material-symbols-outlined material-symbole">menu</span>
        </button>
        <img 
        src={logo} 
        alt="ytc-logo"
        className=' h-6 cursor-pointer ml-3'
        onClick={() => navigate("/") }/>
        </div>

        {/* search Bar */}
        <div className='rounded-3xl h-10 w-[40rem] bg-gray-100 items-center hover:ring ring-black hidden lg:flex'>
          <span className="material-symbols-outlined material-symbole p-2 mt-1">search</span>
          <input 
          type="text"
          placeholder='Search across your channel'
          className='outline-none p-2 w-[34rem]' />
        </div>

        {/* Icon */}
        <div className='flex  items-center gap-2'>
         <span className="material-symbols-outlined material-symbole">help</span>
         <span className="material-symbols-outlined material-symbole">notifications</span>

          <button className="py-1 px-2 border border-gray-300 rounded-3xl flex items-center gap-2 cursor-pointer hover:bg-gray-100">
            <span className="material-symbols-outlined material-symbole">video_call</span><h1 className='font-semibold'>Create</h1>
          </button>

          <img 
          src={user?.avatar?.url || "Avatar "} 
          alt={user?.userName || "userName" }
          className='h-10 w-10 rounded-full cursor-pointer ml-2'/>
        </div>

      </div>
  )
}

export default StudioNavbar