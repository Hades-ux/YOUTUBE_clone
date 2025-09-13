import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watch from "./pages/Watch.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import Channel from "./pages/Channel.jsx";
import Content from "./studioPages/Content.jsx"
import Dashboard from "./studioPages/Dashboard.jsx"
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
        <Route path="channel/:id/edit/profile" element={<Dashboard/>} />
        <Route path="channel/:id/Analytics" element={<Analytics/>} />
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
