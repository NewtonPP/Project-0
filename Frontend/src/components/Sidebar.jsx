import React from 'react'
import ActiveUsers from './ActiveUsers'
import Search from './Search'
import SidebarFooter from './SidebarFooter'

const Sidebar = () => {
  return (
    <div className='bg-cyan-900 w-[30%]'>
      <Search/>
      <ActiveUsers/>
      <SidebarFooter/>
    </div>
  )
}

export default Sidebar
