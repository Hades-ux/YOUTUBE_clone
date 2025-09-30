import { useState } from "react"


const Videos = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=''>
      <div className='border-b border-gray-300 h-10 pl-4 flex items-center gap-8 cursor-pointer'>
        <span className="material-symbols-outlined " onClick={() => setIsOpen(!isOpen)}>filter_list</span> 

        {/* filter Popup */}
        {isOpen && (
          <div className="">
          <h1>is pop up </h1>
          </div>
        )}
        <h1 className='text-gray-400'>Filter</h1>
      </div>
      <div className="pl-4 border-b border-gray-300 h-12 flex items-center">
        <h1 className="font-semibold">Videos</h1>
      </div>
    </div>
  )
}

export default Videos