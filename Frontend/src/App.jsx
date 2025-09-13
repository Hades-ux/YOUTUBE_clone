import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watch from "./pages/Watch.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import Channel from "./pages/Channel.jsx";
import Content from "./studioPages/Content.jsx";
import Dashboard from "./studioPages/Dashboard.jsx";
import Analytics from "./studioPages/Analytics.jsx";
import Community from "./studioPages/Community.jsx";
import Subtitle from "./studioPages/Subtitles.jsx";
import Copyright from "./studioPages/Copyright.jsx";
import Earn from "./studioPages/Earn.jsx";
import AudioLibrary from  "./studioPages/AudioLibrary.jsx"
import Customisation from "./studioPages/Customisation.jsx";
import Setting from "./studioPages/Setting.jsx";
import FeedBack from "./studioPages/FeedBack.jsx";
import StudioLayout from "./components/StudioLayout.jsx";

function App() {
  return (
    <Router>
      <Routes>
        
        {/* yt */}
        <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="watch/:id" element={<Watch />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="channel/:id" element={<Channel />} />
        </Route>

        {/* studio yt*/}
        <Route path="studio" element={<StudioLayout/>}>
        <Route path="channel/:id/videos/" element={<Content/>} />
        <Route path="channel/:id/dashboard" element={<Dashboard/>} />
        <Route path="channel/:id/analytics" element={<Analytics/>} />
        <Route path="channel/:id/community" element={<Community/>} />
        <Route path="channel/:id/subtitle" element={<Subtitle/>} />
        <Route path="channel/:id/copyright" element={<Copyright/>} />
        <Route path="channel/:id/earn" element={<Earn/>} />
        <Route path="channel/:id/edit/profile" element={<Customisation/>} />
        <Route path="channel/:id/audio/library" element={<AudioLibrary/>} />
        <Route path="channel/:id/setting" element={<Setting/>} />
        <Route path="channel/:id/feedBack" element={<FeedBack/>} />
        </Route>

        {/* user yt */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
