import { FiBarChart2, FiBell, FiCamera, FiClipboard, FiDollarSign, FiFileText, FiGrid, FiMenu, FiMessageSquare, FiMusic, FiSearch, FiSettings, FiShield, FiSliders, FiType, FiUser, FiVideo } from 'react-icons/fi'
import { FaRegQuestionCircle } from 'react-icons/fa'
import logo from "../assets/yt_studio_logo.svg"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ChannelContent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState()
  const [isHidden, setIsHidden] = useState(true)
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
    <div className='box-border'>
      {/* Nave Bar */}

      <div className='bg-white shadow-lg w-full h-16 flex items-center justify-between p-2'>

        {/* memu and logo */}
        <div className='flex items-center gap-5'>
        <button 
        className='outline-none cursor-pointer'
        onClick={() => setIsHidden(!isHidden)}>
        <FiMenu size={40} className=' hover:bg-gray-100 rounded-full cursor-pointer p-2'/>
        </button>
        <img 
        src={logo} 
        alt="ytc-logo"
        className=' cursor-pointer'
        onClick={() => navigate("/") }/>
        </div>

        {/* search Bar */}
        <div className='rounded-3xl h-10 w-[40rem] bg-gray-100 items-center hover:ring ring-black hidden lg:flex'>
          <FiSearch size={24} className='mr-4 ml-4'/>
          <input 
          type="text"
          placeholder='Search across your channel'
          className='outline-none p-2 w-[34rem]' />
        </div>

        {/* Icon */}
        <div className='flex  items-center gap-2'>
          <FaRegQuestionCircle size={40} className=' hover:bg-gray-100 rounded-full cursor-pointer p-2'/>
          <FiBell size={40} className=' hover:bg-gray-200 rounded-full cursor-pointer p-2'/>

          <button className="py-1 px-2 border rounded-3xl flex items-center gap-2 cursor-pointer hover:bg-gray-100">
            <FiVideo size={24}/><h1 className='font-semibold'>Create</h1>
          </button>

          <img 
          src={user?.avatar?.url || "Avatar "} 
          alt={user?.userName || "userName" }
          className='h-10 w-10 border rounded-full cursor-pointer ml-2'/>
        </div>

      </div>

      {/* sideBar1 */}
      <div className='flex'>
      <div className={`${ isHidden?"flex" : "hidden" } h-[calc(100vh-64px)] w-20 border-r border-gray-300 p-2 flex-col items-center gap-5`}>
         <img src={user?.avatar?.url} alt="user"
         className=' border rounded-full h-10 w-10 mt-2 ' />
         <FiGrid size={24}/>
         <FiCamera size={24}/>
         <FiBarChart2 size={24}/>
         <FiUser size={24}/>
         <FiClipboard size={24}/>
         <FiFileText size={24}/>
         <FiShield size={24}/>
         <FiDollarSign size={24}/>
         <FiSliders size={24}/>
         <FiMusic size={24}/>

         {/* bottom */}
         <footer className=' mt-auto flex flex-col gap-6'>
         <FiSettings size={24}/>
         <FiMessageSquare size={24}/>
         </footer>


      </div>

      {/* sideBar2 */}
      <div className={`${isHidden?"hidden":"block"} h-[calc(100vh-64px)] w-50 border-r border-gray-300 p-2`}>
         icon + name
      </div>

      </div>
    
    </div>
  )
}

export default ChannelContent