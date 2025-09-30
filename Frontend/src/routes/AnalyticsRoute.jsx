import { Route, Navigate } from "react-router-dom";
import Analytics from "../pages/studioPages/Analytics";
import Overview from "../pages/AnalyticsPages/Overview";
import Content from "../pages/AnalyticsPages/Content";
import Audiance from "../pages/AnalyticsPages/Audiance"; 
import Trends from "../pages/AnalyticsPages/Trends";

const AnalyticsRoute = () => {
  return (
    <Route path="channel/:id/analytics" element={<Analytics />}>
      <Route path="overview" element={<Overview />} />
      <Route path="content" element={<Content />} />
      <Route path="audience" element={<Audiance />} />
      <Route path="trends" element={<Trends />} />
      <Route index element={<Navigate to="overview" replace />} />
    </Route>
  )
}

export default AnalyticsRoute