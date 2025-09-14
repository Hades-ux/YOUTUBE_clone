import { FiHome } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Sidebar = ({isOpen}) => {

    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_API_URL;

    const handleProfileClick = async () => {
        try {
            
            const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, { withCredentials: true});
            const userId = res.data.user.userName;
            navigate(`/profile/${userId}`);

        } catch (error) {

             if (error.response && error.response.status === 401) {
              alert("Login required to view your profile.");
              navigate("auth/login");
        } else {
        console.error("Unexpected error:", error.message);
        }
            
        }
    };

    const handleHomeClick = async () => {
        try{

            const res = await axios.get(`${BACKEND_URL}/api/v1/video/random`)
            navigate(`/`)

        }catch(error){

              if (error.response && error.response.status === 401) {
              alert("Login required to view your profile.");
              navigate("/login");
              } else {
              console.error("Unexpected error:", error.message);
      }

        }
    }

  return (
    <aside className={`${isOpen ? "w-60" : "w-22"} fixed top-18 left-0 h-[calc(100vh-3rem)] bg-white transition-all duration-300`}>

        <ul className='flex flex-col pt-2 gap-2'>
            <li className={`flex  items-center justify-center gap-3 p-2 cursor-pointer hover:bg-gray-300 rounded ${isOpen? " ": "flex-col" }`}
             onClick={ handleHomeClick }>
                <FiHome size={20} />
                { !isOpen && <div className='text-gray-800 text-sm'>Home</div>}
                { isOpen && <span className='text-gray-800 '>Home</span>}
            </li>

            
            <li className={`flex  items-center justify-center gap- p-2 text-sm cursor-pointer hover:bg-gray-300  rounded ${isOpen? " ": "flex-col" }`}>
                <FiHome size={20} />
                { !isOpen && <div className='text-gray-800'>Subscription</div>}
                { isOpen && <span className='text-gray-800 '>Subscription</span>}
            </li>

            
            <li className={`flex  items-center justify-center gap-3 text-sm p-2 cursor-pointer hover:bg-gray-300 rounded ${isOpen? " ": "flex-col" }`}
                onClick={ handleProfileClick }>
                <FiHome size={20} />
                { !isOpen && <div className='text-gray-800'>You</div>}
                { isOpen && <span className='text-gray-800 '>You</span>}
            </li>

            

        </ul>
    </aside>
  )
}

export default Sidebar