import { Route, Navigate } from "react-router-dom";
import Content from "../pages/studioPages/Content";
import Videos from "../pages/ContentPages/Videos"
import Inspiration from "../pages/ContentPages/Inspiration";
import Live from "../pages/ContentPages/Live"
import Playlists from "../pages/ContentPages/Playlists";
import Shorts from "../pages/ContentPages/Shorts"
import Posts from "../pages/ContentPages/Posts";
import Podcasts from "../pages/ContentPages/Podcasts";

const ContentRoute = () => {
  return (
    <Route path="channel/:id/contents" element={<Content/>}>
        <Route index element={<Navigate to="videos" replace/>}/>
        <Route path="videos" element={<Videos/>}/>
        <Route path="inspiration" element={<Inspiration/>}/>
        <Route path="live" element={<Live/>}/>
        <Route path="playlists" element={<Playlists/>}/>
        <Route path="shorts" element={<Shorts/>}/>
        <Route path="posts" element={<Posts/>}/>
        <Route path="podcasts" element={<Podcasts/>}/>
    </Route>
  )
}

export default ContentRoute