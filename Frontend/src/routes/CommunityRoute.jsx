import { Route, Navigate } from "react-router-dom";
import Community from "../pages/studioPages/Community";
import Comments from "../pages/CommunityPages/Comments";
import ViewerPost from "../pages/CommunityPages/ViewerPosts";
import Mentions from "../pages/CommunityPages/Mentions";

const CommunityRoute = () => {
  return (
 <Route path="channel/:id/community" element={<Community/>} >
    <Route index  element={<Navigate to = "comments" replace/>}/>
    <Route path="comments" element={<Comments/>}/>
    <Route path="viewer-posts" element={<ViewerPost/>}/>
    <Route path="mentions" element={<Mentions/>}/>
 </Route>
  )
}

export default CommunityRoute