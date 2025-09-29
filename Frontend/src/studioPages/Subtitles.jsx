import MiniNavbar from '../components/MiniNavbar'

const Subtitles = () => {
  const navItems = [
    { name: "All", path: "/subtitles/all"},
    { name: "Drafts", path: "/subtitles/drafts"},
    { name: "Published", path: "/subtitles/published"},
  ]
  return (
    <div>
      <h1 className='p-4 text-3xl font-semibold'>Channel subtitles</h1>
      <MiniNavbar items={navItems}/>
      <div className='p-4'>Subtitle</div>
      </div>
  )
}

export default Subtitles