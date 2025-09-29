import MiniNavbar from '../components/MiniNavbar'

const Community = () => {

  const navitems =[
    { name: "Comments", path: "/community/comments"},
    { name: "Viewer Posts", path: "/community/viewer-posts"},
    { name: "Mentions", path: "/community/Mentions"},
  ]
  return (
    <div>
      <h1 className='p-4 text-3xl font-semibold'>Community</h1>
      <MiniNavbar items={navitems}/>
      <div className='p-4'>
        community page
      </div>
      </div>
  )
}

export default Community