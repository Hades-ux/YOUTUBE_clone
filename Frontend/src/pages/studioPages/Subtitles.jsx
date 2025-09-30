import { Outlet } from 'react-router-dom'
import MiniNavbar from '../../components/MiniNavbar'

const Subtitles = () => {
  const navItems = [
    { name: "All", path: "all"},
    { name: "Drafts", path: "drafts"},
    { name: "Published", path: "published"},
  ]
  return (
    <div>
      <h1 className='p-4 text-3xl font-semibold'>Channel subtitles</h1>
      <MiniNavbar items={navItems}/>
      <Outlet />
      </div>
  )
}

export default Subtitles