import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import Register from "../pages/Register";

const AuthRoute = () => {
  return (
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
    </Routes>
  )
}

export default AuthRoute