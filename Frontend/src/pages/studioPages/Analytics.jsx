import MiniNavbar from '../../components/MiniNavbar';
import { Outlet } from 'react-router-dom';

const Analytics = () => {

  const navItems = [
    { name: "Overview", path: "overview" },
    { name: "Content", path: "content" },
    { name: "Audience", path: "audience" },
    { name: "Trends", path: "trends" },
  ];

  return (
    <div className='box-border'>
      <h1 className="p-4 text-3xl font-semibold">Channel analytics</h1>
      <MiniNavbar items={navItems}/>
      <Outlet />
      </div>
  )
}

export default Analytics