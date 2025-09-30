import { Outlet } from 'react-router-dom'
import MiniNavbar from '../../components/MiniNavbar'

const Community = () => {

  const navitems =[
    { name: "Comments", path: "comments"},
    { name: "Viewer Posts", path: "viewer-posts"},
    { name: "Mentions", path: "mentions"},
  ]
  return (
    <div>
      <h1 className='p-4 text-3xl font-semibold'>Community</h1>
      <MiniNavbar items={navitems}/>
      <Outlet />
      </div>
  )
}

export default Community