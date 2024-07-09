import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";
import { IoKeySharp } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const TopupHistory = () => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const { currentUser, logout } = useContext(AuthContext);
  const limit = 4; 
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  if (!currentUser) {
    return navigate('/login')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/topup/history`, {
          params: { userId: currentUser.user_id, page: page, limit: limit },
        });
        setHistory(res.data.history);
        setTotalPages(Math.ceil(res.data.totalCount / limit));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [currentUser, navigate]);

  console.log(history)

  return (
    <div className="userInfoPage">
      <div className="container">
        <div className="title">
          <Link to="/" className="link">
            หน้าหลัก
          </Link>
          <h3> &gt; </h3>
          <Link to="/topuphistory" className="link">
            ประวัติการเติมเงิน
          </Link>
        </div>

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
              <h4>ประวัติการเติมเงิน</h4>
              <div className="orderTitle">
                <ul>
                  <li>จำนวนเงิน</li>
                  <li>วันที่</li>
                  <li>วิธีการเติมเงิน</li>
                </ul>
              </div>

              {history.length > 0 ? (
                <div className="orderHistoryDiv">
                  <div className="orderHistory" >
                  {history.map((his) => (
                      <ul key={his.topup_id}>
                        <li>{his.topup_amount} bath</li>
                        <li>{his.topup_date}</li>
                        <li>{his.topup_payment}</li>
                      </ul>
                  ))}
                  </div>
                </div>
              ) : (
                <div className="UserHistoryNotavia">No history available</div>
              )}

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
                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopupHistory;
