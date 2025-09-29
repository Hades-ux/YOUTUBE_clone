import MiniNavbar from "../components/MiniNavbar"

const ChannelContent = () => {
  const navItems = [
    { name: "Inspiration", path:"/content/inspiration"},
    { name: "Videos", path:"/content/videos"},
    { name: "Shorts", path:"/content/Shorts"},
    { name: "Live", path:"/content/Live"},
    { name: "Posts", path:"/content/Posts"},
    { name: "Playlists", path:"/content/Playlists"},
    { name: "PodCast", path:"/content/Podcast"},

  ];


  return (
    <div>
      <h1 className="p-4 text-3xl font-semibold">Channel content</h1>
      <MiniNavbar items={navItems}/>
      <div className="p-4">
        Videos Pages
      </div>

    </div>
  )
}

export default ChannelContent