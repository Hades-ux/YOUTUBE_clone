import { Outlet } from "react-router-dom";
import MiniNavbar from "../../components/MiniNavbar"

const ChannelContent = () => {
  const navItems = [
    { name: "Inspiration", path:"inspiration"},
    { name: "Videos", path:"videos"},
    { name: "Shorts", path:"shorts"},
    { name: "Live", path:"live"},
    { name: "Posts", path:"posts"},
    { name: "Playlists", path:"playlists"},
    { name: "Podcasts", path:"podcasts"},

  ];


  return (
    <div>
      <h1 className="p-4 text-3xl font-semibold">Channel content</h1>
      <MiniNavbar items={navItems}/>
        <Outlet />
    </div>
  )
}

export default ChannelContent