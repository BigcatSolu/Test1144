import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";
import { IoKeySharp } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CryptoJS from 'crypto-js'
import '../adminSub/BannerCom.css'
import Swal from 'sweetalert2'
import './checkbox.css'

const OrderHistory = () => {

  const { currentUser, logout } = useContext(AuthContext)
  const [sale, setSale] = useState([])
  const [page, setPage] = useState(1);
  const limit = 4;
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const navigate = useNavigate()

  if (!currentUser) {
    return navigate('/login')
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/sale/get', {
        params: {
          userId: currentUser.user_id,
          page: page,
          limit: limit 
        }
      })
      setSale(res.data.sale)
      setTotalPages(Math.ceil(res.data.totalCount / limit));
      console.log(res)
    }
    fetchData()
  },[page])

  console.log(sale)

  const decryptPassword = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, 'Hello-Dude-One');
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword;
  };

  const handleNextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  // const handleCheckboxClick = (event) => {
  //   event.stopPropagation();
  // };
  const deleteBtn = (event) => {
    event.stopPropagation();
    event.preventDefault()
  };

  const handleCheckboxClick = (saleId) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(saleId)) {
        return prevSelected.filter(id => id !== saleId);
      } else {
        return [...prevSelected, saleId];
      }
    });
  };

  console.log(selectedItems)

  const handleSelectAll = () => {
    if (allChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sale.map(sa => sa.sale_id));
    }
    setAllChecked(!allChecked);
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    if (selectedItems.length === 0) {
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "คุณไม่สามารถจะแก้ไขเป็นแบบเดิมได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ไช่ ลบเลย!",
      cancelButtonText: "ยกเลิก"
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {
          await axios.put('/api/sale/delete', {
            sale_id: selectedItems
          });
          // Refresh the sale list after deletion
          const updatedSales = sale.filter(item => !selectedItems.includes(item.sale_id));
          setSale(updatedSales);
          setSelectedItems([]); // Clear selected items
  
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 1000
          });
        } catch (error) {
          console.log(error);
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }
    });

  }

  return (
    <div className="userInfoPage">
      <div className="container">
        {/* หัวข้อ */}
        <div className="title">
          <Link to="/" className="link">
            หน้าหลัก
          </Link>
          <h3> &gt; </h3>
          <Link to="/orderhistory" className="link">
            ประวัติการสั่งซื้อ
          </Link>
        </div>

        {/* เริ่มUserInfo */}

        <div className="userInfo">
          <div className="container">
            <div className="userNavbar">
              <Link className="link" to="/userInfo">
                <h4>
                  {" "}
                  <FaUserAlt /> ข้อมูลบัญชีผู้ใช้
                </h4>
              </Link>
              <ul>
                <Link className="link" to="/orderhistory">
                  <li>
                    <MdWorkHistory /> ประวัติการสั่งซื้อ
                  </li>
                </Link>
                <Link className="link" to="/topuphistory">
                  <li>
                    <RiMoneyDollarCircleFill /> ประวัติการเติมเงิน
                  </li>
                </Link>
                <Link className="link">
                  <li>
                    <FaGift /> ประวัติการสุ่มรางวัล
                  </li>
                </Link>
                <Link className="link" to="/changepassword">
                <li>
                    <IoKeySharp /> ติดตามสถานะออเดอร์
                  </li>
                </Link>
                <Link className="link logout" onClick={logout}>
                  <li>
                    <VscSignOut /> ออกจากระบบ
                  </li>
                </Link>
              </ul>
            </div>

            <div className="userPages">
              <div className="userinfopage-header">
                <div className="userinfo-header">
                  <h4>ประวัติการสั่งซื้อ</h4>
                </div>
                <div className="userinfo-delete-button">
                  <button onClick={handleDelete} className='redBtn'>Delete</button>
                </div>
              </div>
              
              {/* price section */}
              <div className="orderHistoryTitle">
                <ul>
                  <li> <input type="checkbox" className='ui-checkbox' onChange={handleSelectAll} checked={allChecked}/> </li>
                  <li>#ID</li>
                  <li>ชื่อรายการ</li>
                  {/* <li>username / code</li> */}
                  {/* <li>password</li> */}
                  {/* <li>email </li> */}
                  <li>ราคา</li>
                  <li>วันที่</li>
                  {/* <li>delete</li> */}
                </ul>
              </div>

              <div className="orderHistory">
                {sale &&
                  sale.map((sa) => (
                    <div className="orderHistoryItems" key={sa.id}>
                        <div className="inputs">
                        <input type="checkbox" checked={selectedItems.includes(sa.sale_id)} onChange={(e) => handleCheckboxClick(sa.sale_id)} className='checkboxes ui-checkbox' />
                        </div>
                    <Link to={`/orderhistorydetails/${sa.sale_id}`} className='link'>
                    <ul>
                      <li>  {sa.sale_id} </li>
                      <li>{sa.post_title} </li>
                      <li> {sa.sale_amount} ฿ </li>
                      <li> {sa.sale_date} </li>
                    </ul>
                    </Link>
                    </div>
                  ))}
              </div>

              <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={page === 1}>
                  Previous
                </button>
                <div className="circle-container">
                  {[...Array(totalPages)].map((_, index) => (
                    <div
                      key={index}
                      className={`circle ${page === index + 1 ? "active" : ""}`}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory
