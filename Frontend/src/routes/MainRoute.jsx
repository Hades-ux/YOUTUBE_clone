import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Watch from "../pages/Watch";
import Profile from "../pages/Profile";
import Channel from "../pages/Channel";

const MainRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />} >
        <Route index element={<Home />} />
        <Route path="watch/:id" element={<Watch />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="channel/:id" element={<Channel />} />
        </Route>
    </Routes> 
  )
}

export default MainRoute