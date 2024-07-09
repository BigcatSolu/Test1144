import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";
import { IoKeySharp } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2'
import axios from 'axios';

const ChangePassword = () => {
  const [ordering, setOrdering] = useState([])
  const { currentUser, logout } = useContext(AuthContext)
  const [time, setTime] = useState(0)
  // const [time, setTime] = useState({});
  // const [countdownTime, setCountdownTime] = useState('');
  const [orderTimes, setOrderTimes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/order/user', {
        params: { userId: currentUser.user_id}
      })
      const orderingData = res.data
      console.log(res.data)
      setOrdering(res.data)

      // orderingData.forEach((item) => {
      //   const countdownStart = new Date(item.countdown_start);
      //   const endTime = countdownStart.getTime(); // Get the end time for each item
      //   const now = new Date();
      //   const remainingTime = Math.max((endTime - now) / 1000, 0); // Calculate remaining time
      //   setTime((prevTime) => ({ ...prevTime, [item.ordering_id]: remainingTime }));
      // });
      const newOrderTimes = {};

      orderingData.forEach(item => {
        if (item.countdown_start) {
          const countdownStart = new Date(item.countdown_start);
          const endTime = countdownStart.getTime(); // Get the end time for each item
          const now = new Date();
          const remainingTime = Math.max((endTime - now) / 1000, 0); // Calculate remaining time in seconds
          newOrderTimes[item.ordering_id] = remainingTime;
        }
      });

      setOrderTimes(newOrderTimes);
    }
    fetchData()
  },[])

  useEffect(() => {
    const timers = Object.keys(orderTimes).map(orderId => {
      return setInterval(() => {
        setOrderTimes(prevOrderTimes => {
          const newOrderTimes = { ...prevOrderTimes };
          if (newOrderTimes[orderId] > 0) {
            newOrderTimes[orderId] -= 1;
          }
          return newOrderTimes;
        });
      }, 1000);
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [orderTimes]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    let formattedTime = '';
  
    if (days > 0) {
      formattedTime += `${days} วัน :`;
    }
  
    if (hours > 0 || days > 0) {
      formattedTime += ` ${hours} ชม. :`;
    }
  
    formattedTime += ` ${minutes.toString().padStart(2, '0')}น. : ${remainingSeconds.toString().padStart(2, '0')} วิ.`;
  
    return formattedTime;
  };

  // useEffect(() => {
  //   if (time > 0) {
  //       const timer = setInterval(() => {
  //           setTime(prevTime => prevTime - 1);
  //       }, 1000);
  
  //       return () => clearInterval(timer);
  //   }
  // }, [time]);

  const statusName = {
    1: 'ระหว่างเตรียมการ',
    2: 'กำลังดำเนินการ',
    3: 'เสร็จสิ้น',
    4: 'ยกเลิก',
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
          <Link to="/changepassword" className="link">
            ติดตามสินค้าออเดอร์
          </Link>
        </div>

        {/* เริ่มUserInfo */}

        <div className="userInfo">
          <div className="container">
            <div className="userNavbar">
              <Link className="link" to="/userInfo">
                <h4>
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
                <Link className="link">
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
              <div className="ordering-page-title">
                <h4 className="order-page-title">ติดตามสถานะออเดอร์</h4>
              </div>

              <div className="ordering_title">
                <div className="ordering-id">#1</div>
                <div className="ordering-status">สถานะออเดอร์</div>
                <div className="ordering-name"> หัวข้อออเดอร์ </div>
                <div className="ordering-price"> ราคาออเดอร์ </div>
              </div>

              <div className="ordering-body">
                {ordering &&
                  ordering.map((order) => (
                    <div className="ordering-item" key={order.ordering_id}>
                      <div className="ordering-id">#{order.ordering_id}</div>
                      {order.status_id !== "3" ? (
                        <div className="ordering-status">
                          <div className="ordering-status-box">
                          {
                            order.countdown_start &&
                            orderTimes[order.ordering_id] > 0
                              ? formatTime(orderTimes[order.ordering_id])
                              : statusName[order.status_id] // Use statusName here
                          }
                          </div>

                        </div>
                      ) : (
                        <div className="ordering-status">
                          <div className="ordering-status-box">
                          {statusName[order.status_id]}
                          </div>
                        </div>
                      )}
                      <div className="ordering-name">
                        {" "}
                        {order.ordering_title}{" "}
                      </div>
                      <div className="ordering-price">
                        {" "}
                        {order.ordering_amount} B{" "}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword
