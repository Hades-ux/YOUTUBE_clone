import React from 'react'
import MiniNavbar from '../components/MiniNavbar'

const ChannelCustomisation = () => {
  const navItems = [
    { name: "Profile", path:"/customisation/profile"},
    { name: "Home Tab", path:"/customisation/home-tab"},
  ]
  return (
    <div>
      <h1 className='p-4 text-3xl font-semibold'>Channel Customisation</h1>
      <MiniNavbar items={navItems} />
      <div>
        Customisation
      </div>
    </div>
  )
}

export default ChannelCustomisation