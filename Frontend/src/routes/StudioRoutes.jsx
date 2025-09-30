import { Routes, Route } from "react-router-dom";
import Earn from "../pages/studioPages/Earn";
import ContentRoutes from "../routes/contentRoute";
import Setting from "../pages/studioPages/Setting";
import FeedBack from "../pages/studioPages/FeedBack";
import Dashboard from "../pages/studioPages/Dashboard";
import StudioLayout from "../layouts/StudioLayout";
import AnalyticsRoute from "./AnalyticsRoute";
import CommunityRoute from "./CommunityRoute";
import SubtitleRoute from "./SubtitleRoute";
import CopyrightRoute from "./CopyrightRoute";
import CustomisationRoute from "./CustomisationRoute";
import AudioLibraryRoute from "./AudioLibraryRoute";

const StudioRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<StudioLayout/>}>
        <Route path="channel/:id/earn" element={<Earn/>} />
        <Route path="channel/:id/dashboard" element={<Dashboard/>} />
        <Route path="channel/:id/setting" element={<Setting/>} />
        <Route path="channel/:id/feedBack" element={<FeedBack/>} />
        {ContentRoutes()}
        {AnalyticsRoute()}
        {CommunityRoute()}
        {SubtitleRoute()}
        {CopyrightRoute()}
        {CustomisationRoute()}
        {AudioLibraryRoute()}
        </Route>
    </Routes>
  )
}

export default StudioRoutes