import { Route, Navigate } from "react-router-dom";
import Copyright from "../pages/studioPages/Copyright";
import RemovalRequest from "../pages/copyrightPages/RemovalRequest";

const CopyrightRoute = () => {
  return (
     <Route path="channel/:id/copyright" element={<Copyright/>} >
        <Route index element={<Navigate to="RemovalRequest" replace />} />
         <Route path="RemovalRequest" element={<RemovalRequest />} />
        </Route>
  )
}

export default CopyrightRoute