import { FiHome } from "react-icons/fi"

const Sidebar = ({isOpen}) => {
  return (
    <aside className={`${isOpen ? "w-60" : "w-22"} fixed top-18 left-0 h-[calc(100vh-3rem)] bg-white transition-all duration-300`}>

        <ul className='flex flex-col pt-2 gap-2'>
            <li className={`flex  items-center justify-center gap-3 p-2 cursor-pointer hover:bg-gray-300 rounded ${isOpen? " ": "flex-col" }`}>
                <FiHome size={20} />
                { !isOpen && <div className='text-gray-800 text-sm'>Home</div>}
                { isOpen && <span className='text-gray-800 '>Home</span>}
            </li>

            
            <li className={`flex  items-center justify-center gap- p-2 text-sm cursor-pointer hover:bg-gray-300  rounded ${isOpen? " ": "flex-col" }`}>
                <FiHome size={20} />
                { !isOpen && <div className='text-gray-800'>Subscription</div>}
                { isOpen && <span className='text-gray-800 '>Subscription</span>}
            </li>

            
            <li className={`flex  items-center justify-center gap-3 text-sm p-2 cursor-pointer hover:bg-gray-300 rounded ${isOpen? " ": "flex-col" }`}>
                <FiHome size={20} />
                { !isOpen && <div className='text-gray-800'>You</div>}
                { isOpen && <span className='text-gray-800 '>You</span>}
            </li>

            

        </ul>
    </aside>
  )
}

export default Sidebar