import { Routes, Route } from "react-router-dom";
import Earn from "../studioPages/Earn";
import Content from "../studioPages/Content";
import Setting from "../studioPages/Setting";
import FeedBack from "../studioPages/FeedBack";
import Dashboard from "../studioPages/Dashboard";
import Analytics from "../studioPages/Analytics";
import Community from "../studioPages/Community";
import Subtitles from "../studioPages/Subtitles";
import Copyright from "../studioPages/Copyright";
import Customisation from "../studioPages/Customisation";
import AudioLibrary from "../studioPages/AudioLibrary";
import StudioLayout from "../components/StudioLayout";

const StudioRoutes = () => {
  return (
    <Routes>
        <Route path="studio" element={<StudioLayout/>}>
        <Route path="channel/:id/earn" element={<Earn/>} />
        <Route path="channel/:id/videos" element={<Content/>} />
        <Route path="channel/:id/dashboard" element={<Dashboard/>} />
        <Route path="channel/:id/analytics" element={<Analytics/>} />
        <Route path="channel/:id/community" element={<Community/>} />
        <Route path="channel/:id/subtitle" element={<Subtitles/>} />
        <Route path="channel/:id/copyright" element={<Copyright/>} />
        <Route path="channel/:id/setting" element={<Setting/>} />
        <Route path="channel/:id/feedBack" element={<FeedBack/>} />
        <Route path="channel/:id/audio/library" element={<AudioLibrary/>} />
        <Route path="channel/:id/edit/profile" element={<Customisation/>} />
        </Route>
    </Routes>
  )
}

export default StudioRoutes