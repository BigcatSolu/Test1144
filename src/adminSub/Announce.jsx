import React, { useEffect, useState } from 'react'
import Add from '../img/edit.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Announce = () => {

    const [msg, setMsg] = useState()
    const [file, setFile] = useState(null)
    const [announce, setAnnounce]  = useState([])
    const [page, setPage] = useState(1);
    const limit = 2;
    const [totalPages, setTotalPages] = useState(1);

    const handleSubmit = async () => {
        console.log("Hello")
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('/api/announce/admin', {
                params: { page: page, limit: limit }
            })
            console.log(res.data)
            setAnnounce(res.data.announce)
            setTotalPages(Math.ceil(res.data.totalCount / limit));
        }
        fetchData()
    },[page])

    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages));
      };
    
      const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
      };

  return (
    <div className='adminAnnounce'>
      <div className="header">
        <h4>จัดการข่าวสาร</h4>
        <div className="img">
        <Link to="/admin/announceEdit">
        <img src={Add} alt="" />
        </Link>
        </div>
      </div>

      <div className="msg">
        {announce && announce.map((announce) => (

        <div className="card" key={announce.announce_id}>
            <div className="cardHeader">
                <p> {announce.announce_username} </p>
                <p> {new Date(announce.announce_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })} </p>
                <p> {announce.announce_time} </p>
              <Link
                className='linkButton'
                to={`/admin/announceEdit/${announce.announce_id}`}
              >
                แก้ไขข่าวสาร
              </Link>
            </div>
            <div className="msgBody">
            <div dangerouslySetInnerHTML={{ __html: announce.announce_content }} />
            <br />
            
            <div className="img">
            <img src={`/upload/${announce.announce_content_img
            }`} alt="" />
            </div>
            </div>
        </div>
        ))}



        {/* <textarea name="msg" id="msg" rows={20} cols={100} placeholder='โปรดกรอกประกาศของคุณ' onChange={(e) => setMsg(e.target.value)}></textarea>
        <label htmlFor="file">แนบรูปหรือgifของคุณ</label>
        <input type="file" id='file' name='file' onChange={(e) => setFile(e.target.value)} style={{display: "none"}}/>

        <button onClick={handleSubmit}>อัปโหลดข่าวสาร</button> */}
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

export default Announce
