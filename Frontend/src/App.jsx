import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watch from "./pages/Watch.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import Channel from "./pages/Channel.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="watch/:id" element={<Watch />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="channel/:id" element={<Channel />} />

        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
