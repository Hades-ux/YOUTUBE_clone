import { Outlet } from 'react-router-dom'
import MiniNavbar from '../../components/MiniNavbar'

const AudioLibrary = () => {
  const navItems = [
    { name: "Music", path: "music"},
    { name: "Sound Effects", path: "sound-effects"},
    { name: "Starred", path: "starred"},
  ]
  return (
    <div>
      <h1 className='p-4 text-3xl font-semibold'>Audio library</h1>
    <MiniNavbar items={navItems}/>
    <Outlet />
    </div>
  )
}

export default AudioLibrary