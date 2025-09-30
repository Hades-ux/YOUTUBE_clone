import MiniNavbar from '../../components/MiniNavbar'
import { Outlet } from 'react-router-dom'

const ChannelCustomisation = () => {
  const navItems = [
    { name: "Profile", path:"profile"},
    { name: "Home Tab", path:"home-tab"},
  ]
  return (
    <div>
      <h1 className='p-4 text-3xl font-semibold'>Channel Customisation</h1>
      <MiniNavbar items={navItems} />
      <Outlet />
    </div>
  )
}

export default ChannelCustomisation