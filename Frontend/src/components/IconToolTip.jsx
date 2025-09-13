

const IconToolTip = ({iconName, name, isOpen, onClick}) => {


  return (
    <div className='relative group flex gap-3 items-center cursor-pointer hover:bg-gray-100 p-3' onClick={onClick}>

    {/* icon */}
    <div className="material-symbols-outlined material-symbole">{iconName}</div>

    {/* icon name */}
    {!isOpen && (
      <>
    <div className={`transition-all duration-300`}>{name}</div>
      </>
    )}

    {/* tooltip */}
    {isOpen && (
        <span className="absolute top-6 ml-2 hidden group-hover:block bg-black text-white text-sm rounded px-2 py-1 whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
    
  )
}

export default IconToolTip