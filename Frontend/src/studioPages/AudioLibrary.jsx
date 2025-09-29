import React from 'react'
import MiniNavbar from '../components/MiniNavbar'

const AudioLibrary = () => {
  const navItems = [
    { name: "Music", path: "/audio-library/music"},
    { name: "Sound Effects", path: "/audio-library/sound-effects"},
    { name: "Starred", path: "/audio-library/starred"},
  ]
  return (
    <div>
      <h1 className='p-4 text-3xl font-semibold'>Audio library</h1>
    <MiniNavbar items={navItems}/>
    <div className='p-4'>Audio library</div>
    </div>
  )
}

export default AudioLibrary