import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const StudioSidebar = ({isOpen}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState()
  const BACKEND_URL = import.meta.env.VITE_API_URL;
  const [isHidden, setIsHidden] = useState(true)

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
    <div className='flex'>
      <div className={`${ isOpen?"w-20" : "w-40" } h-[calc(100vh-64px)] w-20 border-r border-gray-300 p-2 flex flex-col items-center gap-5 transition-all duration-300`}>
         <img src={user?.avatar?.url} alt="user"
         className='rounded-full h-10 w-10 mt-2 '/>
         <div className='relative group flex gap-3'>
         <span className="material-symbols-outlined material-symbole">dashboard</span><span className="absolute top-6 hidden  group-hover:block bg-black text-white text-sm rounded px-2 py-1 whitespace-nowrap">Dashboard</span><span className={`${isOpen? "hidden":""} transition-all duration-400`}>Dashboad</span>
         </div>

         <div className='relative group flex gap-3'>
         <span className="material-symbols-outlined material-symbole">video_library</span><span className="absolute top-6 hidden  group-hover:block bg-black text-white text-sm rounded px-2 py-1 whitespace-nowrap">Content</span><span className={`${isOpen? "hidden":""} transition-all duration-400 w-18`}>content</span>

         </div>
         <span className="material-symbols-outlined material-symbole">analytics</span>
         <span className="material-symbols-outlined material-symbole">groups_3</span>
         <span className="material-symbols-outlined material-symbole">subtitles</span>
         <span className="material-symbols-outlined material-symbole">copyright</span>
         <span className="material-symbols-outlined material-symbole">currency_rupee</span>
         <span className="material-symbols-outlined material-symbole">wand_shine</span>
         <span className="material-symbols-outlined material-symbole">library_music</span>

         {/* bottom */}
         <footer className=' mt-auto flex flex-col gap-6 mb-4'>
         <span className="material-symbols-outlined material-symbole">settings</span>
         <span className="material-symbols-outlined material-symbole">feedback</span>
         </footer>


      </div>
      </div>
  )
}

export default StudioSidebar