import React from 'react'
import MiniNavbar from '../components/MiniNavbar';

const Analytics = () => {

  const navItems = [
    { name: "Overview", path: "/analytics/overview" },
    { name: "Content", path: "/analytics/content" },
    { name: "Audience", path: "/analytics/audience" },
    { name: "Trends", path: "/analytics/trends" },
  ];

  return (
    <div className='box-border'>
      <h1 className="p-4 text-3xl font-semibold">Channel analytics</h1>
      <MiniNavbar items={navItems}/>
      <div className="p-4">
        Analytics Page
      </div>
      </div>
  )
}

export default Analytics