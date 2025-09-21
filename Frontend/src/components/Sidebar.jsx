import { useNavigate } from "react-router-dom"
import axios from "axios";
import IconToolTip from "./IconToolTip";

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
    
    <aside className={` border-r border-gray-300 ${isOpen ? "w-15" : "w-37"} fixed top-18 h-[calc(100vh-3rem)] transition-all duration-300`}>
       
       <IconToolTip name={"Home"} iconName={"Home"} isOpen={isOpen} />

       <IconToolTip name={ "Subscription" } iconName={ "subscriptions" } isOpen={isOpen}/>

       <IconToolTip name={ "You" } iconName={ "account_circle" } isOpen={isOpen} onClick={handleHomeClick}/>

    </aside>
  )
}

export default Sidebar