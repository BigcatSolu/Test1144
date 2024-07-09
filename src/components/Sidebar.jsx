import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
          <Link to="/admin" className="link">
        <li>
            หน้าหลักแอดมิน
        </li>
          </Link>
            <Link to="/admin/category" className="link">
        <li>
              จัดการหมวดหมู่
          </li>
            </Link>
            <Link to="/admin/posts-management" className="link">
        <li>
              แก้ไข/จัดการ สินค้า
          </li>
            </Link>
          <Link to="/admin/orders" className="link">
        <li>
            ประเภทออเดอร์
        </li>
          </Link>
          <Link to="/admin/addidpass" className="link">
        <li>
            เพิ่มสะต็อก ID / PASS
        </li>
          </Link>
          <Link to="/admin/poster" className="link">
        <li>
            จัดการโปสเตอร์
        </li>
          </Link>

          <Link to="/admin/banner" className="link">
        <li>
            จัดการแบนเนอร์
        </li>
          </Link>
          <Link to="/admin/report" className="link">
        <li>
            จัดการแจ้งปัญหา
        </li>
          </Link>
          <Link to="/admin/notice" className="link">
        <li>
            จัดการประกาศ
        </li>
          </Link>
          <Link to="/admin/announce" className="link">
        <li>
            จัดการข่าวสาร
        </li>
          </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
