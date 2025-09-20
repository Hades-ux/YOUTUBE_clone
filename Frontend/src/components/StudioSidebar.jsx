import IconToolTip from './IconToolTip';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const StudioSidebar = ({isOpen}) => {
  const navigate = useNavigate();

  const {user} = useContext(UserContext);

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

        <div className={`w-full h-full flex flex-col ${isOpen?" items-center":"overflow-y-auto overflow-x-hidden"} `}>
         <IconToolTip name={"Dashboard"} iconName={"Dashboard"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/dashboard`)}/>
         <IconToolTip name={"Content"}   iconName={"video_library"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/videos/`)}/>
         <IconToolTip name={"Analytics"} iconName={"Analytics"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/analytics`)}/>
         <IconToolTip name={"Community"} iconName={"groups_3"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/community`)}/>
         <IconToolTip name={"Subtitles"} iconName={"subtitles"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/subtitle`)}/>
         <IconToolTip name={"copyright"} iconName={"copyright"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/copyright`)}/>
         <IconToolTip name={"Earn"}  iconName={"currency_rupee"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/earn`)}/>
         <IconToolTip name={"Customisation"} iconName={"wand_shine"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/edit/profile`)}/>
         <IconToolTip name={"Audio library"}   iconName={"library_music"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/audio/library`)}/>
        </div>

         {/* bottom */}
         <footer className={`mt-auto w-full flex flex-col mb-4  border-t border-gray-300 ${isOpen?" items-center":""}`}>
          <IconToolTip name={"Setting"} iconName={"settings"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/setting`)}/>
          <IconToolTip name={"Send Feedback"} iconName={"feedback"} isOpen={isOpen} onClick={() => navigate(`/studio/channel/${user._id}/feedBack`)}/>
         </footer>


      </div>
      </div>
  )
}

export default StudioSidebar