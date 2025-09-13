import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import IconToolTip from './IconToolTip';

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
        console.log("error: user not found "+ error.message)
        
      }

    }
    fetchUser();
  }, [])
  

  return (
    <div className='flex'>
      <div className={`${ isOpen?"w-20" : "w-50" } h-[calc(100vh-64px)] w-20 border-r border-gray-300 flex flex-col items-center gap-5 transition-all duration-300`}>
         
         <div className='flex flex-col items-center'>
          <img src={user?.avatar?.url} alt="user"
         className={`rounded-full border border-gray-200 ${!isOpen?"mt-2 h-40 w-36":"h-12 w-12 my-4"} `}/>
        {!isOpen && (
          <>
          <h1 className='text-sm font-semibold mt-2'>Your channel</h1>
          <h1 className='text-sm text-gray-500'>{user?.userName.toUpperCase() || "Owner"} </h1>
        </>

        )} 
        </div>

        <div className={`w-full h-full flex flex-col ${isOpen?" items-center":"overflow-y-auto"} `}>
         <IconToolTip name={"Dashboard"} iconName={"Dashboard"} isOpen={isOpen}/>
         <IconToolTip name={"Content"}   iconName={"video_library"} isOpen={isOpen}/>
         <IconToolTip name={"Analytics"} iconName={"Analytics"} isOpen={isOpen}/>
         <IconToolTip name={"Community"} iconName={"groups_3"} isOpen={isOpen}/>
         <IconToolTip name={"Subtitles"} iconName={"subtitles"} isOpen={isOpen}/>
         <IconToolTip name={"copyright"} iconName={"copyright"} isOpen={isOpen}/>
         <IconToolTip name={"Payments"}  iconName={"currency_rupee"} isOpen={isOpen}/>
         <IconToolTip name={"Customisation"} iconName={"wand_shine"} isOpen={isOpen}/>
         <IconToolTip name={"Audio library"}   iconName={"library_music"} isOpen={isOpen}/>
        </div>

         {/* bottom */}
         <footer className={`mt-auto w-full flex flex-col mb-4  border-t border-gray-300 ${isOpen?" items-center":""}`}>
          <IconToolTip name={"Setting"} iconName={"settings"} isOpen={isOpen}/>
          <IconToolTip name={"Send Feedback"} iconName={"feedback"} isOpen={isOpen}/>
         </footer>


      </div>
      </div>
  )
}

export default StudioSidebar