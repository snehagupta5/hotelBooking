
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  // to make navbar fixed for all the route 
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
