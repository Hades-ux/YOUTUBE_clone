import { Route, Navigate } from 'react-router-dom'
import Customisation from '../pages/studioPages/Customisation'
import Profile from '../pages/customisationPages/Profile'
import HomeTab from '../pages/customisationPages/HomeTab'

const CustomisationRoute = () => {
  return (
   <Route path="channel/:id/edit/profile" element={<Customisation/>}>
    <Route index element={<Navigate to="profile" replace />} />
     <Route path="profile" element={<Profile />} />
     <Route path="home-tab" element={<HomeTab />} />
   </Route>
  )
}

export default CustomisationRoute