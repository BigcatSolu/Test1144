import React, { useEffect, useState } from 'react'
import Add from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './BannerCom.css'

const Notice = () => {
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [notice, setNotice] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/notice/admin', {
        params: { page: page, limit: limit },
      })
      setNotice(res.data.notice);
      setTotalPages(Math.ceil(res.data.totalCount / limit));
      console.log(res.data)
    }
    fetchData()
  },[page, notice])

  
  const handleNextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const navigate = useNavigate()

  const handleDelete = async (noticeId) => {
    try {
      await axios.put(`/api/notice/${noticeId}`)
      console.log("Hi")
      navigate('/admin/notice')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='getnotice'>
      <div className="header">
        <h4>จัดการประกาศ</h4>
        <Link to='/admin/addnotice'>
        <img src={Add} alt="" />
        </Link>
      </div>

      <div className="notice">
        <div className="noticeCOntainer">

          <ul>
            <li className='id'>ลำดับ</li>
            <li className='msg'>ประกาศ</li>
            <li className='edit'>แก้ไข</li>
          </ul>
        </div>

        {notice.length > 0 ? (
          <div className="allnoticeDiv">
          {notice.map((no) => (
            <div className="allNotice" key={no.notice_id}>
            <ul>
              <li className='id'> {no.notice_id} </li>
              <li className='msg'>
              <p> {no.notice_message} </p>
              </li>
              <li className='edit'>
                <img src={Delete} alt="" onClick={() => handleDelete(no.notice_id)}/>
              </li>
            </ul>
          </div>
          ))}
        </div>
        ) : (
          <div className="allnoticeDiv">ไม่มีประกาศที่แสดงอยู่ในขณะนี้</div>
        )}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <div className="circle-container">
          {[...Array(totalPages)].map((_, index) => (
            <div
              key={index}
              className={`circle ${page === index + 1 ? 'active' : ''}`}
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
  )
}

export default Notice
