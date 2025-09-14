import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Watch from "../pages/Watch";
import Profile from "../pages/Profile";
import Channel from "../pages/Channel";
import NotFound from "../pages/NotFound";

const MainRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="watch/:id" element={<Watch />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="channel/:id" element={<Channel />} />
        <Route path="*" element={<NotFound />} />
        </Route>
    </Routes> 
  )
}

export default MainRoute