import { createContext, useState, useContext, useEffect } from "react";
import axios
 from "axios";
const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, { withCredentials: true, });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );

}
export const useUser = () => useContext(UserContext);
