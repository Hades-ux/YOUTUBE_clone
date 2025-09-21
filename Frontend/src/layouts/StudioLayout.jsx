import { Outlet } from 'react-router-dom'
import StudioNavbar from '../components/StudioNavbar'
import StudioSidebar from '../components/StudioSidebar'
import { useState } from 'react'

const StudioLayout = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='box-border'>

    {/* navBar */}
    <StudioNavbar toggle={() => setIsOpen(!isOpen)}/>

    {/* Body: Sidebar + Content */}
    <div className="flex">
      <StudioSidebar isOpen={isOpen}/>

    {/* Main Content */}
    <main className="flex-1">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default StudioLayout