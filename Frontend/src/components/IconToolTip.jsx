import React from 'react'

const IconToolTip = ({iconName,  title}) => {
  return (
    <div className='relative group'>

    <span className="material-symbols-outlined material-symbole">{iconName.toLowerCase()}</span>
    <span className="absolute top-6 hidden  group-hover:block bg-black text-white text-sm rounded px-2 py-1 whitespace-nowrap">{title}</span>
    </div>
  )
}

export default IconToolTip