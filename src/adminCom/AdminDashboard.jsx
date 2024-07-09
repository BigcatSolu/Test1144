import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSellsy } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { TbDeviceDesktopUp } from "react-icons/tb";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios'
import './AdminDash.css'
import Sidebar from '../components/Sidebar'

const AdminDashboard = () => {

  const [total, setTotal] = useState()
  const [sale, setSale] = useState([])
  const [profit, setProfit] = useState(0);
  const [users, setUsers] = useState()
  const [allSale, setAllSale] = useState()
  const [boxpass, setBoxpass] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/totaltopup')
      // console.log(res)
      setTotal(res.data)

      const user = await axios.get('/api/admindashboard/users')
      setUsers(user.data[0].total_users)

      const sale = await axios.get('/api/admindashboard/sale')
      setAllSale(sale.data[0].total_sale)

      const boxpass = await axios.get('/api/admindashboard/boxpass')
      setBoxpass(boxpass.data[0].total_boxpass)
    }
    fetchData()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/admindashboard')
      console.log(res.data)
      setSale(res.data)
      // setTotal(res.data)
      const totalProfit = res.data.reduce((acc, curr) => acc + curr.profit, 0);
        setProfit(totalProfit);
    }
    fetchData()
  },[])

  console.log(profit)
  return (
    <div className="adminLayout">
      <Sidebar />
      {/* sidebar */}
      {/* <div className="sidebar">
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
            <Link to="/admin/addcode" className="link">
          <li>
              เพิ่มสะต็อก Code
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
      </div> */}

      {/* main content */}
      <div className="mainContent">
        <div className="addPayment">
          <Link to='/admin/payment' className='link'>
            <button>Payment Manage</button>
          </Link>
        </div>
        <div className="boxes">
          {/* sale */}
          <div className="saleBox">
            <div className="img">
              <FaSellsy />
            </div>
            <div className="content">
              <h4>ขายอยู่</h4>
              <h4>{boxpass} ชิ้น</h4>
            </div>
          </div>

          {/* ขายแล้ว */}
          <div className="purchased">
            <div className="img">
              <FaBasketShopping />
            </div>
            <div className="content">
              <h4>ขายแล้ว</h4>
              <h4>{allSale} ชิ้น</h4>
            </div>
          </div>

          {/* ลูกค้า */}
          <div className="user">
            <div className="img">
              <FaUserFriends />
            </div>
            <div className="content">
              <h4>ลูกค้า</h4>
              <h4>{users} คน</h4>
            </div>
          </div>

          {/* ยอดเติมเงิน */}
          <div className="adminTopupDetails">
            <div className="img">
              <TbDeviceDesktopUp />
            </div>
            <div className="content">
              <h4>ยอดเติมเงิน</h4>
              <h4>{total} บาท</h4>
            </div>
          </div>
        </div>
        
        <div className="charts">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={sale}
            margin={{
              right: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="user" fill="#2563eb" />
            <Bar dataKey="profit" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          user:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Profit:
          <span className="ml-2">${payload[1].value}</span>
        </p>
      </div>
    );
  }
};