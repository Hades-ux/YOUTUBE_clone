import axios from 'axios';
import { createContext, useState, useEffect, Children} from 'react'

const UserContext = createContext();

const UserProvider = ({children}) => {

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const BACKEND_URL = import.meta.env.VITE_API_URL;

useEffect(() => {

    const fetchUser = async () => {

        try {
            
            const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, { withCredentials: true});
                setUser(res.data.user)
        } catch (error) {
           console.error("User fetch failed:", error.message);
                setUser(null);
            
        } finally {
        setLoading(false);
      }
        
    }

    fetchUser();

}, [])

  return (
    <UserContext.Provider value={{user, loading, setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContext;
export {UserProvider}