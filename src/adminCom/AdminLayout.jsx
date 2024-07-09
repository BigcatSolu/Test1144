import React from 'react'
import { Link } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'

const AdminLayout = ({children}) => {

    console.log(children)
  return (
    <div className='adminLayout'>
        {/* sidebar */}
        <div className="sidebar">
            <ul>
                <li><Link to='/admin/dashboard'>Dashboard</Link></li>
                <li><Link to='/admin/orders'>Orders</Link></li>
                <li><Link to='/admin/products'>Products</Link></li>
            </ul>
        </div>

        {/* main content */}
        <div className="mainContent">
            
        </div>
    </div>
  )
}

export default AdminLayout
