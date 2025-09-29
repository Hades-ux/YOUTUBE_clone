import { useNavigate } from "react-router-dom"
import IconToolTip from "./IconToolTip";
import { useUser } from "../context/UserContext";

const Sidebar = ({isOpen}) => {

    const navigate = useNavigate();
    const { user } = useUser()

    const handleProfileClick = async () => {
      if (!user) {
        alert("Login required to view your profile.");
        navigate("/auth/login");
        return;
      }
      navigate(`/profile/${user._id}`);

    }
        

    const handleHomeClick = () => {
            navigate(`/`)
    }

  return (
    
    <aside className={`${isOpen ? "w-20" : "w-48"} fixed top-18 h-[calc(100vh-3rem)] transition-all duration-300`}>
       
       <IconToolTip name={"Home"} iconName={"Home"} isOpen={isOpen} onClick={handleHomeClick} hoverable={false} />

       <IconToolTip name={ "Subscription" } iconName={ "subscriptions" } isOpen={isOpen} hoverable={false}/>

       <IconToolTip name={ "You" } iconName={ "account_circle" } isOpen={isOpen} onClick={handleProfileClick} hoverable={false}/>

    </aside>
  )
}

export default Sidebar