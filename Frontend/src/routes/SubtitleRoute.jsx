import { Route, Navigate } from "react-router-dom";
import Subtitles from "../pages/studioPages/Subtitles";
import All from "../pages/SubtitlePages/All"
import Draft from "../pages/SubtitlePages/Draft"
import Published from "../pages/SubtitlePages/Published"

const SubtitleRoute = () => {
  return (
   <Route path="channel/:id/subtitle" element={<Subtitles/>} >
    <Route index element={<Navigate to="all" replace/>}/>
    <Route path="all" element ={<All/>}/>
    <Route path="drafts" element ={<Draft/>}/>
    <Route path="published" element ={<Published/>}/>
   </Route>
  )
}

export default SubtitleRoute