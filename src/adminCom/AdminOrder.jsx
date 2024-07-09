import React from 'react'
import { Link } from 'react-router-dom'
import AdminOrderReceive from '../adminSub/AdminOrderReceive'
import Sidebar from '../components/Sidebar'

const AdminOrder = () => {
  return (
    <div className="adminLayout">
    {/* sidebar */}
    <Sidebar />
    {/* <div className="sidebar">
        <ul>
          <li>
            <Link to="/admin" className="link">
              หน้าหลักแอดมิน
            </Link>
          </li>
          <li>
            <Link to="/admin/category" className="link">
              จัดการหมวดหมู่
            </Link>
          </li>
          <li>
            <Link to="/admin/posts-management" className="link">
            แก้ไข/จัดการ สินค้า
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="link">
              ประเภทออเดอร์
            </Link>
          </li>
          <li>
            <Link to="/admin/addidpass" className="link">
              เพิ่มสะต็อก ID / PASS
            </Link>
          </li>
          <li>
            <Link to="/admin/addcode" className="link">
              เพิ่มสะต็อก Code
            </Link>
          </li>
          
          <li>
            <Link to="/admin/banner" className="link">
              จัดการแบนเนอร์
            </Link>
          </li>
          <li>
            <Link to="/admin/report" className="link">
              จัดการแจ้งปัญหา
            </Link>
          </li>
          <li>
          <Link to="/admin/notice" className="link">
            จัดการประกาศ
          </Link>
        </li>
        <li>
          <Link to="/admin/announce" className="link">
            จัดการข่าวสาร
          </Link>
        </li>
        </ul>
      </div> */}

    {/* main content */}
    <div className="mainContent">
      <div className="product">
        <AdminOrderReceive />
      </div>
      

    </div>
  </div>
  )
}

export default AdminOrder
