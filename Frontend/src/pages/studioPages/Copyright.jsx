import { Outlet } from 'react-router-dom'
import MiniNavbar from '../../components/MiniNavbar'

const Copyright = () => {
  const navItems = [
    { name: "Removal Requests", path: "RemovalRequests"},
  ]
  return (
    <div>
      <h1 className='p-4 text-3xl font-semibold'>Channel copyright</h1>
      <MiniNavbar items={navItems}/>
      <Outlet/>
    </div>
  )
}

export default Copyright